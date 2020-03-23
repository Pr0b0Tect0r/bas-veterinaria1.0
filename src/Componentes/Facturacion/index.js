import React from 'react'
import Factura from './Factura';
import { FacturaContextProviders } from './facturaContext';

function IndexFactura() {
	return (
		<FacturaContextProviders>
			<Factura />
		</FacturaContextProviders>
	)
}

export default IndexFactura;