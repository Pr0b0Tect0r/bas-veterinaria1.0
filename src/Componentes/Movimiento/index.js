import React from 'react'
import Movimiento from './Movimiento';
import { MovimientoContextProviders } from './movimientoContext';

function IndexMovimiento() {
	return (
		<MovimientoContextProviders>
			<Movimiento />
		</MovimientoContextProviders>
	)
}

export default IndexMovimiento;