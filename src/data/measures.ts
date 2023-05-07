import { MeasureFormatType } from '../components/ResultLabel'

export const unitMeasures: { [key: string]: MeasureFormatType[] } = {
    current: [
        { label: "A", factorConversion: 1 },
        { label: "mA", factorConversion: 1000 },
        { label: "uA", factorConversion: 10 ** 6 },
    ],
    power: [
        { label: "W", factorConversion: 1 },
        { label: "mW", factorConversion: 1000 },
        { label: "Caballo de potencia", factorConversion: 1 / 746 },
    ],
    energy: [
        { label: "J", factorConversion: 1 },
        { label: "kJ", factorConversion: 1 / 1000 },
        { label: "kWh", factorConversion: 2.7778e-7 },
        { label: "Ws", factorConversion: 2.77778e-4 },
        { label: "Caloría", factorConversion: 0.239 }
    ],
    temperature: [
        { label: "°C", factorConversion: 1 },
        { label: "°F", factorConversion: 1.8, additionalConstant: 32 },
        { label: "K",  factorConversion: 1, additionalConstant: 273.15 }
    ],
    resistance: [
        { label: "Ω", factorConversion: 1 },
        { label: "mΩ", factorConversion: 1000 },
        { label: "kΩ", factorConversion: 1 / 1000 },
    ]
}