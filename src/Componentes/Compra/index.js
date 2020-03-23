import React from 'react'
import Compra from './Compra';
import { CompraContextProviders } from './compraContext';

function IndexCompra() {
	return (
		<CompraContextProviders>
			<Compra />
		</CompraContextProviders>
	)
}

export default IndexCompra;