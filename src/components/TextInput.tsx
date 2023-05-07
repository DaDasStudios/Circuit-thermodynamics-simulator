import { useState } from "react"
import { useCircuitContext } from "../context/circuitContext"
import Wrapper from "./Wrapper"

interface IProps {
  label: string
  id: string
  placeholder?: string
  resetButton?: boolean
  readOnly?: boolean
  pattern?: RegExp
}

export const TextInput = ({
  id,
  label,
  placeholder,
  resetButton,
  pattern,
  ...props
}: IProps) => {
  const { inputState, dispatchInput } = useCircuitContext()
  const [error, setError] = useState(false)

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError(true)
    } else if (pattern && !pattern.test(e.target.value)) {
      setError(true)
    } else {
      setError(false)
    }

    dispatchInput({
      type: "ON_CHANGE",
      payload: {
        key: e.target.name,
        value: e.target.value,
      },
    })
  }

  function resetInput() {
    dispatchInput({
      type: "ON_CHANGE",
      payload: {
        key: id,
        value: "",
      },
    })
  }

  return (
    <div className="mb-2">
      <label className="block mb-1 text-lg font-medium" htmlFor={id}>
        {label}
      </label>
      <Wrapper className="items-center gap-x-3">
        <input
          type="text"
          className={`rounded-md outline-none p-2 text-gray-800 placeholder:font-normal ${
            error && "border-2 border-red-300"
          }`}
          name={id}
          placeholder={placeholder}
          id={id}
          onChange={handleOnChange}
          value={inputState[id]}
          {...props}
        />
        {resetButton && (
          <button
            className="text-gray-400 hover:text-gray-600"
            type="button"
            onClick={resetInput}
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        )}
      </Wrapper>
    </div>
  )
}
