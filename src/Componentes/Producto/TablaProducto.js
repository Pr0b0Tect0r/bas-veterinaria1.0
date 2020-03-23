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
	Card,
	CardContent,
	Typography,
	Avatar,
	Grid,
	Tooltip,
	IconButton,
	CardHeader,
	Zoom,
	Menu,
	MenuItem,
	TextField
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ProductoContext from './productoContext';
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

export default function TablaProducto() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { producto, dispatchProducto } = React.useContext(ProductoContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const productos = [
		{
			id_producto: 0,
			descripcion: 'Correa de pasear',
			ubicacion: 'Estante 5, nivel 2',
			idclase: 'productos',
			idcategoria: 'compras',
			idsubcategoria: 'nivel2',
			idunidadmedida: 'pieza',
			stockminimo: '5',
			stockmaximo: '20',
			numeroparte: 'F7895',
			foto: 'https://i.imgur.com/oY0MoKc.jpg',
			cantidad: 5
		},
		{
			id_producto: 1,
			descripcion: 'Hueso para morder',
			ubicacion: 'Estante 2, nivel 4',
			idclase: 'productos',
			idcategoria: 'ventas',
			idsubcategoria: 'nivel1',
			idunidadmedida: 'pieza',
			stockminimo: '5',
			stockmaximo: '20',
			numeroparte: 'F789555',
			foto: 'https://i.imgur.com/UYUCnHq.jpg',
			cantidad: 8
		},
		{
			id_producto: 2,
			descripcion: 'Jaula para hamster',
			ubicacion: 'Estante 1, nivel 1',
			idclase: 'productos',
			idcategoria: 'compras',
			idsubcategoria: 'nivel2',
			idunidadmedida: 'pieza',
			stockminimo: '3',
			stockmaximo: '10',
			numeroparte: 'AA784',
			foto: 'https://i.imgur.com/RCBcKq9.jpg',
			cantidad: 9
		},
		{
			id_producto: 3,
			descripcion: 'Baño',
			ubicacion: 'Sede Surco',
			idclase: 'servicio',
			idcategoria: 'ingresos',
			idsubcategoria: 'nivel2',
			idunidadmedida: 'litro',
			stockminimo: '0',
			stockmaximo: '0',
			numeroparte: 'AA784',
			foto: 'https://i.imgur.com/RnDsehm.jpg',
			cantidad: 1
		}
	]

	const productoConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchProducto(['consultar', productos])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		productoConsultar()
		// })
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Nuevo' },
			{ name: 'Table' },
			{ name: 'Tarjeta' }
		]
		dispatch(['listaProducto', '/producto', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(productoConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${producto.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de esta producto.
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
			{interactions.formContent.funcionSecundaria ?
				<Grid container spacing={2}>
					{producto.productos.map((info, index) => (
						<Zoom key={index} in={true} timeout={500}>
							<Grid key={index} item xs={12} sm={4}>
								<Card className={classes.card} raised={true}>
									<CardHeader
										action={
											<>
												<Tooltip title='Ver'>
													<IconButton onClick={() => {
														dispatch(['productoInfo', `/producto/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
														dispatchProducto(['abrirInfo', { id_producto: info.id_producto }])
														dispatchProducto(['consultarInfo', productos[info.id_producto]])
													}}>
														<VisibilityOutlinedIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title='Eliminar'>
													<IconButton onClick={() => {
														setOpenDialog(true)
														dispatchProducto(['eliminarProducto', { id_eliminar: info.id_producto, nombreEliminar: info.descripcion }])
													}}>
														<DeleteOutlineOutlinedIcon color='secondary' />
													</IconButton>
												</Tooltip>
											</>
										} />
									<CardContent>
										<Avatar className={classes.avatar} src={info.foto} />
										<Typography variant="h5" className={classes.texto} color='secondary'>
											{info.descripcion}
										</Typography>
										<Typography variant="body1" className={classes.texto} color='textSecondary'>
											{info.idclase}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Zoom>
					))}
				</Grid>
				:
				<>
					<Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
						keepMounted
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={open}
						onClose={() => setAnchorEl(null)}>
						<MenuItem>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									<TextField
										name='nombre'
										value={producto.productos.descripcion || ''}
										margin='normal'
										autoFocus
										fullWidth
										label='Nombre'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='apellido'
										value={producto.productos.idclase || ''}
										margin='normal'
										fullWidth
										label='Apellido'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
						<MenuItem>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									<TextField
										name='direccion'
										value={producto.productos.ubicacion || ''}
										margin='normal'
										fullWidth
										label='Dirección'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='dnidueño'
										value={producto.productos.numeroparte || ''}
										margin='normal'
										fullWidth
										label='DNI'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
						<MenuItem>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										name='fax'
										value={producto.productos.idcategoria || ''}
										margin='normal'
										autoFocus
										fullWidth
										label='Fax'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
					</Menu>
					<MaterialTable
						title='Lista de productos'
						columns={[
							{ title: 'Descripcion', field: 'descripcion' },
							{ title: 'N° parte', field: 'numeroparte' },
							{ title: 'Ubicación', field: 'ubicacion' },
							{ title: 'Clase', field: 'idclase' },
						]}
						data={producto.productos}
						actions={[
							{
								icon: 'search',
								tooltip: 'Ver',
								onClick: (event, rowData) => {
									dispatch(['productoInfo', `/producto/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
									dispatchProducto(['abrirInfo', { id_producto: rowData.id_producto }])
									dispatchProducto(['consultarInfo', productos[rowData.id_producto]])
								}
							},
							{
								icon: 'delete',
								tooltip: 'Eliminar',
								onClick: (event, rowData) => {
									setOpenDialog(true)
									dispatchProducto(['eliminarProducto', { id_eliminar: rowData.id_producto, nombreEliminar: rowData.descripcion }])
								}
							},
							{
								icon: 'refresh',
								tooltip: 'Actualizar',
								isFreeAction: true,
								onClick: () => { productoConsultar() }
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
				</>}
		</>
	);
}