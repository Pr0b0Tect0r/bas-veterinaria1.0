export const initialState = {
    formContent: {
        path: '',
        funcion: '',
        funcionSecundaria: false
    },
    acciones: []
}


export function interactionFunctionReducer(state, [action, path, funcion, funcionSecundaria, payload]) {
    switch (action) {
        case 'inicio':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'agenda':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaMascota':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'mascotaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'mascotaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaSocio':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'socioInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'socioNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'Volver':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'Nuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'Tarjeta':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaProducto':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'productoInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'productoNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCita':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'citaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'citaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaFactura':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'facturaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'facturaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCompra':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'compraInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'compraNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaOrden':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'ordenInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'ordenNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCuenta':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cuentaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cuentaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCajaybancos':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cajaybancosInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cajaybancosNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };


        case 'listaMovimiento':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'movimientoInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'movimientoNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCronograma':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cronogramaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cronogramaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaPlanilla':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'planillaInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'planillaNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };


        case 'listaTipoMovimiento':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'tipoMovimientoInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'tipoMovimientoNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaAlmacen':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'almacenInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'almacenNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };


        case 'listaValor':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'valorInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'valorNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaCierre':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cierreInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'cierreNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'listaKardex':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'kardexInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'kardexNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };


        case 'listaInventario':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'inventarioInfo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };

        case 'inventarioNuevo':
            return {...state, formContent: { path: path, funcion: funcion, funcionSecundaria: funcionSecundaria }, acciones: payload };


        default:
            return state;
    }
}