import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, Snackbar, IconButton, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import CajaybancosContext from './cajaybancosContext';

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
			width: 900,
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


export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { cajaybancos, dispatchCajaybancos } = React.useContext(CajaybancosContext)
	const [aviso, setAviso] = React.useState(false)
	const [cajasybancos, setCajasybancos] = React.useState(typeof cajaybancos.informacion.estado !== 'undefined' ? cajaybancos.informacion : {
		codigo: 15687,
		tipocuenta: 'ahorro',
		nombrecuenta: '',
		banco: 'banco de credito',
		cuentabancaria: '',
		moneda: 'soles',
		estado: 'activo'
	})
	const classes = useStyles()

	const onChange = (e) => {
		setCajasybancos({
			...cajasybancos,
			[e.target.name]: e.target.value
		})
	}

	const guardar = () => {
		dispatchCajaybancos(['guardar', cajasybancos])
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
		dispatch(['cajaybancosNuevo', '/caja_y_bancos', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
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
					<Typography variant='h6' color='textPrimary'>Caja y bancos</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<TextField
								name='cuenta'
								className={classes.formControl}
								margin='normal'
								disabled
								fullWidth
								label="Código"
								value={cajasybancos.codigo}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Tipo de cuenta</InputLabel>
								<Select value={cajasybancos.tipocuenta || ''} onChange={onChange} name='tipocuenta' fullWidth>
									<MenuItem value='ahorro'>Ahorros</MenuItem>
									<MenuItem value='corriente'>Corriente</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idespecialidad">Banco</InputLabel>
								<Select value={cajasybancos.banco || ''} onChange={onChange} name='banco' fullWidth>
									<MenuItem value='banco de credito'>Banco de crédito</MenuItem>
									<MenuItem value='interbank'>Interbank</MenuItem>
									<MenuItem value='scotiabank'>Scotiabank</MenuItem>
									<MenuItem value='bbva'>BBVA</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
							className={classes.formControl}
								name='cuentabancaria'
								margin='normal'
								fullWidth
								label="Cuenta bancaria"
								placeholder='cuenta bancaria'
								onChange={onChange}
								value={cajasybancos.cuentabancaria || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Moneda</InputLabel>
								<Select value={cajasybancos.moneda || ''} onChange={onChange} name='moneda' fullWidth>
									<MenuItem value='soles'>Soles</MenuItem>
									<MenuItem value='dolares'>Dólares</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Estado</InputLabel>
								<Select value={cajasybancos.estado || ''} onChange={onChange} name='estado' fullWidth>
									<MenuItem value='activo'>Activo</MenuItem>
									<MenuItem value='inactivo'>Inactivo</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} className={classes.buttons}>
							<Button variant='contained' color='primary' className={classes.button} onClick={() => guardar()}>Buscar</Button>
						</Grid>
					</Grid>
				</Paper>
			</main>
		</React.Fragment>
	);
}