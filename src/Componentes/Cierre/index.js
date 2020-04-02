import React from 'react'
import Cierre from './Cierre';
import { CierreContextProviders } from './cierreContext';

function IndexCierre() {
	return (
		<CierreContextProviders>
			<Cierre />
		</CierreContextProviders>
	)
}

export default IndexCierre;