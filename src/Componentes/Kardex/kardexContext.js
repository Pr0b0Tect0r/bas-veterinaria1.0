import React from 'react'

const KardexContext = React.createContext()

const initialState = {
	informacion: {},
	kardexs: [],
	id_kardex: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function kardexFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, kardexs: payload.kardexs };

		case 'abrirInfo':
			return { ...state, id_kardex: payload.id_kardex };

		case 'eliminarKardex':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion };

		default:
			return state;
	}
}

export const KardexContextProvider = KardexContext.Provider

export const KardexContextProviders = (props) => {
	const [kardex, dispatchKardex] = React.useReducer(kardexFunctionReducer, initialState)

	return (<KardexContextProvider value={{ kardex, dispatchKardex }}>
		{props.children}
	</KardexContextProvider>)
}

export default KardexContext	