import { useCircuitContext } from "../context/circuitContext"
import { ENV_TEMPERATURE } from "../data/resistance"
import { positiveNumbers } from "../util/regexp"
import Wrapper from "./Wrapper"

/**
 * Create a color representation for the temperature
 * @param temperature The temperature measurement
 * @returns hex color
 */
function calculateColor(temperature: number) {
  const minTemp = ENV_TEMPERATURE
  const maxTemp = 150
  const coolestColor = "#00bdf7"
  const hottestColor = "#FF0000"
  const midColor = "#FF8000"

  if (temperature < minTemp) {
    temperature = minTemp
  } else if (temperature > maxTemp) {
    temperature = maxTemp
  }

  const tempPercentage = (temperature - minTemp) / (maxTemp - minTemp)

  let color
  if (tempPercentage <= 0.5) {
    color = interpolateColor(coolestColor, midColor, tempPercentage * 2)
  } else {
    color = interpolateColor(midColor, hottestColor, (tempPercentage - 0.5) * 2)
  }

  return color
}

/**
 * Auxilar function to interpolate between two colors
 * @param color1
 * @param color2
 * @param ratio
 * @returns An hex string with the interpolated color
 */
function interpolateColor(color1: string, color2: string, ratio: number) {
  const hex = function (x: any) {
    x = x.toString(16)
    return x.length === 1 ? "0" + x : x
  }
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio)
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio)
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio)
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

const Circuit = () => {
  const {
    simulationState: { circuit, hasStarted },
    inputState: { sourceVoltage, initResistance },
  } = useCircuitContext()
  const color = calculateColor(circuit.temperature)

  return (
    <div className="col-span-3 flex flex-col justify-center">
      <Wrapper className="items-center justify-center relative text-lg text-gray-900">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pl-10 max-w-[25%] truncate font-semibold flex flex-col justify-center items-center">
          <span>V = {!positiveNumbers.test(sourceVoltage) || !sourceVoltage ? "0" : sourceVoltage}V</span>
          <span>R = {!positiveNumbers.test(initResistance) || !initResistance ? "0" : initResistance}Ω</span>
          <span>To = {ENV_TEMPERATURE}°C</span>
        </div>

        <svg
          viewBox="0 0 1017 814"
          xmlns="http://www.w3.org/2000/svg"
          version="1.2"
          baseProfile="tiny"
          className="scale-75"
        >
          <title>Proteus Design Suite SVG export</title>
          <desc>Created by Proteus Design Suite</desc>
          <defs></defs>
          <g
            fill="none"
            stroke="black"
            strokeWidth="1"
            fillRule="evenodd"
            strokeLinecap="square"
            strokeLinejoin="bevel"
          >
            <g
              fill="transparent"
              fillOpacity="1"
              stroke="none"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <path vectorEffect="non-scaling-stroke" fillRule="evenodd" d="M0,0 L1017,0 L1017,814 L0,814 L0,0" />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <path vectorEffect="none" fillRule="evenodd" d="M152,559 L152,763 L914,763 L914,509" />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <path vectorEffect="none" fillRule="evenodd" d="M152,255 L152,51 L914,51 L914,255" />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <path
                vectorEffect="none"
                fillRule="evenodd"
                d="M254,407 C254,463.333 208.333,509 152,509 C95.667,509 50,463.333 50,407 C50,350.667 95.667,305 152,305 C208.333,305 254,350.667 254,407 "
              />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="127,356 178,356 " />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="152,331 152,382 " />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="127,458 178,458 " />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="152,255 152,305 " />
            </g>

            <g
              fill="none"
              stroke="current"
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="152,559 152,509 " />
            </g>
            {/* Resistance body */}
            <g
              fill="none"
              stroke={hasStarted ? color : "black"}
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <path vectorEffect="none" fillRule="evenodd" d="M894,305 L935,305 L935,458 L894,458 L894,305" />
            </g>
            {/* Resistance terminals */}

            <g
              fill="none"
              stroke={hasStarted ? color : "black"}
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="914,509 914,458 " />
            </g>
            {/* Resistance terminals */}

            <g
              fill="none"
              stroke={hasStarted ? color : "black"}
              strokeOpacity="1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
              transform="matrix(1,0,0,1,0,0)"
              fontFamily="MS Shell Dlg 2"
              fontSize="55.4182"
              fontWeight="400"
              fontStyle="normal"
            >
              <polyline fill="none" vectorEffect="none" points="914,255 914,305 " />
            </g>
          </g>
        </svg>
      </Wrapper>
      <h3 className="text-white text-center text-base font-light hover:underline group">
        Hecho con{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 inline-block mr-1 group-hover:text-red-400"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        <a href="https://github.com/DaDasStudios" target="_blank">
          Por David@Dadas
        </a>
      </h3>
    </div>
  )
}
export default Circuit
