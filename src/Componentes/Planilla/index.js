import React from 'react'
import Planilla from './Planilla';
import { PlanillaContextProviders } from './planillaContext';

function IndexPlanilla() {
	return (
		<PlanillaContextProviders>
			<Planilla />
		</PlanillaContextProviders>
	)
}

export default IndexPlanilla;