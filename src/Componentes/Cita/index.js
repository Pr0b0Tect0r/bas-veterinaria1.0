import React from 'react'
import Cita from './Cita';
import { CitaContextProviders } from './citaContext';

function IndexCita() {
	return (
		<CitaContextProviders>
			<Cita />
		</CitaContextProviders>
	)
}

export default IndexCita;