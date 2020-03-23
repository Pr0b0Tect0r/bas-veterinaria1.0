import React from 'react'

const FacturaContext = React.createContext()

const initialState = {
	informacion: {},
	informaciondetalle: {},
	facturascreadas: [],
	facturas: [],
	id_factura: '',
	id_eliminar: '',
	nombreEliminar: '',
	porcentaje: 0,
	precio: 0,
	subtotal: 0,
	total: 0,
	id_eliminarFactura: ''
}

function facturaFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, facturas: payload };

		case 'abrirInfo':
			return { ...state, id_factura: payload.id_factura };

		case 'eliminarFactura':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion, informaciondetalle: payload.informaciondetalle, facturascreadas: [...state.facturascreadas, payload.informaciondetalle] };

		case 'insertarFactura':
			return { ...state, facturascreadas: [...state.facturascreadas, payload] };

		case 'eliminarArray':
			return { ...state, subtotal: (parseInt(state.subtotal) - parseInt(payload.preciorestar)), precio: parseInt(state.precio) === parseInt(payload.preciorestar) ? (parseInt(state.precio) - parseInt(payload.preciorestar)) : 0, porcentaje: ((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100), total: (((18 * (parseInt(state.subtotal) - parseInt(payload.preciorestar))) / 100) + (parseInt(state.subtotal) - parseInt(payload.preciorestar))) };

		case 'sumar':
			return { ...state, precio: payload.precio, subtotal: parseInt(state.subtotal) + parseInt(payload.precionuevo), porcentaje: ((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100), total: (((18 * (parseInt(state.subtotal) + parseInt(payload.precionuevo))) / 100) + (parseInt(state.subtotal) + parseInt(payload.precionuevo))) }

		case 'clear':
			return { ...state, informacion: payload.informacion, informaciondetalle: payload.informaciondetalle, facturascreadas: [] };


		default:
			return state;
	}
}

export const FacturaContextProvider = FacturaContext.Provider

export const FacturaContextProviders = (props) => {
	const [factura, dispatchFactura] = React.useReducer(facturaFunctionReducer, initialState)

	return (<FacturaContextProvider value={{ factura, dispatchFactura }}>
		{props.children}
	</FacturaContextProvider>)
}

export default FacturaContext	