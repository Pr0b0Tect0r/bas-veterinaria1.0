import React from 'react'
import Orden from './Orden';
import { OrdenContextProviders } from './ordenContext';

function IndexOrden() {
	return (
		<OrdenContextProviders>
			<Orden />
		</OrdenContextProviders>
	)
}

export default IndexOrden;