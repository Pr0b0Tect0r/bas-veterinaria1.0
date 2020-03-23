import React from 'react'

const CuentaContext = React.createContext()

const initialState = {
	informacion: {}
}

function cuentaFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		default:
			return state;
	}
}

export const CuentaContextProvider = CuentaContext.Provider

export const CuentaContextProviders = (props) => {
	const [cuenta, dispatchCuenta] = React.useReducer(cuentaFunctionReducer, initialState)

	return (<CuentaContextProvider value={{ cuenta, dispatchCuenta }}>
		{props.children}
	</CuentaContextProvider>)
}

export default CuentaContext	