import React from 'react'
import Tipomovimiento from './Tipomovimiento';
import { TipomovimientoContextProviders } from './tipomovimientoContext';

function IndexTipomovimiento() {
	return (
		<TipomovimientoContextProviders>
			<Tipomovimiento />
		</TipomovimientoContextProviders>
	)
}

export default IndexTipomovimiento;