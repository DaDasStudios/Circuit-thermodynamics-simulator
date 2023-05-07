import { ENV_TEMPERATURE } from "../data/resistance"
import { initSimulationStateType } from "./circuitContext"

type SIMULATION_ACTION_TYPE = "START" | "FINISH" | "PAUSE" | "UPDATE"

interface SimulationAction {
    type: SIMULATION_ACTION_TYPE,
    payload?: any
}

export const simulationReducer = (state: initSimulationStateType, action: SimulationAction): initSimulationStateType => {
    switch (action.type) {
        case "START":
            return {
                ...state, hasStarted: true
            }
        case "FINISH":
            return {
                ...state, hasStarted: false, isPaused: false, stopWatch: {
                    h: 0,
                    m: 0,
                    s: 0,
                    ms: 0,
                },
                circuit: {
                    temperature: ENV_TEMPERATURE,
                    current: 0,
                    resistance: 0,
                    voltage: 0,
                    energy: 0,
                    power: 0,
                    time: 0,
                    warm: 0
                }
            }
        case "PAUSE":
            return { ...state, isPaused: !state.isPaused }
        case "UPDATE":
            return { ...state, stopWatch: action.payload.stopWatch, circuit: action.payload.circuit }

        default:
            throw new Error("Unknown action type: " + action.type)
    }
}