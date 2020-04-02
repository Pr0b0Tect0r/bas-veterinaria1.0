import React from 'react'

const CierreContext = React.createContext()

const initialState = {
	informacion: {},
	cierres: [],
	id_cierre: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function cierreFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, cierres: payload.cierres };

		case 'abrirInfo':
			return { ...state, id_cierre: payload.id_cierre };

		case 'eliminarCierre':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const CierreContextProvider = CierreContext.Provider

export const CierreContextProviders = (props) => {
	const [cierre, dispatchCierre] = React.useReducer(cierreFunctionReducer, initialState)

	return (<CierreContextProvider value={{ cierre, dispatchCierre }}>
		{props.children}
	</CierreContextProvider>)
}

export default CierreContext	