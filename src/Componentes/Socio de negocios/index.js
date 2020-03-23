import React from 'react'
import Socio from './Socio';
import { SocioContextProviders } from './socioContext';

function IndexSocio() {
    return (
        <SocioContextProviders>
            <Socio />
        </SocioContextProviders>
    )
}

export default IndexSocio;