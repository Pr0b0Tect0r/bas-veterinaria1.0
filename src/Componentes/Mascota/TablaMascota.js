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
import MascotaContext from './mascotaContext';
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

export default function TablaMascota() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { mascota, dispatchMascota } = React.useContext(MascotaContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const mascotas = [
		{
			id_mascota: 0,
			nombre: 'Bender',
			dnidueño: 25089273,
			especie: 'Perro',
			raza: 'Rabo de cabuya',
			color: 'Beige',
			sexo: 'Macho',
			fechanac: '01/01/2019',
			avatar: 'https://i.imgur.com/V1e9DGM.jpg',
			observacion: 'perro muy violento, tiene saliva venenosa y dientes de 20 cm'
		},
		{
			id_mascota: 1,
			nombre: 'Lorenzo',
			dnidueño: 25089273,
			especie: 'Loro',
			raza: 'Guacamaya',
			color: 'azul, verde, amarillo',
			sexo: 'Macho',
			fechanac: '01/02/2017',
			avatar: 'https://i.imgur.com/PW1O8Bm.jpg',
			observacion: 'Ave muy inteligente, aunque a veces tiene tendencias suicidas'
		},
		{
			id_mascota: 2,
			nombre: 'Camilo',
			dnidueño: 25089273,
			especie: 'Camello',
			raza: 'Camello doméstico',
			color: 'Marrón',
			sexo: 'Macho',
			fechanac: '01/02/2010',
			avatar: 'https://i.imgur.com/t4U1gmJ.jpg',
			observacion: 'La mejor mascota del mundo, solo le das agua una vez al año'
		}
	]

	const mascotaConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchMascota(['consultar', mascotas])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		mascotaConsultar()
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
		dispatch(['listaMascota', '/mascota', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(mascotaConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${mascota.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de esta mascota.
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
					{mascota.mascotas.map((info, index) => (
						<Zoom key={index} in={true} timeout={500}>
							<Grid key={index} item xs={12} sm={4}>
								<Card className={classes.card} raised={true}>
									<CardHeader
										action={
											<>
												<Tooltip title='Ver'>
													<IconButton onClick={() => {
														dispatch(['mascotaInfo', `/mascota/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
														dispatchMascota(['abrirInfo', { id_mascota: info.id_mascota }])
														dispatchMascota(['consultarInfo', mascotas[info.id_mascota]])
													}}>
														<VisibilityOutlinedIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title='Eliminar'>
													<IconButton onClick={() => {
														setOpenDialog(true)
														dispatchMascota(['eliminarMascota', { id_eliminar: info.id_mascota, nombreEliminar: info.nombre }])
													}}>
														<DeleteOutlineOutlinedIcon color='secondary' />
													</IconButton>
												</Tooltip>
											</>
										} />
									<CardContent>
										<Avatar className={classes.avatar} src={info.avatar} />
										<Typography variant="h5" className={classes.texto} color='secondary'>
											{info.nombre}
										</Typography>
										<Typography variant="body1" className={classes.texto} color='textSecondary'>
											{info.raza}
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
										value={mascota.mascotas.nombre || ''}
										margin='normal'
										autoFocus
										fullWidth
										label='Nombre'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='especie'
										value={mascota.mascotas.especie || ''}
										margin='normal'
										fullWidth
										label='Especie'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
						<MenuItem>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									<TextField
										name='raza'
										value={mascota.mascotas.raza || ''}
										margin='normal'
										fullWidth
										label='Raza'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='color'
										value={mascota.mascotas.color || ''}
										margin='normal'
										fullWidth
										label='Color'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
						<MenuItem>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										name='sexo'
										value={mascota.mascotas.sexo || ''}
										margin='normal'
										autoFocus
										fullWidth
										label='Sexo'
										type="text"
									/>
								</Grid>
							</Grid>
						</MenuItem>
					</Menu>
					<MaterialTable
						title='Lista de mascotas'
						columns={[
							{ title: 'Nombre', field: 'nombre' },
							{ title: 'Especie', field: 'especie' },
							{ title: 'Raza', field: 'raza' },
							{ title: 'Sexo', field: 'sexo' },
						]}
						data={mascota.mascotas}
						actions={[
							{
								icon: 'search',
								tooltip: 'Ver',
								onClick: (event, rowData) => {
									dispatch(['mascotaInfo', `/mascota/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
									dispatchMascota(['abrirInfo', { id_mascota: rowData.id_mascota }])
									dispatchMascota(['consultarInfo', mascotas[rowData.id_mascota]])
								}
							},
							{
								icon: 'delete',
								tooltip: 'Eliminar',
								onClick: (event, rowData) => {
									setOpenDialog(true)
									dispatchMascota(['eliminarMascota', { id_eliminar: rowData.id_mascota, nombreEliminar: rowData.nombre }])
								}
							},
							{
								icon: 'refresh',
								tooltip: 'Actualizar',
								isFreeAction: true,
								onClick: () => { mascotaConsultar() }
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