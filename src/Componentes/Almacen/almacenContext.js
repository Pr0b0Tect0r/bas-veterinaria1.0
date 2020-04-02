import React from 'react'

const AlmacenContext = React.createContext()

const initialState = {
	informacion: {},
	almacenes: [],
	id_almacen: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function almacenFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, almacenes: payload.almacenes };

		case 'abrirInfo':
			return { ...state, id_almacen: payload.id_almacen };

		case 'eliminarAlmacen':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const AlmacenContextProvider = AlmacenContext.Provider

export const AlmacenContextProviders = (props) => {
	const [almacen, dispatchAlmacen] = React.useReducer(almacenFunctionReducer, initialState)

	return (<AlmacenContextProvider value={{ almacen, dispatchAlmacen }}>
		{props.children}
	</AlmacenContextProvider>)
}

export default AlmacenContext	