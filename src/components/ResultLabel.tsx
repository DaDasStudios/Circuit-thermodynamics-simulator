import { useState } from "react"
import { useCircuitContext } from "../context/circuitContext"
import Wrapper from "./Wrapper"

export type MeasureFormatType = {
  label: string
  factorConversion: number
  additionalConstant?: number
}

interface IProps {
  label: string
  value: number
  measures: MeasureFormatType[]
}

const ResultLabel = ({ label, value, measures }: IProps) => {
  const {
    simulationState,
    inputState: { numDecimals },
  } = useCircuitContext()
  const [selectedMeasure, setSelectedMeasure] = useState<string>(measures[0].label)

  const foundConvertionMeasure = measures.find((m) => m.label === selectedMeasure) ?? measures[0]
  const fractionDigits = parseFloat(numDecimals)

  return (
    <Wrapper className="mb-6 flex flex-nowrap items-center gap-4 justify-start ml-10">
      <p className="block mb-1 text-base 2xl:text-lg font-medium">{label}</p>
      <input
        type="text"
        className={`rounded-md outline-none text-gray-800 placeholder:font-normal p-2`}
        value={(
          value * foundConvertionMeasure.factorConversion +
          (foundConvertionMeasure.additionalConstant ?? 0)
        ).toFixed(fractionDigits && fractionDigits > 0 && fractionDigits <= 9 ? fractionDigits : 3)}
        readOnly
      />
      <select
        className={`rounded-md outline-none p-2 text-gray-800 placeholder:font-normal ${
          !simulationState.hasStarted && "cursor-not-allowed"
        }`}
        disabled={!simulationState.hasStarted}
        onChange={(e) => setSelectedMeasure(e.target.value)}
      >
        {measures.map((measure) => (
          <option key={`${label}:${measure.label}`} value={measure.label}>
            {measure.label}
          </option>
        ))}
      </select>
    </Wrapper>
  )
}
export default ResultLabel
