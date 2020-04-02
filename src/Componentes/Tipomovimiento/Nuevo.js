import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	Button,
	Snackbar,
	IconButton
} from '@material-ui/core';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import TipomovimientoContext from './tipomovimientoContext';
import AppInteractionContext from '../helpers/appInteraction';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
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
		margin: theme.spacing(2)
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
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	button2: {
		marginBottom: theme.spacing(2)
	},
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	},
	contenedorLista: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(1)
	},
	contenedorLista1: {
		display: 'flex',
		justifyContent: 'flex-start'
	}
}));

export default function TablaMovimiento() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { tipomovimiento, dispatchTipomovimiento } = React.useContext(TipomovimientoContext)
	const [aviso, setAviso] = React.useState(false)
	const [tipomovimientos, setTipomovimientos] = React.useState(typeof tipomovimiento.informacion.nombre !== 'undefined' ? tipomovimiento.informacion : {
		id_movimiento: 0,
		nombre: '',
		tipomovimiento: 'Ingreso',
		siglas: '',
		automatico: 'Manual',
		calculocosto: 'No calcula',
		estado: 'activo'
	})
	const classes = useStyles();

	const onChange = (e) => {
		setTipomovimientos({
			...tipomovimientos,
			[e.target.name]: e.target.value
		})
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Volver' }
		]
		dispatch(['tipoMovimientoNuevo', '/tipomovimiento/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const guardar = () => {
		setAviso(true)
		dispatchTipomovimiento(['guardar', tipomovimientos])
		// AuthTokenRequest.post('empresas/nuevo', empresa)
		// 	.then(() => {
		// 		setAviso(true)
		// 	})
	}

	const handleCloseMensaje = () => {
		setAviso(false)
	};

	React.useEffect(consultarAcciones, [])

	return (
		<main className={classes.layout}>
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
			<Paper elevation={4} className={classes.root}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={2}>
						<TextField
							name="id_movimiento"
							fullWidth
							disabled
							margin='normal'
							onChange={onChange}
							value={tipomovimientos.id_movimiento || ''}
							label='ID'
						/>
					</Grid>
					<Grid item xs={12} sm={10}>
						<TextField
							name="nombre"
							fullWidth
							margin='normal'
							onChange={onChange}
							value={tipomovimientos.nombre || ''}
							label='Nombre'
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							name="siglas"
							fullWidth
							margin='normal'
							onChange={onChange}
							value={tipomovimientos.siglas || ''}
							label='Siglas'
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel id="horacita">Tipo de movimiento</InputLabel>
							<Select value={tipomovimientos.tipomovimiento || ''} onChange={onChange} name='tipomovimiento' fullWidth>
								<MenuItem value='Ingreso'>Ingreso</MenuItem>
								<MenuItem value='Salida'>Salida</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel>Cálculo</InputLabel>
							<Select value={tipomovimientos.calculocosto || ''} onChange={onChange} name='calculocosto' fullWidth>
								<MenuItem value='No calcula'>No calcula</MenuItem>
								<MenuItem value='Calcula costo'>Calcula costo</MenuItem>
								<MenuItem value='Toma costo'>Toma costo</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel>Automático</InputLabel>
							<Select value={tipomovimientos.automatico || ''} onChange={onChange} name='automatico' fullWidth>
								<MenuItem value='Manual'>Manual</MenuItem>
								<MenuItem value='Automatico'>Automático</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl className={classes.formControl}>
							<InputLabel>Estado</InputLabel>
							<Select value={tipomovimientos.estado || ''} onChange={onChange} name='estado' fullWidth>
								<MenuItem value='activo'>Activo</MenuItem>
								<MenuItem value='inactivo'>Inactivo</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} />
					<Grid item xs={12} className={classes.buttons}>
						<Button variant='contained' color='primary' className={classes.button} onClick={() => guardar()}>Guardar</Button>
					</Grid>
				</Grid>
			</Paper>
		</main>
	);
}