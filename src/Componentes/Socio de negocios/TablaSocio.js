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
import SocioContext from './socioContext';
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

export default function TablaSocio() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { socio, dispatchSocio } = React.useContext(SocioContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const socios = [
		{
			id_socio: 0,
			dnidueño: '05955139',
			nombre: 'DILMAR',
			apellido: 'BARBARAN',
			direccion: 'Av. Panamá 5790',
			pais: 'Perú',
			departamento: 'Lima',
			provincia: 'Lima',
			ciudad: 'Lima',
			distrito: 'Miraflores',
			fax: '1455896',
			telef_1: '12345',
			telef_2: '12345',
			telef_3: '12345',
			notas: 'sin novedad',
			avatar: 'https://i.imgur.com/F93dBvn.png'
		},
		{
			id_socio: 1,
			nombre: 'GINA',
			dnidueño: '07856370',
			apellido: 'CROVETTO',
			direccion: 'Av. Panamá 5790',
			pais: 'Perú',
			departamento: 'Lima',
			provincia: 'Lima',
			ciudad: 'Lima',
			distrito: 'Puente piedra',
			fax: '12549',
			telef_1: '12345',
			telef_2: '12345',
			telef_3: '12345',
			notas: 'cliente mala paga',
			avatar: 'https://i.imgur.com/F93dBvn.png'
		},
		{
			id_socio: 2,
			nombre: 'MARILU',
			dnidueño: '10694389',
			apellido: 'CACHI',
			direccion: 'Av. Panamá 5790',
			pais: 'Perú',
			departamento: 'Lima',
			provincia: 'Lima',
			ciudad: 'Lima',
			distrito: 'Ancon',
			fax: '12348',
			telef_1: '12345',
			telef_2: '12345',
			telef_3: '12345',
			notas: 'su perro tiene 1 año aqui y no lo ha venido a buscar',
			avatar: 'https://i.imgur.com/F93dBvn.png'
		}
	]

	const socioConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchSocio(['consultar', socios])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		socioConsultar()
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
		dispatch(['listaSocio', '/socio', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(socioConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${socio.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de esta socio.
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
					{socio.socios.map((info, index) => (
						<Zoom key={index} in={true} timeout={500}>
							<Grid key={index} item xs={12} sm={4}>
								<Card className={classes.card} raised={true}>
									<CardHeader
										action={
											<>
												<Tooltip title='Ver'>
													<IconButton onClick={() => {
														dispatch(['socioInfo', `/socio/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
														dispatchSocio(['abrirInfo', { id_socio: info.id_socio }])
														dispatchSocio(['consultarInfo', socios[info.id_socio]])
													}}>
														<VisibilityOutlinedIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title='Eliminar'>
													<IconButton onClick={() => {
														setOpenDialog(true)
														dispatchSocio(['eliminarSocio', { id_eliminar: info.id_socio, nombreEliminar: info.nombre }])
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
											{info.apellido}
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
										value={socio.socios.nombre || ''}
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
										value={socio.socios.apellido || ''}
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
										value={socio.socios.direccion || ''}
										margin='normal'
										fullWidth
										label='Dirección'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='dnidueño'
										value={socio.socios.dnidueño || ''}
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
										value={socio.socios.fax || ''}
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
						title='Lista de socios'
						columns={[
							{ title: 'Nombre', field: 'nombre' },
							{ title: 'Apellido', field: 'apellido' },
							{ title: 'Dirección', field: 'direccion' },
							{ title: 'Teléfono', field: 'telef_1' },
						]}
						data={socio.socios}
						actions={[
							{
								icon: 'search',
								tooltip: 'Ver',
								onClick: (event, rowData) => {
									dispatch(['socioInfo', `/socio/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
									dispatchSocio(['abrirInfo', { id_socio: rowData.id_socio }])
									dispatchSocio(['consultarInfo', socios[rowData.id_socio]])
								}
							},
							{
								icon: 'delete',
								tooltip: 'Eliminar',
								onClick: (event, rowData) => {
									setOpenDialog(true)
									dispatchSocio(['eliminarSocio', { id_eliminar: rowData.id_socio, nombreEliminar: rowData.nombre }])
								}
							},
							{
								icon: 'refresh',
								tooltip: 'Actualizar',
								isFreeAction: true,
								onClick: () => { socioConsultar() }
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