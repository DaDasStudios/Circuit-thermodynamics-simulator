import { initInputStateType } from './circuitContext'

type DISPATCH_ACTION_TYPE = "ON_CHANGE" | "ERROR_MESSAGE"

export interface CircuitAction {
    type: DISPATCH_ACTION_TYPE
    payload: {
        key?: any 
        value?: string
    }
} 

export const inputReducer = (state: initInputStateType, action: CircuitAction): initInputStateType => {
    switch (action.type) {
        case "ON_CHANGE":
            return { ...state, [action.payload.key]: action.payload.value }
        case "ERROR_MESSAGE":
            return {...state, errorMessage: action.payload.value || "" }
        default:
            throw new Error(`Unknown action ${action.type}`)
    }
}
