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
	Zoom,
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import TipomovimientoContext from './tipomovimientoContext';
import AppInteractionContext from '../helpers/appInteraction';

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
	},
	button: {
		marginTop: theme.spacing(3.5)
	},
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});


export default function TablaTipomovimiento() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { tipomovimiento, dispatchTipomovimiento } = React.useContext(TipomovimientoContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const classes = useStyles();
	const movimientosIngreso = [
		{
			id_movimiento: 0,
			nombre: 'Inventarios',
			tipomovimiento: 'Ingreso',
			siglas: 'INV',
			automatico: 'Manual',
			calculocosto: 'Calcula costo',
			estado: 'activo'

		},
		{
			id_movimiento: 1,
			nombre: 'Compras',
			tipomovimiento: 'Ingreso',
			siglas: 'COMP',
			automatico: 'Manual',
			calculocosto: 'Calcula costo',
			estado: 'activo'

		},
		{
			id_movimiento: 2,
			nombre: 'Ingreso por traslado',
			tipomovimiento: 'Ingreso',
			siglas: 'TRAS',
			automatico: 'Manual',
			calculocosto: 'Calcula costo',
			estado: 'activo'

		},
		{
			id_movimiento: 3,
			nombre: 'Regularización',
			tipomovimiento: 'Ingreso',
			siglas: 'REG',
			automatico: 'Manual',
			calculocosto: 'Calcula costo',
			estado: 'activo'

		},
		{
			id_movimiento: 4,
			nombre: 'Ingreso por prestamo',
			tipomovimiento: 'Ingreso',
			siglas: 'PRES',
			automatico: 'Manual',
			calculocosto: 'Calcula costo',
			estado: 'activo'

		}
	]

	const movimientosSalida = [
		{
			id_movimiento: 0,
			nombre: 'Consumo',
			tipomovimiento: 'Salida',
			siglas: 'CON',
			automatico: 'Manual',
			calculocosto: 'Toma costo',
			estado: 'activo'

		},
		{
			id_movimiento: 1,
			nombre: 'Compras',
			tipomovimiento: 'Salida',
			siglas: 'COMP',
			automatico: 'Manual',
			calculocosto: 'Toma costo',
			estado: 'activo'

		},
		{
			id_movimiento: 2,
			nombre: 'Salida por traslado',
			tipomovimiento: 'Salida',
			siglas: 'TRAS',
			automatico: 'Manual',
			calculocosto: 'Toma costo',
			estado: 'activo'

		},
		{
			id_movimiento: 3,
			nombre: 'Regularización',
			tipomovimiento: 'Salida',
			siglas: 'REG',
			automatico: 'Manual',
			calculocosto: 'Toma costo',
			estado: 'activo'

		},
		{
			id_movimiento: 4,
			nombre: 'Salida por prestamo',
			tipomovimiento: 'Salida',
			siglas: 'PRES',
			automatico: 'Manual',
			calculocosto: 'Toma costo',
			estado: 'activo'

		}
	]

	const tipomovimientoConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchTipomovimiento(['consultar', { movimientosIngreso: movimientosIngreso, movimientosSalida: movimientosSalida }])
		dispatchTipomovimiento(['consultarinfo', { informaion: {}}])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		tipomovimientoConsultar()
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
		dispatch(['listaTipoMovimiento', '/tipomovimiento', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(tipomovimientoConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${tipomovimiento.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminado se perderá toda la información de este movimiento.
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
			<Zoom in={true} timeout={500}>
				<MaterialTable
					title='Ingreso'
					columns={[
						{ title: 'ID', field: 'id_movimiento' },
						{ title: 'Nombre', field: 'nombre' },
						{ title: 'Tipo movimiento', field: 'tipomovimiento' },
						{ title: 'Siglas', field: 'siglas' },
						{ title: 'Automático', field: 'automatico' },
						{ title: 'Calculo costo', field: 'calculocosto' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={tipomovimiento.movimientosIngreso}
					actions={[
						{
							icon: 'edit',
							tooltip: 'editar',
							onClick: (event, rowData) => {
								dispatch(['tipoMovimientoInfo', `/tipomovimiento/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchTipomovimiento(['abrirInfo', { id_movimiento: rowData.id_movimiento }])
								dispatchTipomovimiento(['consultarInfo', { informacion: movimientosIngreso[rowData.id_movimiento] }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchTipomovimiento(['eliminarMovimiento', { id_eliminar: rowData.id_movimiento, nombreEliminar: rowData.nombre }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { tipomovimientoConsultar() }
						},
						{
							icon: 'filter_list',
							tooltip: 'Filtrar',
							isFreeAction: true,
							onClick: (event) => { alert('filtro') }
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
			<Zoom in={true} timeout={1000}>
				<MaterialTable
					title='Salida'
					columns={[
						{ title: 'ID', field: 'id_movimiento' },
						{ title: 'Nombre', field: 'nombre' },
						{ title: 'Tipo movimiento', field: 'tipomovimiento' },
						{ title: 'Siglas', field: 'siglas' },
						{ title: 'Automático', field: 'automatico' },
						{ title: 'Calculo costo', field: 'calculocosto' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={tipomovimiento.movimientosSalida}
					actions={[
						{
							icon: 'edit',
							tooltip: 'editar',
							onClick: (event, rowData) => {
								dispatch(['tipoMovimientoInfo', `/tipomovimiento/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchTipomovimiento(['abrirInfo', { id_movimiento: rowData.id_movimiento }])
								dispatchTipomovimiento(['consultarInfo', { informacion: movimientosSalida[rowData.id_movimiento] }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchTipomovimiento(['eliminarMovimiento', { id_eliminar: rowData.id_movimiento, nombreEliminar: rowData.nombre }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { tipomovimientoConsultar() }
						},
						{
							icon: 'filter_list',
							tooltip: 'Filtrar',
							isFreeAction: true,
							onClick: (event) => { alert('filtro') }
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