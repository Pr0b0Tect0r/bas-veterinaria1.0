import React from 'react';
import { CssBaseline, Paper, Typography, Grid, TextField, LinearProgress, Snackbar, IconButton, Button, Box, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import AppInteractionContext from '../helpers/appInteraction';
import CompraContext from './compraContext';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import MaterialTable from 'material-table';
import CompraDialog from './compraDialog';

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
	select: {
		width: '100%',
		marginTop: theme.spacing(4)
	}
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

export default function Nuevo() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { compra, dispatchCompra } = React.useContext(CompraContext)
	const [aviso, setAviso] = React.useState(false)
	const [compras, setCompras] = React.useState(typeof compra.informacion.idsocionegocio !== 'undefined' ? compra.informacion : {
		idtipodocumento: '',
		fechaemision: new Date(),
		idsocionegocio: '',
		referencia: '',
		tc: '3.39',
		serie: '123658',
		numero: '001',
		idestado: 'Abierta',
		moneda: 'soles',
		observaciones: ''
	})
	const [isLoading, setIsLoading] = React.useState(false)
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(compras.fechaemision);
	const [tipoCompra, setTipoCompra] = React.useState('1')
	const [agregarCompra, setAgregarCompra] = React.useState(false)
	const classes = useStyles()

	const onChange = (e) => {
		setCompras({
			...compras,
			[e.target.name]: e.target.value
		})
	}

	const onChangeTipo = (e) => {
		setTipoCompra(e.target.value)
	}

	const consultaDniFunction = async () => {

		if (compras.idtipodocumento === '') {

		} else {
			setIsLoading(true)
			await fetch(`https://dniruc.apisperu.com/api/v1/dni/${compras.idtipodocumento}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2dyYW1hZG9yQGdudC5wZSJ9.h0kKyOThfiofLhCBJIctabYiQb7dWpk_kOe0hVwUR4g`, {
				method: 'GET',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			}).then(respuesta => {
				return respuesta.json()
			}).then(json => {
				setIsLoading(false)
				document.getElementById('referencia').focus()
				setCompras({ ...compras, idsocionegocio: `${json.nombres} ${json.apellidoPaterno} ${json.apellidoMaterno}` })
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
		dispatch(['compraNuevo', '/compra/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setCompras({
			...compras,
			fechaemision: formatDateFinal(date)
		})
	}

	const handleCloseAgregarCompra = () => {
		setAgregarCompra(false)
	};

	React.useEffect(consultarAcciones, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<CompraDialog abrir={agregarCompra} funcion={() => handleCloseAgregarCompra()} />
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
					<Typography variant='h6' color='textPrimary'>Compra</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} className={classes.buttons}>
							<Box className={classes.button} borderColor='primary.main' borderRadius={5} {...defaultProps}>
								<Grid item xs={12}>
									<Typography variant='body1' className={classes.texto}>{tipoCompra === '1' ? 'Factura' : tipoCompra === '3' ? 'Boleta de venta' : tipoCompra === '7' ? 'Nota de crédito' : tipoCompra === '8' ? 'Nota de débito' : ''}</Typography>
								</Grid>
								<Grid container spacing={2} style={{ padding: '8px' }}>
									<Grid item xs={12} sm={4}>
										<FormControl className={classes.formControl}>
											<Select value={tipoCompra || ''} onChange={onChangeTipo} fullWidth>
												<MenuItem value='1'>1</MenuItem>
												<MenuItem value='3'>3</MenuItem>
												<MenuItem value='7'>7</MenuItem>
												<MenuItem value='8'>8</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={4}>
										<TextField
											disabled
											fullWidth
											value={tipoCompra === '1' ? 'F001' : tipoCompra === '3' ? 'B001' : tipoCompra === '7' ? 'NC001' : tipoCompra === '8' ? 'ND001' : ''}
										/>
									</Grid>
									<Grid item xs={12} sm={4}>
										<TextField
											disabled
											fullWidth
											value='78652'
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12} sm={3}>
								<KeyboardDatePicker
									disableToolbar
									fullWidth
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									label="Fecha"
									value={selectedDateFiltro}
									onChange={handleFechaFiltro}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12} sm={3}>
							<TextField
								name='tc'
								className={classes.disabled}
								disabled
								fullWidth
								label="TC"
								value={compras.tc || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								name='idtipodocumento'
								margin='normal'
								fullWidth
								autoFocus
								label="Facturar a"
								value={compras.idtipodocumento || ''}
								disabled={isLoading}
								onChange={onChange}
								onKeyDown={e => { if (e.keyCode === 13) { consultaDniFunction() } }}
								placeholder="Dni"
								helperText='presione enter'
								type="text"
							/>
							{isLoading && <LinearProgress color='secondary' />}
						</Grid>
						<Grid item xs={12} sm={3}>
							<Typography variant='body1' className={classes.texxto}>{compras.idsocionegocio}</Typography>
						</Grid>
						<Grid item xs={12} sm={3}>
							<TextField
								id='referencia'
								name='referencia'
								className={classes.disabled}
								fullWidth
								onChange={onChange}
								placeholder='Referencia'
								label="N° referencia"
								value={compras.referencia || ''}
								type="text"
							/>
						</Grid>
						<Grid item xs={12} sm={3}>
							<FormControl className={classes.select}>
								<Select name='moneda' value={compras.moneda || ''} onChange={onChange} fullWidth>
									<MenuItem value='soles'>Soles</MenuItem>
									<MenuItem value='dolares'>Dólares</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField
								id="observaciones"
								name="observaciones"
								fullWidth
								margin='normal'
								value={compras.observaciones || ''}
								onChange={onChange}
								helperText='Ingrese una observación'
								label='Observaciones'
							/>
						</Grid>
						<Grid item xs={12} className={classes.buttons}>
							<Button variant='contained' color='primary' className={classes.button} onClick={() => setAgregarCompra(true)}>Agregar</Button>
						</Grid>
						{compra.comprascreadas.length ?
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
										data={compra.comprascreadas}
										actions={[
											{
												icon: 'edit',
												tooltip: 'Ediar',
												onClick: (event, rowData) => {
													setAgregarCompra(true)
													dispatchCompra(['consultarInfo', compra.comprascreadas[rowData.item]])
													// dispatch(['facturaInfo', `/facturacion/info`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
													dispatchCompra(['abrirInfo', { id_compra: rowData.item }])
													// dispatchFactura(['consultarInfo', facturas[rowData.id_factura]])
												}
											},
											{
												icon: 'delete',
												tooltip: 'Eliminar',
												onClick: (event, rowData) => {
													// setOpenDialog(true)
													dispatchCompra(['eliminarArray', { preciorestar: parseInt(rowData.cantidad) * parseInt(rowData.preciounitario) }])
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
									<TextField disabled value={compra.subtotal} label='Venta bruta' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={0} label='Descuento 0.00%' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={compra.subtotal} label='Afecta' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={compra.porcentaje} label='IGV 18.00%' />
								</Grid>
								<Grid item xs={12} className={classes.contenedorLista}>
									<TextField disabled value={compra.total} label='Neto' />
								</Grid>
							</>
							: null}
					</Grid>
				</Paper>
			</main>
		</React.Fragment>
	);
}