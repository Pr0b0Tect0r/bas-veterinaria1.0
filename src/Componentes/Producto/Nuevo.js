import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, Snackbar, IconButton, Button, Zoom, Avatar, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import ProductoContext from './productoContext';
import PhotoIcon from '@material-ui/icons/Photo';

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
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	}
}));

export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { producto, dispatchProducto } = React.useContext(ProductoContext)
	const [aviso, setAviso] = React.useState(false)
	const [productos, setProductos] = React.useState(producto.informacion ? producto.informacion : {
		descripcion: '',
		ubicacion: '',
		idclase: 'servicio',
		idcategoria: '',
		idsubcategoria: '',
		idunidadmedida: '',
		stockminimo: '',
		stockmaximo: '',
		numeroparte: '',
		foto: '',
		cantidad: ''
	})
	const [imagenAvatar, setImagenAvatar] = React.useState(producto.informacion ? producto.informacion.foto : '')
	const classes = useStyles()

	const onChange = (e) => {
		setProductos({
			...productos,
			[e.target.name]: e.target.value
		})
	}

	const guardar = () => {
		dispatchProducto(['guardar', productos])
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
		dispatch(['productoNuevo', '/producto/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
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
		setProductos({ ...productos, foto: URL.createObjectURL(avatar) })
		// setAvatarGuardar(URL.createObjectURL(avatar))
	};

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
					<Typography variant='h6' color='textPrimary'>Producto</Typography>
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
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-simple-select-label">Clase</InputLabel>
								<Select value={productos.idclase || ''} onChange={onChange} name='idclase' fullWidth>
									<MenuItem value='servicio'>Servicio</MenuItem>
									<MenuItem value='productos'>Productos</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl className={classes.formControl}>
								<InputLabel>Categoría</InputLabel>
								{productos.idclase === 'servicio' ?
									<Select value={productos.idcategoria || ''} onChange={onChange} name='idcategoria' fullWidth>
										<MenuItem value='ingresos'>Ingresos</MenuItem>
										<MenuItem value='costos'>Costos</MenuItem>
										<MenuItem value='gastos'>Gastos</MenuItem>
									</Select>
									: productos.idclase === 'productos' ?
										<Select value={productos.idcategoria || ''} onChange={onChange} name='idcategoria' fullWidth>
											<MenuItem value='ventas'>Ventas</MenuItem>
											<MenuItem value='compras'>Compras</MenuItem>
										</Select>
										: null}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl className={classes.formControl}>
								<InputLabel>Sub categoría</InputLabel>
								<Select value={productos.idsubcategoria || ''} onChange={onChange} name='idsubcategoria' fullWidth>
									<MenuItem value='nivel1'>Nivel 1</MenuItem>
									<MenuItem value='nivel2'>Nivel 2</MenuItem>
									<MenuItem value='nivel3'>Nivel 3</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								name="descripcion"
								fullWidth
								margin='normal'
								value={productos.descripcion || ''}
								onChange={onChange}
								label='Descripción'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="numeroparte"
								fullWidth
								margin='normal'
								value={productos.numeroparte || ''}
								onChange={onChange}
								label='N° parte'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="cantidad"
								fullWidth
								margin='normal'
								value={productos.cantidad || ''}
								onChange={onChange}
								label='Cantidad'
								className={classes.formControl}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<FormControl className={classes.formControl}>
								<InputLabel>Unidad de medida</InputLabel>
								<Select value={productos.idunidadmedida || ''} onChange={onChange} name='idunidadmedida' fullWidth>
									<MenuItem value='pieza'>Pieza</MenuItem>
									<MenuItem value='kilo'>Kilo</MenuItem>
									<MenuItem value='metro'>Metro</MenuItem>
									<MenuItem value='litro'>Litro</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="stockminimo"
								fullWidth
								margin='normal'
								value={productos.stockminimo || ''}
								onChange={onChange}
								label='Stock mínimo'
								className={classes.formControl}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="stockmaximo"
								fullWidth
								margin='normal'
								value={productos.stockmaximo || ''}
								onChange={onChange}
								label='Stock máximo'
								className={classes.formControl}
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								name="ubicacion"
								fullWidth
								margin='normal'
								value={productos.ubicacion || ''}
								onChange={onChange}
								label='Ubicación'
								className={classes.formControl}
							/>
						</Grid>

						<Grid item xs={12}>
							{/* <TextField
								name="observacion"
								fullWidth
								margin='normal'
								value={mascotas.observacion}
								autoComplete="billing address-line2"
								onChange={onChange}
								label='Observación'
								multiline
								row={5}
							/> */}
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