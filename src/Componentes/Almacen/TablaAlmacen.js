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
import AlmacenContext from './almacenContext';
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


export default function TablaAlmacen() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { almacen, dispatchAlmacen } = React.useContext(AlmacenContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const classes = useStyles();
	const almacenes = [
		{
			id_almacen: 0,
			almacen: 'Ninguno',
			estado: 'activo'

		},
		{
			id_almacen: 1,
			almacen: 'CALLAO',
			estado: 'activo'

		},
		{
			id_almacen: 2,
			almacen: 'ICA',
			estado: 'activo'

		},
		{
			id_almacen: 3,
			almacen: 'PAITA',
			estado: 'activo'

		},
		{
			id_almacen: 4,
			almacen: 'MIRAFLORES',
			estado: 'activo'

		}
	]

	const almacenConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchAlmacen(['consultar', { almacenes: almacenes }])
		dispatchAlmacen(['consultarinfo', { informaion: {} }])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		almacenConsultar()
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
		dispatch(['listaAlmacen', '/almacen', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(almacenConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${almacen.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminado se perderá toda la información de este almacen.
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
					title='Lista de Almacen'
					columns={[
						{ title: 'ID', field: 'id_almacen' },
						{ title: 'Almacen', field: 'almacen' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={almacen.almacenes}
					actions={[
						{
							icon: 'edit',
							tooltip: 'editar',
							onClick: (event, rowData) => {
								dispatch(['almacenInfo', `/almacen/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchAlmacen(['abrirInfo', { id_almacen: rowData.id_almacen }])
								dispatchAlmacen(['consultarInfo', { informacion: almacenes[rowData.id_almacen] }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchAlmacen(['eliminarAlmacen', { id_eliminar: rowData.id_almacen, nombreEliminar: rowData.almacen }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { almacenConsultar() }
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