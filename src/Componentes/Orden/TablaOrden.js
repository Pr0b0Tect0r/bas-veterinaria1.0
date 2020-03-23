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
import OrdenContext from './ordenContext';
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
	const { orden, dispatchOrden } = React.useContext(OrdenContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const ordenes = [
		{
			id_orden: 0,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		},
		{
			id_orden: 1,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		},
		{
			id_orden: 2,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		},
		{
			id_orden: 3,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		},
		{
			id_orden: 4,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		},
		{
			id_orden: 5,
			idtipodocumento: '09337834',
			ordenservicioserie: 'F97563',
			ordenservicionumero: 45632,
			idcita: 1453,
			fechaordenservicio: '11/03/2020',
			observaciones: 'sin observación',
			comprobantepago: '7895',
			idestado: 'abierta'
		}
	]

	const ordenConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchOrden(['consultar', ordenes])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		ordenConsultar()
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
		dispatch(['listaOrden', '/orden', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(ordenConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar la orden de servicio N° ${orden.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información.
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
					title='Lista de ordenes'
					columns={[
						{ title: 'ID', field: 'id_orden' },
						{ title: 'Serie', field: 'ordenservicioserie' },
						{ title: 'Número', field: 'ordenservicionumero' },
						{ title: 'Fecha', field: 'fechaordenservicio' },
						{ title: 'Comprobante', field: 'comprobantepago' },
						{ title: 'Documento', field: 'idtipodocumento' },
						{ title: 'Estado', field: 'idestado' }
					]}
					data={orden.ordenes}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver',
							onClick: (event, rowData) => {
								dispatch(['ordenInfo', `/orden/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchOrden(['abrirInfo', { id_orden: rowData.id_orden }])
								dispatchOrden(['consultarInfo', ordenes[rowData.id_orden]])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchOrden(['eliminarOrden', { id_eliminar: rowData.id_orden, nombreEliminar: rowData.ordenservicionumero }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { ordenConsultar() }
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