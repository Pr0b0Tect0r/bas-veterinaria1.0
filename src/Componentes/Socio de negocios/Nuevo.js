import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, Snackbar, IconButton, Button, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import socioContext from './socioContext'

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


export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { socio, dispatchSocio } = React.useContext(socioContext)
	const [aviso, setAviso] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const [socios, setSocios] = React.useState(typeof socio.informacion.dnidueño !== 'undefined' ? socio.informacion : {
		dnidueño: '',
		nombre: '',
		apellido: '',
		direccion: '',
		pais: '',
		departamento: '',
		provincia: '',
		ciudad: '',
		distrito: '',
		fax: '',
		telef_1: '',
		telef_2: '',
		telef_3: '',
		notas: '',
		avatar: ''
	})
	const classes = useStyles()

	const onChange = (e) => {
		setSocios({
			...socios,
			[e.target.name]: e.target.value
		})
	}

	const guardar = () => {
		dispatchSocio(['guardar', socios])
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
		dispatch(['socioNuevo', '/socio/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const consultaDniFunction = async (e) => {

		if (socio.dnidueño === '') {

		} else {
			setIsLoading(true)
			await fetch(`https://dniruc.apisperu.com/api/v1/dni/${socios.dnidueño}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2dyYW1hZG9yQGdudC5wZSJ9.h0kKyOThfiofLhCBJIctabYiQb7dWpk_kOe0hVwUR4g`, {
				method: 'GET',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(respuesta => {
				return respuesta.json()
			}).then(json => {
				setIsLoading(false)
				setSocios({
					...socios,
					nombre: json.nombres,
					apellido: `${json.apellidoPaterno} ${json.apellidoMaterno}`
				})
			})
		}

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
					<Typography variant='h6' color='textPrimary'>Socio de negocios</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<TextField
								name='dnidueño'
								margin='normal'
								fullWidth
								label="DNI"
								autoFocus
								value={socios.dnidueño || ''}
								disabled={isLoading}
								onChange={onChange}
								onKeyDown={e => { if (e.keyCode === 13) { consultaDniFunction() } }}
								placeholder="Dni"
								helperText='presione enter'
								type="text"
							/>
							{isLoading && <LinearProgress color='secondary' />}
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								value={socios.nombre || ''}
								className={classes.texto}
								margin='normal'
								disabled
								fullWidth
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								value={socios.apellido || ''}
								className={classes.texto}
								margin='normal'
								disabled
								fullWidth
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="direccion"
								name="direccion"
								fullWidth
								autoComplete="billing address-line2"
								onChange={onChange}
								value={socios.direccion || ''}
								label='Dirección'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="pais"
								fullWidth
								autoComplete="billing address-line2"
								onChange={onChange}
								value={socios.pais}
								label='País'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="departamento"
								name="departamento"
								fullWidth
								value={socios.departamento || ''}
								autoComplete="billing address-level2"
								label='Departamento'
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="provincia"
								name="provincia"
								fullWidth
								value={socios.provincia || ''}
								autoComplete="billing address-level2"
								onChange={onChange}
								label='Provincia'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="ciudad"
								name="ciudad"
								fullWidth
								value={socios.ciudad || ''}
								autoComplete="billing address-level2"
								onChange={onChange}
								label='Ciudad'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="distrito"
								name="distrito"
								fullWidth
								value={socios.distrito || ''}
								autoComplete="billing address-level2"
								onChange={onChange}
								label='Distrito'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="fax"
								name="fax"
								fullWidth
								value={socios.fax || ''}
								onChange={onChange}
								label='Fax'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="telef_1"
								name="telef_1"
								fullWidth
								value={socios.telef_1 || ''}
								onChange={onChange}
								label='Teléfono 1'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="telef_2"
								name="telef_2"
								fullWidth
								value={socios.telef_2 || ''}
								onChange={onChange}
								label='Teléfono 2'

							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="telef_3"
								name="telef_3"
								fullWidth
								value={socios.telef_3 || ''}
								onChange={onChange}
								label='Teléfono 3'
							/>
						</Grid>
						<Grid item xs={12} sm={6} />
						<Grid item xs={12}>
							<TextField
								required
								multiline
								rows={4}
								id="notas"
								name="notas"
								fullWidth
								value={socios.notas || ''}
								onChange={onChange}
								helperText='Ingrese una nota'
								label='Notas'

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