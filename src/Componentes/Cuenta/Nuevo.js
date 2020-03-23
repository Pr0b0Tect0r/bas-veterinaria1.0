import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, Snackbar, IconButton, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import CuentaContext from './cuentaContext';

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
	const { cuenta, dispatchCuenta } = React.useContext(CuentaContext)
	const [aviso, setAviso] = React.useState(false)
	const [cuentas, setCuentas] = React.useState(typeof cuenta.informacion.estado !== 'undefined' ? cuenta.informacion : {
		cuenta: '',
		nombrecuenta: '',
		moneda: 'soles',
		estado: 'activo'
	})
	const classes = useStyles()

	const onChange = (e) => {
		setCuentas({
			...cuentas,
			[e.target.name]: e.target.value
		})
	}

	const guardar = () => {
		dispatchCuenta(['guardar', cuentas])
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
		dispatch(['cuentaNuevo', '/cuenta', 'funcion', interactions.formContent.funcionSecundaria, aja])
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
					<Typography variant='h6' color='textPrimary'>Cuentas</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							<TextField
								name='cuenta'
								margin='normal'
								autoFocus
								fullWidth
								label="Cuenta"
								value={cuentas.cuenta || ''}
								onChange={onChange}
								placeholder="N° cuenta"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								name='nombrecuenta'
								margin='normal'
								fullWidth
								label="Nombre de la cuenta"
								value={cuentas.nombrecuenta || ''}
								onChange={onChange}
								placeholder="nombre de cuenta"
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Moneda</InputLabel>
								<Select value={cuentas.moneda || ''} onChange={onChange} name='moneda' fullWidth>
									<MenuItem value='soles'>Soles</MenuItem>
									<MenuItem value='dolares'>Dólares</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idespecialidad">Estado</InputLabel>
								<Select value={cuentas.estado || ''} onChange={onChange} name='estado' fullWidth>
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