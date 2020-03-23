import React from 'react'

const CitaContext = React.createContext()

const initialState = {
    informacion: {},
    citas: [],
    id_cita: '',
    id_eliminar: '',
    nombreEliminar: ''
}

function citaFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'guardar':
            return { ...state, informacion: payload };

        case 'consultar':
            return { ...state, citas: payload };

        case 'abrirInfo':
            return { ...state, id_cita: payload.id_cita };

        case 'eliminarCita':
            return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

        case 'consultarInfo':
            return { ...state, informacion: payload };

        case 'confirmar':
            return { ...state, informacion: { ...state.informacion, idestado: payload } }

        case 'cancelar':
            return { ...state, informacion: { ...state.informacion, idestado: payload } }

        case 'reprogramar':
            return { ...state, informacion: { ...state.informacion, fechacita: payload.fechacita, horacita: payload.horacita } }

        default:
            return state;
    }
}

export const CitaContextProvider = CitaContext.Provider

export const CitaContextProviders = (props) => {
    const [cita, dispatchCita] = React.useReducer(citaFunctionReducer, initialState)

    return (<CitaContextProvider value={{ cita, dispatchCita }}>
        {props.children}
    </CitaContextProvider>)
}

export default CitaContext	