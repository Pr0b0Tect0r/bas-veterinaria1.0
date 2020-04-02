import React from 'react'
import Inventario from './Inventario';
import { InventarioContextProviders } from './inventarioContext';

function IndexInventario() {
	return (
		<InventarioContextProviders>
			<Inventario />
		</InventarioContextProviders>
	)
}

export default IndexInventario;