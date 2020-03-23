import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, LinearProgress, Snackbar, IconButton, Button, FormControl, Box, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import CitaContext from './citaContext';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	card: {
		width: 400,
		margin: theme.spacing(5)
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		width: 70,
		height: 70,
		margin: 'auto'
	},
	texto: {
		textAlign: 'center',
		marginTop: theme.spacing(4)
	},
	info: {
		marginTop: theme.spacing(1)
	},
	input: {
		display: 'none',
	},
	cabecera: {
		position: 'relative',
		marginTop: theme.spacing(1)
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	table: {
		minWidth: 300
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	},
	texxto: {
		marginTop: theme.spacing(4)
	},
}));

const defaultProps = {
	bgcolor: 'background.paper',
	m: 1,
	border: 1,
	style: { width: '40%', height: 'auto' },
};

function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
}

function formatDateHour(date) {
	var d = new Date(date),
		hour = '' + (d.getHours()),
		minutes = '' + (d.getMinutes());

	return [hour, minutes < 10 ? `0${minutes}` : minutes, hour >= 12 ? 'PM' : 'AM'].join(':');
}

export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { cita, dispatchCita } = React.useContext(CitaContext)
	const [aviso, setAviso] = React.useState(false)
	const [citas, setCitas] = React.useState(typeof cita.informacion.idsede !== 'undefined' ? cita.informacion : {
		idsede: 'miraflores',
		idespecialidad: '',
		idmedico: '',
		fechacita: new Date(),
		horacita: '',
		idmascota: '',
		idestado: 'reservado',
		observaciones: '',
		fecharegistro: `${formatDateFinal(new Date())} - ${formatDateHour(new Date())}`
	})
	const [infoMedico, setInfoMedico] = React.useState('')
	const [consultaDni, setConsultaDni] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(citas.fechacita);
	const classes = useStyles()
	const medicos = [
		{
			id_medico: 0,
			nombre: 'Samuel Bustamante',
			especialidad: 'Goomer profesional'
		},
		{
			id_medico: 1,
			nombre: 'Juan Lizama',
			especialidad: 'Veterinario profesional'
		},
		{
			id_medico: 2,
			nombre: 'Enmanuel Bustamante',
			especialidad: 'Paseador profesional'
		}
	]

	const hora1 = [
		{ hora: '08:00 - 09:00' },
		{ hora: '10:00 - 11:00' },
		{ hora: '14:00 - 15:00' },
	]

	const hora2 = [
		{ hora: '10:00 - 11:00' },
		{ hora: '12:00 - 13:00' },
		{ hora: '13:00 - 14:00' },
		{ hora: '15:00 - 16:00' }
	]

	const hora3 = [
		{ hora: '08:00 - 09:00' },
		{ hora: '10:00 - 11:00' },
		{ hora: '12:00 - 13:00' },
		{ hora: '14:00 - 15:00' },
		{ hora: '16:00 - 17:00' },
	]

	const onChange = (e) => {
		if (e.target.name === 'idmedico') {
			setInfoMedico(`${medicos[e.target.value].nombre} - ${medicos[e.target.value].especialidad}`)
		}
		setCitas({
			...citas,
			[e.target.name]: e.target.value
		})
	}

	const consultaDniFunction = async () => {

		if (citas.dnidueño === '') {

		} else {
			setIsLoading(true)
			await fetch(`https://dniruc.apisperu.com/api/v1/dni/${citas.dnidueño}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2dyYW1hZG9yQGdudC5wZSJ9.h0kKyOThfiofLhCBJIctabYiQb7dWpk_kOe0hVwUR4g`, {
				method: 'GET',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(respuesta => {
				return respuesta.json()
			}).then(json => {
				setIsLoading(false)
				document.getElementById('nombre').focus()
				setConsultaDni(`${json.nombres} ${json.apellidoPaterno} ${json.apellidoMaterno}`)
			})
		}

	}

	const guardar = () => {
		dispatchCita(['guardar', citas])
		setAviso(true)
		// AuthTokenRequest.post('empresas/nuevo', empresa)
		// 	.then(() => {
		// 		setAviso(true)
		// 	})
	}

	const handleCloseMensaje = () => {
		setAviso(false)
	};


	const consultarAcciones = () => {
		var aja = [{ name: 'Volver' }]
		// AuthTokenRequest.post('acciones', { form: 'empresasNuevo' })
		// 	.then(result => {
		dispatch(['citaNuevo', '/cita/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setCitas({
			...citas,
			fechacita: formatDateFinal(date)
		})
	}

	React.useEffect(consultarAcciones, [])


	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.layout}>
				<Paper elevation={4} className={classes.root}>
					<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={aviso} autoHideDuration={3000} onClose={handleCloseMensaje} style={{ opacity: '0.8' }}
						ContentProps={{ 'aria-describedby': 'mensaje' }}
						message={<Typography id="mensaje" variant='button'>Guardado con éxito</Typography>}
						action={[
							<IconButton
								key="close"
								aria-label="close"
								color="inherit"
								className={classes.close}
								onClick={handleCloseMensaje}
							>
								<CloseIcon />
							</IconButton>,
						]}
					/>
					<Typography variant='h6' color='textPrimary'>Cita</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} className={classes.buttons}>
							<Box className={classes.button} borderColor='primary.main' borderRadius={5} {...defaultProps}>
								<Grid item xs={12}>
									<Typography variant='body1' className={classes.texto}>{`${citas.fecharegistro}`}</Typography>
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name='dnidueño'
								margin='normal'
								autoFocus
								fullWidth
								label="DNI"
								value={citas.dnidueño || ''}
								disabled={isLoading}
								onChange={onChange}
								onKeyDown={e => { if (e.keyCode === 13) { consultaDniFunction() } }}
								placeholder="Dni del dueño"
								helperText='presione enter'
								type="text"
							/>
							{isLoading && <LinearProgress color='secondary' />}
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='button'>{consultaDni}</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Sede</InputLabel>
								<Select value={citas.idsede || ''} onChange={onChange} name='idsede' fullWidth>
									<MenuItem value='miraflores'>Miraflores</MenuItem>
									<MenuItem value='surco'>Surco</MenuItem>
									<MenuItem value='puente piedra'>Puente Piedra</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idespecialidad">Especialidad</InputLabel>
								<Select value={citas.idespecialidad || ''} onChange={onChange} name='idespecialidad' fullWidth>
									<MenuItem value='veterinario'>Veterinario</MenuItem>
									<MenuItem value='groomer'>Groomer</MenuItem>
									<MenuItem value='paseador'>Paseador</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idmedico">Médico</InputLabel>
								<Select value={citas.idmedico || ''} onChange={onChange} name='idmedico' fullWidth>
									<MenuItem value='0'>Samuel Bustamante</MenuItem>
									<MenuItem value='1'>Juan Lizama</MenuItem>
									<MenuItem value='2'>Enmanuel Bustamante</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} className={classes.texxto}>
							<Typography variant='button'>{infoMedico}</Typography>
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12} sm={6}>
								<KeyboardDatePicker
									disableToolbar
									fullWidth
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									label="Fecha de cita"
									value={selectedDateFiltro}
									onChange={handleFechaFiltro}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="horacita">Horas disponibles</InputLabel>
								<Select value={citas.horacita || ''} onChange={onChange} name='horacita' fullWidth>
									{citas.fechacita === '09/03/2020' ?
										hora1.map((hora, index) => (
											<MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
										))
										: citas.fechacita === '10/03/2020' ?
											hora2.map((hora, index) => (
												<MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
											)) : citas.fechacita === '11/03/2020' ?
												hora3.map((hora, index) => (
													<MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
												)) :
												<MenuItem value='no disponible'>No hay horas disponibles</MenuItem>
									}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idmascota">Mascota</InputLabel>
								<Select value={citas.idmascota || ''} onChange={onChange} name='idmascota' fullWidth>
									<MenuItem value='bender'>Camilo</MenuItem>
									<MenuItem value='lorenzo'>Lorenzo</MenuItem>
									<MenuItem value='camilo'>Camilo</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name='idestado'
								className={classes.formControl}
								disabled
								fullWidth
								label="Estado"
								value={citas.idestado || 'reservado'}
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								multiline
								rows={4}
								id="observaciones"
								name="observaciones"
								fullWidth
								value={citas.observaciones || ''}
								onChange={onChange}
								helperText='Ingrese una observación'
								label='Observaciones'
							/>
						</Grid>
						<Grid item xs={12} className={classes.buttons}>
							<Button variant='contained' color='primary' className={classes.button} onClick={() => guardar()}>Guardar</Button>
						</Grid>
					</Grid>
				</Paper>
			</main>
		</React.Fragment>
	);
}