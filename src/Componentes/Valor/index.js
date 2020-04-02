import React from 'react'
import Valor from './Valor';
import { ValorContextProviders } from './valorContext';

function IndexValor() {
	return (
		<ValorContextProviders>
			<Valor />
		</ValorContextProviders>
	)
}

export default IndexValor;