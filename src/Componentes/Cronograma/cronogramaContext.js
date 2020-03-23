import React from 'react'

const CronogramaContext = React.createContext()

const initialState = {
	informacion: {},
	otraInformacion: {},
	cronogramas: [],
	id_cronograma: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function cronogramaFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, cronogramas: payload };

		case 'abrirInfo':
			return { ...state, id_cronograma: payload.id_cronograma };

		case 'eliminarCronograma':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload.informacion, otraInformacion: payload.otraInformacion };

		default:
			return state;
	}
}

export const CronogramaContextProvider = CronogramaContext.Provider

export const CronogramaContextProviders = (props) => {
	const [cronograma, dispatchCronograma] = React.useReducer(cronogramaFunctionReducer, initialState)

	return (<CronogramaContextProvider value={{ cronograma, dispatchCronograma }}>
		{props.children}
	</CronogramaContextProvider>)
}

export default CronogramaContext	