import React from 'react'
import Almacen from './Almacen';
import { AlmacenContextProviders } from './almacenContext';

function IndexAlmacen() {
	return (
		<AlmacenContextProviders>
			<Almacen />
		</AlmacenContextProviders>
	)
}

export default IndexAlmacen;