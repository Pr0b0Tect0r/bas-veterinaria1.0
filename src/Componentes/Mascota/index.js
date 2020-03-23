import React from 'react'
import Mascota from './Mascota';
import { MascotaContextProviders } from './mascotaContext';

function IndexMascota() {
	return (
		<MascotaContextProviders>
			<Mascota />
		</MascotaContextProviders>
	)
}

export default IndexMascota;