import React from 'react'

const MascotaContext = React.createContext()

const initialState = {
	informacion: {},
	mascotas: [],
	id_mascota: '',
	id_eliminar: '',
	nombreEliminar: ''
}

function mascotaFunctionReducer(state, [action, payload]) {
	switch (action) {
		case 'guardar':
			return { ...state, informacion: payload };

		case 'consultar':
			return { ...state, mascotas: payload };

		case 'abrirInfo':
			return { ...state, id_mascota: payload.id_mascota };

		case 'eliminarMascota':
			return { ...state, id_eliminar: payload.id_eliminar, nombreEliminar: payload.nombreEliminar };

		case 'consultarInfo':
			return { ...state, informacion: payload };

		default:
			return state;
	}
}

export const MascotaContextProvider = MascotaContext.Provider

export const MascotaContextProviders = (props) => {
	const [mascota, dispatchMascota] = React.useReducer(mascotaFunctionReducer, initialState)

	return (<MascotaContextProvider value={{ mascota, dispatchMascota }}>
		{props.children}
	</MascotaContextProvider>)
}

export default MascotaContext	