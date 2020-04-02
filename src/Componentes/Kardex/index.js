import React from 'react'
import Kardex from './Kardex';
import { KardexContextProviders } from './kardexContext';

function IndexKardex() {
	return (
		<KardexContextProviders>
			<Kardex />
		</KardexContextProviders>
	)
}

export default IndexKardex;