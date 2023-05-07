import { useCircuitContext } from "../context/circuitContext"
import { resistanceMaterials } from "../data/resistance"
import { positiveNumbers } from "../util/regexp"
import Button, { buttomThemes } from "./Button"
import { SelectInput } from "./SelectInput"
import { TextInput } from "./TextInput"
import Wrapper from "./Wrapper"

const ParametersAside = () => {
  const {
    simulationState,
    inputState,
    startSimulation,
    finishSimulation,
    handlePausing,
    setErrorMessage,
  } = useCircuitContext()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (inputState.initResistance === "0" || inputState.sourceVoltage === "0") {
      return setErrorMessage("El voltaje o resistencia no puede ser cero")
    }

    if (!inputState.sourceVoltage) {
      return setErrorMessage("Ingresa un valor de voltaje")
    }

    if (!inputState.resistanceMaterial) {
      return setErrorMessage("Ingresa un valor de resistencia")
    }

    if (!positiveNumbers.test(inputState.sourceVoltage)) {
      return setErrorMessage("Voltaje inválidao")
    }

    if (!positiveNumbers.test(inputState.initResistance)) {
      return setErrorMessage("Resistencia inválida")
    }

    startSimulation()
  }

  return (
    <aside className="shadow-lg h-full col-span-2 bg-opaque">
      <div className="pt-10">
        <h3 className="text-5xl text-center font-bold mb-6">Eficiencia en circuitos</h3>
        <p className="text-paragraph text-lg px-10 mb-8 text-justify">
          Experimenta cambiando los valores del circuito resistivo y observa su comportamiento frente a los cambios de
          temperatura.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-10">
            <Wrapper className="gap-x-3 items-center">
              <TextInput
                id="sourceVoltage"
                label="Voltaje"
                placeholder="Dado en voltios [V]"
                resetButton
                readOnly={simulationState.hasStarted}
                pattern={positiveNumbers}
              />
            </Wrapper>
            <TextInput
              id="initResistance"
              label="Resistencia"
              placeholder="Dado en Ohms [Ω]"
              resetButton
              readOnly={simulationState.hasStarted}
              pattern={positiveNumbers}
            />
            <SelectInput
              id="resistanceMaterial"
              label="Material de la resistencia"
              elements={resistanceMaterials.map((e) => e.name)}
              disabled={simulationState.hasStarted}
            />
            {inputState.errorMessage && <p className="text-red-500 text-center">{inputState.errorMessage}</p>}
            <Wrapper className="justify-center gap-x-5 justify-self-end mt-2">
              {!simulationState.hasStarted && (
                <Button type="submit" theme={buttomThemes.blue}>
                  <p>Iniciar</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </Button>
              )}
              {simulationState.hasStarted && (
                <>
                  <Button type="button" theme={buttomThemes.blue} onClick={handlePausing}>
                    <p>{simulationState.isPaused ? "Reanudar" : "Pausar"}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
                      />
                    </svg>
                  </Button>
                  <Button type="button" theme={buttomThemes.red} onClick={finishSimulation}>
                    <p>Terminar</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </>
              )}
            </Wrapper>
          </div>
        </form>
      </div>
    </aside>
  )
}
export default ParametersAside
