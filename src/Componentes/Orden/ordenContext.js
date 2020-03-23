import React from 'react'

const OrdenContext = React.createContext()

const initialState = {
	informacion: {},
	informaciondetalle: {},
	ordenescreadas: [],
	ordenes: [],
	id_orden: '',
	id_eliminar: '',
	nombreEliminar: '',
	porcentaje: 0,
	precio: 0,
	subtotal: 0,
	total: 0,
	id_eliminarOrden: ''
}

function ordenFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, ordenes: payload };

		case 'abrirInfo':
			return { ...state, id_orden: payload.id_orden };

		case 'eliminarOrden':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informaciondetalle: payload };

		case 'insertarOrden':
			return { ...state, ordenescreadas: [...state.ordenescreadas, payload] };

		case 'eliminarArray':
			return { ...state, subtotal: (parseInt(state.subtotal) - parseInt(payload.preciorestar)), precio: parseInt(state.precio) === parseInt(payload.preciorestar) ? (parseInt(state.precio) - parseInt(payload.preciorestar)) : 0, porcentaje: ((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100), total: (((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100) + (parseInt(state.subtotal) - parseInt(payload.preciorestar))) };

		case 'sumar':
			return { ...state, precio: payload.precio, subtotal: parseInt(state.subtotal) + parseInt(payload.precionuevo), porcentaje: ((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100), total: (((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100) + (parseInt(state.subtotal) + parseInt(payload.precionuevo))) }

		default:
			return state;
	}
}

export const OrdenContextProvider = OrdenContext.Provider

export const OrdenContextProviders = (props) => {
	const [orden, dispatchOrden] = React.useReducer(ordenFunctionReducer, initialState)

	return (<OrdenContextProvider value={{ orden, dispatchOrden }}>
		{props.children}
	</OrdenContextProvider>)
}

export default OrdenContext	