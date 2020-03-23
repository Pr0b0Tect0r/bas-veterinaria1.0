import React from 'react'
import Cajaybancos from './Cajaybancos';
import { CajaybancosContextProviders } from './cajaybancosContext';

function IndexCajaybancos() {
	return (
		<CajaybancosContextProviders>
			<Cajaybancos />
		</CajaybancosContextProviders>
	)
}

export default IndexCajaybancos;