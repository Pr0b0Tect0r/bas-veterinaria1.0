import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, LinearProgress, Snackbar, IconButton, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import OrdenContext from './ordenContext';
import MaterialTable from 'material-table';
import OrdenDialog from './OrdenDialog';

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
		padding: theme.spacing(1)
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
		width: '100%'
	},
	texxto: {
		marginTop: theme.spacing(5)
	},
	disabled: {
		marginTop: theme.spacing(2)
	},
	textoLista: {
		paddingTop: theme.spacing(1),
		paddingRight: theme.spacing(1)
	},
	contenedorLista: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: 0
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
	const { orden, dispatchOrden } = React.useContext(OrdenContext)
	const [aviso, setAviso] = React.useState(false)
	const [ordenes, setOrdenes] = React.useState(typeof orden.informacion.idtipodocumento !== 'undefined' ? orden.informacion : {
		idtipodocumento: '',
		ordenservicioserie: '',
		ordenservicionumero: '',
		idcita: '',
		fechaordenservicio: `${formatDateFinal(new Date())} - ${formatDateHour(new Date())}`,
		observaciones: '',
		comprobantepago: '',
		idestado: ''
	})
	const [isLoading, setIsLoading] = React.useState(false)
	const [agregarOrden, setAgregarOrden] = React.useState(false)
	const classes = useStyles()

	const onChange = (e) => {
		setOrdenes({
			...ordenes,
			[e.target.name]: e.target.value
		})
	}

	const consultaDniFunction = async () => {

		if (ordenes.idcita === '') {

		} else {
			setIsLoading(true)
			await fetch(`https://dniruc.apisperu.com/api/v1/dni/${ordenes.idcita}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2dyYW1hZG9yQGdudC5wZSJ9.h0kKyOThfiofLhCBJIctabYiQb7dWpk_kOe0hVwUR4g`, {
				method: 'GET',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(respuesta => {
				return respuesta.json()
			}).then(json => {
				setIsLoading(false)
				document.getElementById('ordenservicionumero').focus()
				setOrdenes({ ...ordenes, idtipodocumento: ordenes.idcita, infomostrar: `${json.nombres} ${json.apellidoPaterno}`, mascota: 'Lorenzo' })
			})
		}

	}

	// const guardar = () => {
	// 	dispatchFactura(['guardar', facturas])
	// 	setAviso(true)
	// 	// AuthTokenRequest.post('empresas/nuevo', empresa)
	// 	// 	.then(() => {
	// 	// 		setAviso(true)
	// 	// 	})
	// }

	const handleCloseMensaje = () => {
		setAviso(false)
	};


	const consultarAcciones = () => {
		var aja = [{ name: 'Volver' }]
		// AuthTokenRequest.post('acciones', { form: 'empresasNuevo' })
		// 	.then(result => {
		dispatch(['ordenNuevo', '/orden/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleCloseAgregarOrden = () => {
		setAgregarOrden(false)
	};

	React.useEffect(consultarAcciones, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<OrdenDialog abrir={agregarOrden} funcion={() => handleCloseAgregarOrden()} />
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
					<Typography variant='h6' color='textPrimary'>Orden de servicio</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} className={classes.buttons}>
							<Box className={classes.button} borderColor='primary.main' borderRadius={5} {...defaultProps}>
								<Grid item xs={12}>
									<Typography variant='body1' className={classes.texto}>{`${ordenes.fechaordenservicio}`}</Typography>
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								name='idcita'
								margin='normal'
								fullWidth
								label="N° cita"
								autoFocus
								value={ordenes.idcita || ''}
								disabled={isLoading}
								onChange={onChange}
								onKeyDown={e => { if (e.keyCode === 13) { consultaDniFunction() } }}
								placeholder="cita"
								helperText='presione enter'
								type="text"
							/>
							{isLoading && <LinearProgress color='secondary' />}
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								className={classes.disabled}
								fullWidth
								disabled
								label="Dueño"
								value={ordenes.infomostrar || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								className={classes.disabled}
								fullWidth
								disabled
								label="Mascota"
								value={ordenes.mascota || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								name='ordenservicioserie'
								className={classes.disabled}
								fullWidth
								onChange={onChange}
								label="Serie"
								value={ordenes.ordenservicioserie || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={2}>
							<TextField
								id='ordenservicionumero'
								name='ordenservicionumero'
								className={classes.disabled}
								fullWidth
								onChange={onChange}
								placeholder='Número'
								label="Número"
								value={ordenes.ordenservicionumero || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								id='comprobantepago'
								name='comprobantepago'
								className={classes.disabled}
								fullWidth
								onChange={onChange}
								placeholder='comprobante'
								label="Comprobante de pago"
								value={ordenes.comprobantepago || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="observaciones"
								name="observaciones"
								fullWidth
								margin='normal'
								value={ordenes.observaciones || ''}
								onChange={onChange}
								helperText='Ingrese una observación'
								label='Observaciones'
							/>
						</Grid>
						<Grid item xs={12} sm={3}/>
						<Grid item xs={12} className={classes.buttons}>
							<Button variant='contained' color='primary' className={classes.button} onClick={() => setAgregarOrden(true)}>Agregar</Button>
						</Grid>
						{orden.ordenescreadas.length ?
							<>
								<Grid item xs={12}>
									<MaterialTable
										size='small'
										title='Detalle'
										columns={[
											{ title: 'Item', field: 'item' },
											{ title: 'Producto', field: 'producto' },
											{ title: 'Cantidad', field: 'cantidad' },
											{ title: 'Precio Uni.', field: 'preciounitario' },
											{ title: 'Descuento', field: 'descuento' },
											{ title: 'Parcial', field: 'parcial' },
											{ title: 'IGV', field: 'igv' }
										]}
										data={orden.ordenescreadas}
										actions={[
											{
												icon: 'edit',
												tooltip: 'Ediar',
												onClick: (event, rowData) => {
													setAgregarOrden(true)
													dispatchOrden(['consultarInfo', orden.ordenescreadas[rowData.item]])
													// dispatch(['facturaInfo', `/facturacion/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
													dispatchOrden(['abrirInfo', { id_orden: rowData.item }])
													// dispatchFactura(['consultarInfo', facturas[rowData.id_factura]])
												}
											},
											{
												icon: 'delete',
												tooltip: 'Eliminar',
												onClick: (event, rowData) => {
													// setOpenDialog(true)
													dispatchOrden(['eliminarArray', { preciorestar: parseInt(rowData.cantidad) * parseInt(rowData.preciounitario) }])
												}
											}
										]}
										localization={{
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
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={orden.subtotal} label='Venta bruta' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={0} label='Descuento 0.00%' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={orden.subtotal} label='Afecta' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={orden.porcentaje} label='IGV 18.00%' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={orden.total} label='Neto' />
								</Grid>
							</>
							: null}
					</Grid>
				</Paper>
			</main>
		</React.Fragment>
	);
}