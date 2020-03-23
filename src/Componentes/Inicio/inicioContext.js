import React from 'react'

const InicioContext = React.createContext()

const initialState = {
    usuarios: '',
    reuniones: ''
}

function inicioFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'usuarios':
            return { ...state, usuarios: payload };

        case 'reuniones':
            return { ...state, reuniones: payload }

        default:
            return state;
    }
}

export const InicioContextProvider = InicioContext.Provider

export const InicioContextProviders = (props) => {
    const [inicio, dispatchInicio] = React.useReducer(inicioFunctionReducer, initialState)

    return (<InicioContextProvider value={{ inicio, dispatchInicio }}>
        {props.children}
    </InicioContextProvider>)
}

export default InicioContext	