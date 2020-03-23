import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Slide,
	Backdrop,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
	Zoom,
	Menu,
	MenuItem
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import FacturaContext from './facturaContext';
import AppInteractionContext from '../helpers/appInteraction'

const useStyles = makeStyles((theme) => ({
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		width: 130,
		height: 130,
		margin: 'auto'
	},
	texto: {
		textAlign: 'center',
		marginTop: theme.spacing(1)
	},
	card: {
		width: '95%',
		transition: 'all .2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.02)'
		}
	},
	typography: {
		padding: theme.spacing(2),
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

export default function TablaFactura() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { factura, dispatchFactura } = React.useContext(FacturaContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const facturas = [
		{
			id_factura: 0,
			idtipodocumento: '18865566',
			fechaemision: '09/03/2020',
			idsocionegocio: 'Pablo Pérez',
			referencia: 'F9756',
			tc: '3.39',
			serie: '156796',
			numero: '001',
			idestado: 'Abierta',
			moneda: 'dolares',
			ordenservicio: '013254',
			observaciones: 'sin observación'
		},
		{
			id_factura: 1,
			idtipodocumento: '15604401990',
			fechaemision: '11/03/2020',
			idsocionegocio: 'Samuel Bustamante',
			referencia: 'F9756',
			tc: '3.39',
			serie: '156796',
			numero: '002',
			idestado: 'Abierta',
			moneda: 'dolares',
			ordenservicio: '013254',
			observaciones: 'sin observación'
		},
		{
			id_factura: 2,
			idtipodocumento: '18904407885',
			fechaemision: '05/03/2020',
			idsocionegocio: 'John Wick',
			referencia: 'F9756',
			tc: '3.39',
			serie: '156796',
			numero: '003',
			idestado: 'Cerrada',
			moneda: 'dolares',
			ordenservicio: '013254',
			observaciones: 'sin observación'
		},
		{
			id_factura: 3,
			idtipodocumento: '18904457885',
			fechaemision: '09/03/2020',
			idsocionegocio: 'Juan Lizama',
			referencia: 'F9756',
			tc: '3.39',
			serie: '156796',
			numero: '004',
			idestado: 'Abierta',
			moneda: 'dolares',
			ordenservicio: '013254',
			observaciones: 'sin observación'
		}
	]

	const facturasdetalle = [
		{
			id_detalle: 0,
			item: 0,
			producto: 'correas',
			cantidad: 5,
			preciounitario: 10,
			descuento: 0,
			parcial: 0,
			igv: true
		},
		{
			id_detalle: 1,
			item: 1,
			producto: 'huesos',
			cantidad: 3,
			preciounitario: 15,
			descuento: 0,
			parcial: 0,
			igv: true
		},
		{
			id_detalle: 2,
			item: 2,
			producto: 'pecheras',
			cantidad: 11,
			preciounitario: 5,
			descuento: 0,
			parcial: 0,
			igv: true
		},
		{
			id_detalle: 3,
			item: 3,
			producto: 'shampoo',
			cantidad: 30,
			preciounitario: 5,
			descuento: 0,
			parcial: 0,
			igv: true
		}
	]

	const facturaConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchFactura(['consultar', facturas])
		// })
		dispatchFactura(['clear', { informacion: {}, informaciondetalle: [] }])
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		facturaConsultar()
		// })
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Nuevo' },
			{ name: 'Imprimir' },
			{ name: 'Excel' }
		]
		dispatch(['listaFactura', '/facturacion', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(facturaConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar la factura N° ${factura.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de esta factura.
          			</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="secondary">
						Cancelar
          			</Button>
					<Button variant='contained' onClick={() => eliminar()} color="primary">
						Confirmar
          			</Button>
				</DialogActions>
			</Dialog>
			<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				onClose={() => setAnchorEl(null)}>
				<MenuItem>
					<Typography variant='button'>busqueda</Typography>
				</MenuItem>
			</Menu>
			<Zoom in={true} timeout={500}>
				<MaterialTable
					title='Lista de facturas'
					columns={[
						{ title: 'ID', field: 'id_factura' },
						{ title: 'Serie', field: 'serie' },
						{ title: 'Número', field: 'numero' },
						{ title: 'Fecha', field: 'fechaemision' },
						{ title: 'Cliente', field: 'idsocionegocio' },
						{ title: 'Referencia', field: 'referencia' },
						{ title: 'Documento', field: 'idtipodocumento' },
						{ title: 'Moneda', field: 'moneda' },
						{ title: 'Estado', field: 'idestado' }
					]}
					data={factura.facturas}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver',
							onClick: (event, rowData) => {
								dispatch(['facturaInfo', `/facturacion/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchFactura(['abrirInfo', { id_factura: rowData.id_factura }])
								dispatchFactura(['consultarInfo', { informacion: facturas[rowData.id_factura], informaciondetalle: facturasdetalle[rowData.id_factura] }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchFactura(['eliminarFactura', { id_eliminar: rowData.id_factura, nombreEliminar: rowData.numero }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { facturaConsultar() }
						},
						{
							icon: 'filter_list',
							tooltip: 'Filtrar',
							isFreeAction: true,
							onClick: (event) => {
								setAnchorEl(event.currentTarget);
							}
						}
					]}
					localization={{
						pagination: {
							labelDisplayedRows: '{from}-{to} de {count}'
						},
						toolbar: {
							nRowsSelected: '{0} fila(s) seleccionadas'
						},
						header: {
							actions: 'Actions'
						},
						body: {
							emptyDataSourceMessage: 'No hay nada para mostrar',
							filterRow: {
								filterTooltip: 'Filter'
							}
						}
					}}
					options={{
						search: false
					}}
				/>
			</Zoom>
		</>
	);
}