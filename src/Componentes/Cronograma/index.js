import React from 'react'
import Cronograma from './Cronograma';
import { CronogramaContextProviders } from './cronogramaContext';

function IndexCronograma() {
	return (
		<CronogramaContextProviders>
			<Cronograma />
		</CronogramaContextProviders>
	)
}

export default IndexCronograma;