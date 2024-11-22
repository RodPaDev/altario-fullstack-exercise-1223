import { Payment } from "./api/payment";

// state.ts
export type GridData = {
    grid: string;
    code: string;
};

export type State = {
    gridData: GridData | null;
    isConnected: boolean;
    isGeneratorStarted: boolean;
    biasChar: string;
    lastBiasTime: number | null;
    isBiasInputDisabled: boolean;
    payments: Payment[]
};

export const initialState: State = {
    gridData: null,
    payments: [],
    isConnected: false,
    isGeneratorStarted: false,
    biasChar: "",
    lastBiasTime: null,
    isBiasInputDisabled: false
};

export type Action =
    | { type: 'SET_GRID_DATA'; payload: GridData }
    | { type: 'SET_IS_CONNECTED'; payload: boolean }
    | { type: 'TOGGLE_GENERATOR' }
    | { type: 'SET_BIAS_CHAR'; payload: string }
    | { type: 'SET_LAST_BIAS_TIME'; payload: number | null }
    | { type: 'SET_BIAS_INPUT_DISABLED'; payload: boolean }
    | { type: 'ADD_PAYMENT'; payload: Payment }
    | { type: 'SET_PAYMENTS'; payload: Payment[] }

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_GRID_DATA':
            return { ...state, gridData: action.payload };
        case 'SET_IS_CONNECTED':
            return { ...state, isConnected: action.payload };
        case 'TOGGLE_GENERATOR':
            return { ...state, isGeneratorStarted: !state.isGeneratorStarted };
        case 'SET_BIAS_CHAR':
            return { ...state, biasChar: action.payload };
        case 'SET_LAST_BIAS_TIME':
            return { ...state, lastBiasTime: action.payload };
        case 'SET_BIAS_INPUT_DISABLED':
            return { ...state, isBiasInputDisabled: action.payload };
        case 'ADD_PAYMENT':
            return { ...state, payments: [...state.payments, action.payload] }
        case 'SET_PAYMENTS':
            return { ...state, payments: [...action.payload] }
        default:
            return state;
    }
}