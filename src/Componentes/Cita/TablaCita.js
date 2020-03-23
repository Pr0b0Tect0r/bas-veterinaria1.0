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
import CitaContext from './citaContext';
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

export default function TablaCita() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { cita, dispatchCita } = React.useContext(CitaContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const classes = useStyles();
	const citas = [
		{
			id_cita: 0,
			dnidueño: 18865566,
			idsede: 'miraflores',
			idespecialidad: 'Baño de ozono',
			idmedico: 0,
			fechacita: '20/03/2020',
			horacita: '14:00 - 15:00',
			idmascota: 'Camilo',
			idestado: 'reservado',
			observaciones: 'sin observación',
			fecharegistro: '09/03/2020 - 10:38: AM'
		},
		{
			id_cita: 1,
			dnidueño: 18865566,
			idsede: 'surco',
			idespecialidad: 'Peluquería',
			idmedico: 1,
			fechacita: '18/03/2020',
			horacita: '13:00 - 14:00',
			idmascota: 'Lorenzo',
			idestado: 'reservado',
			observaciones: 'sin observación',
			fecharegistro: '07/03/2020 - 09:15: AM'
		},
		{
			id_cita: 2,
			dnidueño: 18865566,
			idsede: 'miraflores',
			idespecialidad: 'Baño de ozono',
			idmedico: 2,
			fechacita: '21/03/2020',
			horacita: '09:00 - 10:00',
			idmascota: 'Bender',
			idestado: 'reservado',
			observaciones: 'sin observación',
			fecharegistro: '02/03/2020 - 13:50: PM'
		}
	]

	const citaConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchCita(['consultar', citas])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		citaConsultar()
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
		dispatch(['listaCita', '/cita', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(citaConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${cita.nombreEliminar}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de esta cita.
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
					{cita.citas.map((info, index) => (
						<Zoom key={index} in={true} timeout={500}>
							<Grid key={index} item xs={12} sm={4}>
								<Card className={classes.card} raised={true}>
									<CardHeader
										action={
											<>
												<Tooltip title='Ver'>
													<IconButton onClick={() => {
														dispatch(['citaInfo', `/cita/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
														dispatchCita(['abrirInfo', { id_cita: info.id_cita }])
														dispatchCita(['consultarInfo', citas[info.id_cita]])
													}}>
														<VisibilityOutlinedIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title='Eliminar'>
													<IconButton onClick={() => {
														setOpenDialog(true)
														dispatchCita(['eliminarCita', { id_eliminar: info.id_cita, nombreEliminar: info.idespecialidad }])
													}}>
														<DeleteOutlineOutlinedIcon color='secondary' />
													</IconButton>
												</Tooltip>
											</>
										} />
									<CardContent>
										<Avatar className={classes.avatar} src={info.foto} />
										<Typography variant="h5" className={classes.texto} color='secondary'>
											{info.especialidad}
										</Typography>
										<Typography variant="body1" className={classes.texto} color='textSecondary'>
											{info.fechacita}
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
										value={cita.citas.idsede || ''}
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
										value={cita.citas.idespecialidad || ''}
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
										value={cita.citas.idmedico || ''}
										margin='normal'
										fullWidth
										label='Dirección'
										type="text"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										name='dnidueño'
										value={cita.citas.fechacita || ''}
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
										value={cita.citas.idmascota || ''}
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
						title='Lista de citas'
						columns={[
							{ title: 'Sede', field: 'idsede' },
							{ title: 'Especialidad', field: 'idespecialidad' },
							{ title: 'Médico', field: 'idmedico' },
							{ title: 'Mascota', field: 'idmascota' },
						]}
						data={cita.citas}
						actions={[
							{
								icon: 'search',
								tooltip: 'Ver',
								onClick: (event, rowData) => {
									dispatch(['citaInfo', `/cita/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
									dispatchCita(['abrirInfo', { id_cita: rowData.id_cita }])
									dispatchCita(['consultarInfo', citas[rowData.id_cita]])
								}
							},
							{
								icon: 'delete',
								tooltip: 'Eliminar',
								onClick: (event, rowData) => {
									setOpenDialog(true)
									dispatchCita(['eliminarCita', { id_eliminar: rowData.id_cita, nombreEliminar: rowData.idespecialidad }])
								}
							},
							{
								icon: 'refresh',
								tooltip: 'Actualizar',
								isFreeAction: true,
								onClick: () => { citaConsultar() }
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