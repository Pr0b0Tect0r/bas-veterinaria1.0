import React from 'react'
import Producto from './Producto';
import { ProductoContextProviders } from './productoContext';

function IndexProducto() {
	return (
		<ProductoContextProviders>
			<Producto />
		</ProductoContextProviders>
	)
}

export default IndexProducto;