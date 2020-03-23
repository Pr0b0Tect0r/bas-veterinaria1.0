import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Slide,
	Backdrop,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Grid,
	Zoom,
	TextField,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import MovimientoContext from './movimientoContext';
import AppInteractionContext from '../helpers/appInteraction';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
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
		marginTop: theme.spacing(6)
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
	button: {
		marginTop: theme.spacing(3.5)
	},
	button2: {
		marginBottom: theme.spacing(2)
	},
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});


function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return year;
}

function formatDateMes(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return month;
}

const defaultProps = {
	bgcolor: 'background.paper',
	m: 1,
	border: 1,
	style: { width: '100%', height: 'auto' },
};

export default function TablaMovimiento() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { movimiento } = React.useContext(MovimientoContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(new Date());
	const [movimientos, setMovimientos] = React.useState(typeof movimiento.informacion.id_movimiento !== 'undefined' ? movimiento.informacion : {
		origen: 9,
		asiento: '',
		fecha: '',
		glosa: '',
		tipo: '',
		estado: ''
	})
	const movimientosOtraInfo = typeof movimiento.otraInformacion.mes !== 'undefined' ? movimiento.otraInformacion : {
		ejerciciocontable: formatDateFinal(new Date()),
		mes: formatDateMes(new Date()),
		origencontable: 9
	}
	const classes = useStyles();
	const detalles = [
		{
			id_detalle: 0,
			item: 1,
			cta: 4212201,
			nomcuenta: 'FACTURAS EMITIDAS POR PAGAR',
			cc: 0,
			suc: 1,
			bco: 0,
			anx: 22709,
			td: 'FA',
			documento: 'F201-4851',
			emision: '26/02/2020',
			vencto: '26/02/2020',
			referencia: 113172828
		},
		{
			id_detalle: 1,
			item: 2,
			cta: 4212201,
			nomcuenta: 'FACTURAS EMITIDAS POR PAGAR',
			cc: 0,
			suc: 1,
			bco: 0,
			anx: 22709,
			td: 'FA',
			documento: 'F201-4851',
			emision: '26/02/2020',
			vencto: '26/02/2020',
			referencia: 113172828
		},
		{
			id_detalle: 2,
			item: 3,
			cta: 4212201,
			nomcuenta: 'FACTURAS EMITIDAS POR PAGAR',
			cc: 0,
			suc: 1,
			bco: 0,
			anx: 22709,
			td: 'FA',
			documento: 'F201-4851',
			emision: '26/02/2020',
			vencto: '26/02/2020',
			referencia: 113172828
		}
	]

	const onChange = (e) => {
		setMovimientos({
			...movimientos,
			[e.target.name]: e.target.value
		})
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Volver' }
		]
		dispatch(['movimientoNuevo', '/movimiento/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
	}

	React.useEffect(consultarAcciones, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">Agregar detalle</DialogTitle>
				<DialogContent>
					{/* <DialogContentText id="alert-dialog-slide-description">
						Llene los campos para agregar un detalle
          			</DialogContentText> */}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<TextField
								name="cta"
								fullWidth
								disabled
								margin='normal'
								value='422201'
								label='Cuenta'
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography variant='body1' className={classes.texto}>FACTURAS EMITIDAS POR PAGAR M.E.</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="bco"
								fullWidth
								disabled
								margin='normal'
								value='0'
								label='L. banco'
							/>
						</Grid>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12}>
							<TextField
								name="mediodepago"
								fullWidth
								disabled
								margin='normal'
								value='CARTA DE CRÉDITO DOCUMENTARIO - COMERCIO EXT.'
								label='Medio de pago'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="numero"
								fullWidth
								disabled
								margin='normal'
								value=''
								label='Número'
							/>
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12} sm={8}>
								<KeyboardDatePicker
									disableToolbar
									fullWidth
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline1"
									label="Fecha de operación"
									value={selectedDateFiltro}
									onChange={handleFechaFiltro}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12}>
							<Typography variant='body1'>Análisis de cuenta</Typography>
						</Grid>
						<Box borderColor='primary.main' borderRadius={5} {...defaultProps}>
							<Grid container spacing={2} style={{ padding: '5px' }}>
								<Grid item xs={12} sm={2}>
									<TextField
										name="tipoanx"
										fullWidth
										disabled
										margin='normal'
										value='2'
										label='T. anexo'
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField
										name="anx"
										fullWidth
										disabled
										margin='normal'
										value='22709'
										label='Anexo'
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Typography variant='body1' className={classes.texto}>SAMUEL BUSTAMANTE</Typography>
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField
										name="tipodoc"
										fullWidth
										disabled
										margin='normal'
										value='1'
										label='T. documento'
									/>
								</Grid>
								<Grid item xs={12} sm={9}>
									<TextField
										name="documento"
										fullWidth
										disabled
										margin='normal'
										value='F201-4851'
										label='Documento'
									/>
								</Grid>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={12} sm={6}>
										<KeyboardDatePicker
											disableToolbar
											fullWidth
											margin='normal'
											variant="inline"
											format="dd/MM/yyyy"
											id="date-picker-inline2"
											label="Emisión"
											value={selectedDateFiltro}
											onChange={handleFechaFiltro}
											KeyboardButtonProps={{
												"aria-label": "change date"
											}}
										/>
									</Grid>
								</MuiPickersUtilsProvider>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={12} sm={6}>
										<KeyboardDatePicker
											disableToolbar
											fullWidth
											margin='normal'
											variant="inline"
											format="dd/MM/yyyy"
											id="date-picker-inline3"
											label="Vencimiento"
											value={selectedDateFiltro}
											onChange={handleFechaFiltro}
											KeyboardButtonProps={{
												"aria-label": "change date"
											}}
										/>
									</Grid>
								</MuiPickersUtilsProvider>
							</Grid>
						</Box>
						<Grid item xs={12} sm={4}>
							<FormControl className={classes.formControl}>
								<InputLabel id="idsede">Moneda</InputLabel>
								<Select value='soles' onChange={onChange} name='moneda' fullWidth>
									<MenuItem value='soles'>Soles</MenuItem>
									<MenuItem value='dolares'>Dólares</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								name="referencia"
								fullWidth
								disabled
								margin='normal'
								value='113172828'
								label='Referencia'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="monto"
								fullWidth
								disabled
								margin='normal'
								value='200.41'
								label='Monto'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="tc"
								fullWidth
								disabled
								margin='normal'
								value='3.55'
								label='TC'
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								name="cambio"
								fullWidth
								disabled
								margin='normal'
								value='691.61'
								label='Cambio'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="glosa"
								fullWidth
								disabled
								margin='normal'
								value='APLICACIÓN ANTICIPOS FEBRERO'
								label='Glosa'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="secondary">
						Cancelar
          			</Button>
					<Button variant='contained' onClick={() => alert('agregar')} color="primary">
						Guardar item
          			</Button>
				</DialogActions>
			</Dialog>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={2}>
					<TextField
						name="mes"
						fullWidth
						margin='normal'
						value={movimientosOtraInfo.mes || ''}
						label='Mes'
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						name="origen"
						fullWidth
						margin='normal'
						value={movimientos.origen || ''}
						onChange={onChange}
						label='Origen'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<TextField
						name="asiento"
						fullWidth
						margin='normal'
						value={movimientos.asiento || ''}
						onChange={onChange}
						label='Voucher'
					/>
				</Grid>
				<Grid item xs={12} sm={4} />
				<Grid item xs={12} sm={10}>
					<TextField
						name="glosa"
						fullWidth
						margin='normal'
						value={movimientos.glosa || ''}
						onChange={onChange}
						label='Glosa'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => alert('importar')}>Importar</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('agregar')}>Agregar</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => setOpenDialog(true)}>Modificar</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('quitar')}>Quitar</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('Retener')}>Retener</Button>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('Deshacer retención')}>Deshacer retención</Button>
				</Grid>
			</Grid>
			<Zoom in={true} timeout={800}>
				<MaterialTable
					title='Detalle'
					columns={[
						{ title: 'Item', field: 'item' },
						{ title: 'Cta.', field: 'cta' },
						{ title: 'Nom. cuenta', field: 'nomcuenta' },
						{ title: 'CC', field: 'cc' },
						{ title: 'Suc', field: 'suc' },
						{ title: 'Bco', field: 'bco' },
						{ title: 'Anx', field: 'anx' },
						{ title: 'Td', field: 'td' },
						{ title: 'Documento', field: 'documento' },
						{ title: 'Emisión', field: 'emision' },
						{ title: 'Vencto', field: 'vencto' },
						{ title: 'Referencia', field: 'referencia' }
					]}
					data={detalles}
					localization={{
						pagination: {
							labelDisplayedRows: '{from}-{to} de {count}'
						},
						toolbar: {
							nRowsSelected: '{0} fila(s) seleccionadas'
						},
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
			</Zoom>
		</>
	);
}