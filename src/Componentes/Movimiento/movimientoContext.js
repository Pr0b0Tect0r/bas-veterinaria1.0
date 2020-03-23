import React from 'react'

const MovimientoContext = React.createContext()

const initialState = {
	informacion: {},
	otraInformacion: {},
	movimientos: [],
	id_movimiento: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function movimientoFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, movimientos: payload };

		case 'abrirInfo':
			return { ...state, id_movimiento: payload.id_movimiento };

		case 'eliminarMovimiento':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion, otraInformacion: payload.otraInformacion };

		default:
			return state;
	}
}

export const MovimientoContextProvider = MovimientoContext.Provider

export const MovimientoContextProviders = (props) => {
	const [movimiento, dispatchMovimiento] = React.useReducer(movimientoFunctionReducer, initialState)

	return (<MovimientoContextProvider value={{ movimiento, dispatchMovimiento }}>
		{props.children}
	</MovimientoContextProvider>)
}

export default MovimientoContext	