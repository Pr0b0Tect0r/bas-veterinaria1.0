import React from 'react'

const ProductoContext = React.createContext()

const initialState = {
	informacion: {},
	productos: [],
	id_producto: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function productoFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, productos: payload };

		case 'abrirInfo':
			return { ...state, id_producto: payload.id_producto };

		case 'eliminarProducto':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload };

		default:
			return state;
	}
}

export const ProductoContextProvider = ProductoContext.Provider

export const ProductoContextProviders = (props) => {
	const [producto, dispatchProducto] = React.useReducer(productoFunctionReducer, initialState)

	return (<ProductoContextProvider value={{ producto, dispatchProducto }}>
		{props.children}
	</ProductoContextProvider>)
}

export default ProductoContext	