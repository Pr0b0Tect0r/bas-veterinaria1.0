import React from 'react'

const InventarioContext = React.createContext()

const initialState = {
	informacion: {},
	inventarios: [],
	id_inventario: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function inventarioFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, inventarios: payload.inventarios };

		case 'abrirInfo':
			return { ...state, id_inventario: payload.id_inventario };

		case 'eliminarInventario':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const InventarioContextProvider = InventarioContext.Provider

export const InventarioContextProviders = (props) => {
	const [inventario, dispatchInventario] = React.useReducer(inventarioFunctionReducer, initialState)

	return (<InventarioContextProvider value={{ inventario, dispatchInventario }}>
		{props.children}
	</InventarioContextProvider>)
}

export default InventarioContext	