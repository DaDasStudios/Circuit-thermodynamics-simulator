import { useCircuitContext } from "../context/circuitContext"
const StopWatch = () => {
  const { simulationState } = useCircuitContext()
  return (
    <div className="text-5xl text-center font-bold mb-6">
      <span>
        {simulationState.stopWatch.h < 10 && "0"}
        {simulationState.stopWatch.h}
      </span>
      :
      <span>
        {simulationState.stopWatch.m < 10 && "0"}
        {simulationState.stopWatch.m}
      </span>
      :
      <span>
        {simulationState.stopWatch.s < 10 && "0"}
        {simulationState.stopWatch.s}
      </span>
    </div>
  )
}
export default StopWatch
