import { useCircuitContext } from "../context/circuitContext"
import { unitMeasures } from "../data/measures"
import { oneDigit } from "../util/regexp"
import ResultLabel from "./ResultLabel"
import StopWatch from "./StopWatch"
import { TextInput } from "./TextInput"

const ResultsAside = () => {
  const {
    simulationState: { circuit },
  } = useCircuitContext()

  return (
    <aside className="bg-opaque shadow-lg h-full col-span-2">
      <div className="pt-16">
        <StopWatch />
        <div className="mt-12">
          <ResultLabel label="Resistencia:" value={circuit.resistance} measures={unitMeasures.resistance} />
          <ResultLabel label="Corriente:" value={circuit.current} measures={unitMeasures.current} />
          <ResultLabel label="Potencia:" value={circuit.power} measures={unitMeasures.power} />
          <ResultLabel label="Energía:" value={circuit.energy} measures={unitMeasures.energy} />
          <ResultLabel label="Calor:" value={circuit.warm} measures={unitMeasures.energy} />
          <ResultLabel label="Temperatura:" value={circuit.temperature} measures={unitMeasures.temperature} />
          <div className="pl-7">
            <TextInput id="numDecimals" label="Decimales" pattern={oneDigit} placeholder="Número de decimales" />
          </div>
        </div>
      </div>
    </aside>
  )
}
export default ResultsAside
