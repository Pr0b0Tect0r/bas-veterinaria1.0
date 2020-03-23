import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, Snackbar, IconButton, Button, LinearProgress, Zoom, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import MascotaContext from './mascotaContext';
import PhotoIcon from '@material-ui/icons/Photo';
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
	}
}));

function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
}

export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { mascota, dispatchMascota } = React.useContext(MascotaContext)
	const [aviso, setAviso] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const [consultaDni, setConsultaDni] = React.useState('')
	const [mascotas, setMascotas] = React.useState(typeof mascota.informacion.dnidueño !== 'undefined' ? mascota.informacion : {
		dnidueño: '',
		nombre: '',
		especie: '',
		raza: '',
		color: '',
		sexo: '',
		fechanac: new Date(),
		avatar: ''
	})
	const [imagenAvatar, setImagenAvatar] = React.useState(mascota.informacion ? mascota.informacion.avatar : '')
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(mascotas.fechanac);
	const classes = useStyles()

	const onChange = (e) => {
		setMascotas({
			...mascotas,
			[e.target.name]: e.target.value
		})
	}

	const guardar = () => {
		dispatchMascota(['guardar', mascotas])
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
		dispatch(['mascotaNuevo', '/mascota/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const consultaDniFunction = async () => {

		if (mascotas.dnidueño === '') {

		} else {
			setIsLoading(true)
			await fetch(`https://dniruc.apisperu.com/api/v1/dni/${mascotas.dnidueño}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2dyYW1hZG9yQGdudC5wZSJ9.h0kKyOThfiofLhCBJIctabYiQb7dWpk_kOe0hVwUR4g`, {
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

	const handleAvatarChange = (event) => {
		if (!event) {
			return;
		}

		const files = event.target.files;

		if (!files) {
			return;
		}

		const avatar = files[0];

		if (!avatar) {
			return;
		}

		const fileTypes = [
			'image/gif',
			'image/jpeg',
			'image/png',
			'image/webp',
			'image/svg+xml'
		];

		if (!fileTypes.includes(avatar.type)) {
			return;
		}

		if (avatar.size > (20 * 1024 * 1024)) {
			return;
		}

		setImagenAvatar(URL.createObjectURL(avatar))
		setMascotas({ ...mascota, avatar: URL.createObjectURL(avatar) })
		// setAvatarGuardar(URL.createObjectURL(avatar))
	};

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setMascotas({
			...mascotas,
			fechanac: formatDateFinal(date)
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
					<Typography variant='h6' color='textPrimary'>Mascota</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} className={classes.buttons}>
							<input className={classes.input} id="icon-button-file" type="file" name='file' onChange={handleAvatarChange} />
							<label htmlFor="icon-button-file">
								{imagenAvatar ?
									<Zoom in={true} timeout={500}>
										<Avatar className={classes.avatar} src={imagenAvatar} alt='...' />
									</Zoom>
									: <Button color="primary" component="span" startIcon={<PhotoIcon />} variant="contained" className={classes.button}>
										Subir...
                                </Button>}
							</label>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name='dnidueño'
								margin='normal'
								autoFocus
								fullWidth
								label="DNI"
								value={mascotas.dnidueño || ''}
								disabled={isLoading}
								onChange={onChange}
								onKeyDown={e => { if (e.keyCode === 13) { consultaDniFunction() } }}
								placeholder="Dni del dueño"
								helperText='presione enter'
								type="text"
							/>
							{isLoading && <LinearProgress color='secondary' />}
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								value={consultaDni || ''}
								className={classes.texto}
								margin='normal'
								disabled
								fullWidth
								helperText="Dueño"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id='nombre'
								required
								name="nombre"
								fullWidth
								value={mascotas.nombre}
								margin='normal'
								autoComplete="nombre"
								onChange={onChange}
								label='Nombre de la mascota'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="especie"
								fullWidth
								value={mascotas.especie}
								margin='normal'
								autoComplete="especie"
								onChange={onChange}
								label='Especie'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="raza"
								fullWidth
								margin='normal'
								value={mascotas.raza}
								autoComplete="raza"
								onChange={onChange}
								label='Raza'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="color"
								fullWidth
								margin='normal'
								value={mascotas.color}
								autoComplete="color"
								onChange={onChange}
								label='Color de pelaje'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								name="sexo"
								fullWidth
								margin='normal'
								value={mascotas.sexo}
								autoComplete="sexo"
								onChange={onChange}
								label='Sexo'

							/>
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12} sm={6}>
								<KeyboardDatePicker
									disableToolbar
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									label="Fecha de nacimiento"
									value={selectedDateFiltro}
									onChange={handleFechaFiltro}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12}>
							<TextField
								name="observacion"
								fullWidth
								margin='normal'
								value={mascotas.observacion}
								autoComplete="billing address-line2"
								onChange={onChange}
								label='Observación'
								multiline
								row={5}
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