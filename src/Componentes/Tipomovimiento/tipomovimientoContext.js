import React from 'react'

const TipomovimientoContext = React.createContext()

const initialState = {
	informacion: {},
	movimientosIngreso: [],
	movimientosSalida: [],
	id_movimiento: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function tipomovimientoFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, movimientosIngreso: payload.movimientosIngreso, movimientosSalida: payload.movimientosSalida };

		case 'abrirInfo':
			return { ...state, id_movimiento: payload.id_movimiento };

		case 'eliminarMovimiento':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const TipomovimientoContextProvider = TipomovimientoContext.Provider

export const TipomovimientoContextProviders = (props) => {
	const [tipomovimiento, dispatchTipomovimiento] = React.useReducer(tipomovimientoFunctionReducer, initialState)

	return (<TipomovimientoContextProvider value={{ tipomovimiento, dispatchTipomovimiento }}>
		{props.children}
	</TipomovimientoContextProvider>)
}

export default TipomovimientoContext	