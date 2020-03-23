import React from 'react'

const PlanillaContext = React.createContext()

const initialState = {
	informacion: {},
	otraInformacion: {},
	planillas: [],
	id_planilla: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function planillaFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, planillas: payload };

		case 'abrirInfo':
			return { ...state, id_planilla: payload.id_planilla };

		case 'eliminarPlanilla':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion, otraInformacion: payload.otraInformacion };

		default:
			return state;
	}
}

export const PlanillaContextProvider = PlanillaContext.Provider

export const PlanillaContextProviders = (props) => {
	const [planilla, dispatchPlanilla] = React.useReducer(planillaFunctionReducer, initialState)

	return (<PlanillaContextProvider value={{ planilla, dispatchPlanilla }}>
		{props.children}
	</PlanillaContextProvider>)
}

export default PlanillaContext	