import React from 'react'

const ValorContext = React.createContext()

const initialState = {
	informacion: {},
	valores: [],
	id_valor: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function valorFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, valores: payload.valores };

		case 'abrirInfo':
			return { ...state, id_valor: payload.id_valor };

		case 'eliminarValor':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const ValorContextProvider = ValorContext.Provider

export const ValorContextProviders = (props) => {
	const [valor, dispatchValor] = React.useReducer(valorFunctionReducer, initialState)

	return (<ValorContextProvider value={{ valor, dispatchValor }}>
		{props.children}
	</ValorContextProvider>)
}

export default ValorContext	