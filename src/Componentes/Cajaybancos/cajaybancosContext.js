import React from 'react'

const CajaybancosContext = React.createContext()

const initialState = {
	informacion: {}
}

function cajaybancosFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		default:
			return state;
	}
}

export const CajaybancosContextProvider = CajaybancosContext.Provider

export const CajaybancosContextProviders = (props) => {
	const [cajaybancos, dispatchCajaybancos] = React.useReducer(cajaybancosFunctionReducer, initialState)

	return (<CajaybancosContextProvider value={{ cajaybancos, dispatchCajaybancos }}>
		{props.children}
	</CajaybancosContextProvider>)
}

export default CajaybancosContext	