
import React from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Box,
	Grid,
	Typography,
	Paper,
	IconButton,
	Container,
	FormControlLabel,
	Checkbox,
	Link,
	LinearProgress,
	Snackbar,
	Zoom
} from '@material-ui/core';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Copyright from '../Layout/Copyright';
import LoginContext from '../helpers/loginContext';
import ThemeContext from '../helpers/themeContext';
import CrearCuenta from './crearCuenta'


const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: 'url(https://i.imgur.com/kpYBPzq.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	close: {
		padding: theme.spacing(0.5)
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	main: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			height: '60%'
		}
	}
}));

export default function Login() {
	const history = useHistory()
	const [aviso, setAviso] = React.useState({ mensaje: '', aviso: false })
	const [crear, setCrear] = React.useState(false)
	const [cuerpo, setCuerpo] = React.useState({ nickname: '', password: '' })
	const [isLoading, setIsLoading] = React.useState(false)
	const classes = useStyles();
	const { dispatchLogin } = React.useContext(LoginContext)
	const { dispatchTheme } = React.useContext(ThemeContext)

	const handleCloseMensaje = () => {
		setAviso({ mensaje: '', aviso: false })
	};

	const onChange = (e) => {
		setCuerpo({ ...cuerpo, [e.target.name]: e.target.value })
	}

	const login = () => {
		if (!isLoading) {
			setIsLoading(true);
			setTimeout(() => {
				if (cuerpo.password === '') {
					setAviso({ mensaje: 'dato requerido', aviso: true })
					setIsLoading(false)
					document.getElementById('password').focus();
				} else {
					setIsLoading(false)
					var objeto = { id_usuarios: 1, name: 'Usuario Prueba', avatar: 'https://i.imgur.com/F93dBvn.png', correo: 'correo@veterinaria.com', nickname: 'userprueba', cargo: 'Administrador' }
					var palette = { primary: 'orange', secondary: 'light-blue', type: 'dark' }
					localStorage.setItem('perfil', JSON.stringify(objeto))
					localStorage.setItem('palette', JSON.stringify(palette))
					localStorage.setItem('token', JSON.stringify('hhkhlkjhlkfgsjhdflkjhflgskjdfhgslkjhgslkdfjhgsjhlkglkslhlfgdkgdfsjdlsfdgdf'))
					dispatchLogin(['login', objeto])
					dispatchTheme(['cambiarTema', palette])
					history.push('/inicio')
				}
			}, 1000)
		}
	}

	const cerrarCrear = () => {
		setCrear(false)
	}

	if (localStorage.getItem('token')) {
		return (<Redirect to='/inicio' />)
	}

	return (
		<Grid container component="main" className={classes.root}>
			{crear ? <CrearCuenta cerrar={cerrarCrear} /> :
				<Zoom in={true} timeout={1000}>
					<Container component={Paper} elevation={5} maxWidth='xs' className={classes.main}>
						<CssBaseline />
						<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={aviso.aviso} autoHideDuration={3000} onClose={handleCloseMensaje} style={{ opacity: '0.8' }}
							ContentProps={{ 'aria-describedby': 'mensaje' }} message={<Typography id="mensaje" variant='button'>{aviso.mensaje}</Typography>}
							action={[<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleCloseMensaje}><CloseIcon /></IconButton>]} />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<PetsOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
        					</Typography>
							<form className={classes.form} noValidate>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									label='Nickname'
									name="nickname"
									autoComplete="nickname"
									onKeyDown={e => { if (e.keyCode === 13) { login() } }}
									disabled={isLoading}
									onChange={onChange}
									autoFocus
									error={aviso.aviso}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									error={aviso.aviso}
									required
									fullWidth
									id='password'
									name="password"
									label='Password'
									type="password"
									onChange={onChange}
									disabled={isLoading}
									onKeyDown={e => { if (e.keyCode === 13) { login() } }}
									autoComplete="password"
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Recordarme"
									disabled={isLoading}
								/>
								{isLoading && <LinearProgress color='secondary' />}
								<Button
									fullWidth
									variant="contained"
									color="primary"
									onClick={() => login()}
									disabled={cuerpo.password === '' ? true : isLoading ? true : false}
									className={classes.submit}>
									Ingresar
          				</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											Recuperar contraseña
              					</Link>
									</Grid>
									<Grid item>
										<Link href="#" variant="body2" onClick={() => setCrear(true)}>
											{"Crear cuenta"}
										</Link>
									</Grid>
								</Grid>
							</form>
							<Box mt={8}>
								<Copyright />
							</Box>
						</div>
					</Container>
				</Zoom>
			}
		</Grid>
	);
}