import { createContext, useReducer, useContext, PropsWithChildren, useState, useEffect } from "react"
import { inputReducer, CircuitAction } from "./circuitReducer"
import { simulationReducer } from "./simulationReducer"
import { ENV_TEMPERATURE, RESISTANCE_MASS, resistanceMaterials } from "../data/resistance"

interface InputState {
  sourceVoltage: string
  initResistance: string
  resistanceMaterial: string
  numDecimals: string
  errorMessage: string
  [key: string]: string
}

interface simulationState {
  hasStarted: boolean
  isPaused: boolean
  stopWatch: {
    ms: number
    s: number
    m: number
    h: number
  }
  circuit: {
    temperature: number
    current: number
    resistance: number
    voltage: number
    power: number
    energy: number
    time: number
    warm: number
  }
}

const initSimulationState: simulationState = {
  hasStarted: false,
  isPaused: false,
  stopWatch: {
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
  },
  circuit: {
    time: 0,
    temperature: ENV_TEMPERATURE,
    resistance: 0,
    current: 0,
    voltage: 0,
    power: 0,
    energy: 0,
    warm: 0,
  },
}

const initInputState: InputState = {
  sourceVoltage: "",
  initResistance: "",
  errorMessage: "",
  numDecimals: "",
  resistanceMaterial: "Carbono",
}

export type initInputStateType = typeof initInputState
export type initSimulationStateType = typeof initSimulationState

export interface ICircuitContext {
  inputState: initInputStateType
  setErrorMessage(message: string): void
  dispatchInput: React.Dispatch<CircuitAction>
  simulationState: initSimulationStateType
  startSimulation: () => void
  finishSimulation: () => void
  handlePausing: () => void
}

const circuitContext = createContext({} as ICircuitContext)

export const useCircuitContext = () => useContext(circuitContext)

export const CircuitContextProvider = ({ children }: PropsWithChildren) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, initInputState)
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [simulationState, dispatchSimulation] = useReducer(simulationReducer, initSimulationState)

  function setErrorMessage(message: string) {
    dispatchInput({
      type: "ERROR_MESSAGE",
      payload: {
        value: message,
      },
    })
  }

  const runTime = () => {
    // * Update clock timer
    const circuitResults = simulationState.circuit
    const stopWatchObj = simulationState.stopWatch

    if (simulationState.stopWatch.h === 60) {
      return finishSimulation()
    }

    if (simulationState.stopWatch.m === 60) {
      stopWatchObj.m = 0
      stopWatchObj.h++
    }

    if (simulationState.stopWatch.s === 60) {
      stopWatchObj.s = 0
      stopWatchObj.m++
    }

    if (stopWatchObj.ms === 1000) {
      stopWatchObj.ms = 0
      stopWatchObj.s++
    }

    circuitResults.time++
    stopWatchObj.ms += 50

    // * Calculate the circuit results
    const seconds = circuitResults.time / 1000
    if (circuitResults.voltage === 0) {
      circuitResults.resistance = parseFloat(inputState.initResistance)
      circuitResults.voltage = parseFloat(inputState.sourceVoltage)
    }

    circuitResults.current = circuitResults.voltage / circuitResults.resistance
    circuitResults.power = circuitResults.resistance * Math.pow(circuitResults.current, 2)
    circuitResults.energy = circuitResults.power * seconds
    circuitResults.warm = 0.24 * circuitResults.energy

    /*
     ? T = Ti - (Q/t)/C
     ? C = m * c * a
     */
    const currResMaterial =
      resistanceMaterials.find((material) => material.name === inputState.resistanceMaterial) || resistanceMaterials[0]

    const thermalCapacity = RESISTANCE_MASS * currResMaterial?.specificHeat * currResMaterial?.temperatureCoefficient

    circuitResults.temperature = ENV_TEMPERATURE + 5e-6 * (circuitResults.warm / (thermalCapacity * RESISTANCE_MASS))

    /*
     * ? R = Ro (1 - a(Tf- Ti))
     */
    circuitResults.resistance =
      parseFloat(inputState.initResistance) *
      (1 - currResMaterial.temperatureCoefficient * (circuitResults.temperature - ENV_TEMPERATURE))

    dispatchSimulation({
      type: "UPDATE",
      payload: {
        stopWatch: stopWatchObj,
        circuit: circuitResults,
      },
    })
  }

  function startSimulation() {
    const interv = setInterval(runTime, 50)
    dispatchInput({
      type: "ERROR_MESSAGE",
      payload: {
        value: "",
      },
    })
    setIntervalId(interv)
    dispatchSimulation({
      type: "START",
    })
  }

  function finishSimulation() {
    clearInterval(intervalId ?? undefined)
    setIntervalId(null)
    dispatchSimulation({
      type: "FINISH",
    })
  }

  function handlePausing() {
    if (simulationState.isPaused) {
      startSimulation()
    } else {
      clearInterval(intervalId ?? undefined)
      setIntervalId(null)
    }
    dispatchSimulation({
      type: "PAUSE",
    })
  }

  useEffect(() => {
    return () => clearInterval(intervalId ?? undefined)
  }, [])

  return (
    <circuitContext.Provider
      value={{
        inputState,
        dispatchInput,
        setErrorMessage,
        simulationState,
        startSimulation,
        finishSimulation,
        handlePausing,
      }}
    >
      {children}
    </circuitContext.Provider>
  )
}
