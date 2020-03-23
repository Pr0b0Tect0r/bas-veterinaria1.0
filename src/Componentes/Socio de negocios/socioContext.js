import React from 'react'

const SocioContext = React.createContext()

const initialState = {
    informacion: {},
    socios: [],
    id_socio: '',
    id_eliminar: '',
    nombreEliminar: ''
}

function socioFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'guardar':
            return { ...state, informacion: payload };

        case 'consultar':
            return { ...state, socios: payload };

        case 'abrirInfo':
            return { ...state, id_socio: payload.id_socio };

        case 'eliminarSocio':
            return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

        case 'consultarInfo':
            return { ...state, informacion: payload };

        default:
            return state;
    }
}

export const SocioContextProvider = SocioContext.Provider

export const SocioContextProviders = (props) => {
    const [socio, dispatchSocio] = React.useReducer(socioFunctionReducer, initialState)

    return (<SocioContextProvider value={{ socio, dispatchSocio }}>
        {props.children}
    </SocioContextProvider>)
}

export default SocioContext	