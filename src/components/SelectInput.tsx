import { useCircuitContext } from "../context/circuitContext"

interface IProps {
  label: string
  id: string
  disabled?: boolean
  elements: string[]
}

export const SelectInput = ({ id, label, elements, ...props }: IProps) => {
  const { inputState, dispatchInput } = useCircuitContext()

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatchInput({
      type: "ON_CHANGE",
      payload: {
        key: e.target.name,
        value: e.target.value,
      },
    })
  }

  return (
    <div className="mb-2">
      <label className="block mb-1 text-lg font-medium" htmlFor={id}>
        {label}
      </label>
      <select
        className="rounded-md outline-none p-2 text-gray-800 placeholder:font-normal w-[200px]"
        name={id}
        id={id}
        onChange={handleOnChange}
        value={inputState[id]}
        {...props}
      >
        {elements.map((element, index) => (
          <option key={index + "element"}>{element}</option>
        ))}
      </select>
    </div>
  )
}
