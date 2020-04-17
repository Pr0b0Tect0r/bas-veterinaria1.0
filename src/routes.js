import React from 'react';

const Inicio = React.lazy(() => import('./Componentes/Inicio'))
const Socio = React.lazy(() => import('./Componentes/Socio de negocios'))
const Mascota = React.lazy(() => import('./Componentes/Mascota'))
const Producto = React.lazy(() => import('./Componentes/Producto'))
const Cita = React.lazy(() => import('./Componentes/Cita'))
const Factura = React.lazy(() => import('./Componentes/Facturacion'))
const Compra = React.lazy(() => import('./Componentes/Compra'))
const Orden = React.lazy(() => import('./Componentes/Orden'))
const Cuenta = React.lazy(() => import('./Componentes/Cuenta'))
const Cajaybancos = React.lazy(() => import('./Componentes/Cajaybancos'))
const Movimiento = React.lazy(() => import('./Componentes/Movimiento'))
const Cronograma = React.lazy(() => import('./Componentes/Cronograma'))
const Planilla = React.lazy(() => import('./Componentes/Planilla'))
const Tipomovimiento = React.lazy(() => import('./Componentes/Tipomovimiento'))
const Almacen = React.lazy(() => import('./Componentes/Almacen'))
const Valor = React.lazy(() => import('./Componentes/Valor'))
const Cierre = React.lazy(() => import('./Componentes/Cierre'))
const Kardex = React.lazy(() => import('./Componentes/Kardex'))
const Inventario = React.lazy(() => import('./Componentes/Inventario'))
const Acercade = React.lazy(() => import('./Componentes/Acercade'))

const routes = [
	{ id: '0', path: '/inicio', exact: true, name: 'Inicio', component: Inicio },
	{ id: '1', path: '/socio', exact: true, name: 'Socio de negocios', component: Socio },
	{ id: '2', path: '/mascota', exact: true, name: 'Mascota', component: Mascota },
	{ id: '3', path: '/producto', exact: true, name: 'Producto', component: Producto },
	{ id: '4', path: '/cita', exact: true, name: 'Cita', component: Cita },
	{ id: '5', path: '/facturacion', exact: true, name: 'Facturación', component: Factura },
	{ id: '6', path: '/compra', exact: true, name: 'Compra', component: Compra },
	{ id: '7', path: '/orden', exact: true, name: 'Orden de servicio', component: Orden },
	{ id: '8', path: '/cuenta', exact: true, name: 'Cuentas', component: Cuenta },
	{ id: '9', path: '/caja_y_bancos', exact: true, name: 'Caja y bancos', component: Cajaybancos },
	{ id: '10', path: '/movimiento', exact: true, name: 'Movimientos de cuentas', component: Movimiento },
	{ id: '11', path: '/cronograma', exact: true, name: 'Cronograma de pagos', component: Cronograma },
	{ id: '12', path: '/planilla', exact: true, name: 'Planilla de cobranza', component: Planilla },
	{ id: '13', path: '/tipomovimiento', exact: true, name: 'Tipo de movimiento', component: Tipomovimiento },
	{ id: '14', path: '/almacen', exact: true, name: 'Almacen', component: Almacen },
	{ id: '15', path: '/valor', exact: true, name: 'Valorización de inventario', component: Valor },
	{ id: '16', path: '/cierre', exact: true, name: 'Cierre mensual', component: Cierre },
	{ id: '17', path: '/kardex', exact: true, name: 'Kardex', component: Kardex },
	{ id: '18', path: '/inventario', exact: true, name: 'Inventario', component: Inventario },
	{ id: '19', path: '/acercade', exact: true, name: 'Acerca de', component: Acercade }
];

export default routes;