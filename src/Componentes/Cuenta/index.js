import React from 'react'
import Cuenta from './Cuenta';
import { CuentaContextProviders } from './cuentaContext';

function IndexCuenta() {
	return (
		<CuentaContextProviders>
			<Cuenta />
		</CuentaContextProviders>
	)
}

export default IndexCuenta;