import React from 'react'

const CompraContext = React.createContext()

const initialState = {
	informacion: {},
	informaciondetalle: {},
	comprascreadas: [],
	compras: [],
	id_compra: '',
	id_eliminar: '',
	nombreEliminar: '',
	porcentaje: 0,
	precio: 0,
	subtotal: 0,
	total: 0,
	id_eliminarCompra: ''
}

function compraFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, compras: payload };

		case 'abrirInfo':
			return { ...state, id_compra: payload.id_compra };

		case 'eliminarCompra':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion, informaciondetalle: payload.informaciondetalle, comprascreadas: [...state.comprascreadas, payload.informaciondetalle] };


		case 'insertarCompra':
			return { ...state, comprascreadas: [...state.comprascreadas, payload] };

		case 'eliminarArray':
			return { ...state, subtotal: (parseInt(state.subtotal) - parseInt(payload.preciorestar)), precio: parseInt(state.precio) === parseInt(payload.preciorestar) ? (parseInt(state.precio) - parseInt(payload.preciorestar)) : 0, porcentaje: ((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100), total: (((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100) + (parseInt(state.subtotal) - parseInt(payload.preciorestar))) };

		case 'sumar':
			return { ...state, precio: payload.precio, subtotal: parseInt(state.subtotal) + parseInt(payload.precionuevo), porcentaje: ((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100), total: (((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100) + (parseInt(state.subtotal) + parseInt(payload.precionuevo))) }

		case 'clear':
			return { ...state, informacion: payload.informacion, informaciondetalle: payload.informaciondetalle, comprascreadas: [] };

		default:
			return state;
	}
}

export const CompraContextProvider = CompraContext.Provider

export const CompraContextProviders = (props) => {
	const [compra, dispatchCompra] = React.useReducer(compraFunctionReducer, initialState)

	return (<CompraContextProvider value={{ compra, dispatchCompra }}>
		{props.children}
	</CompraContextProvider>)
}

export default CompraContext	