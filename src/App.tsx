import Circuit from "./components/Circuit"
import ParametersAside from "./components/ParametersAside"
import ResultsAside from "./components/ResultsAside"
import { CircuitContextProvider } from "./context/circuitContext"

function App() {
  return (
    <CircuitContextProvider>
      <main>
        <span className="background-gradient-animated"></span>
        <div className="grid grid-cols-7 h-screen font-medium text-black">
          <ParametersAside />
          <Circuit />
          <ResultsAside />
        </div>
      </main>
    </CircuitContextProvider>
  )
}

export default App
