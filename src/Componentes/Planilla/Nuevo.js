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
import PlanillaContext from './planillaContext';
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
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});


// function formatDateFinal(date) {
// 	var d = new Date(date),
// 		month = '' + (d.getMonth() + 1),
// 		day = '' + d.getDate(),
// 		year = d.getFullYear();

// 	if (month.length < 2) month = '0' + month;
// 	if (day.length < 2) day = '0' + day;

// 	return year;
// }

// function formatDateMes(date) {
// 	var d = new Date(date),
// 		month = '' + (d.getMonth() + 1),
// 		day = '' + d.getDate();

// 	if (month.length < 2) month = '0' + month;
// 	if (day.length < 2) day = '0' + day;

// 	return month;
// }

const defaultProps = {
	bgcolor: 'background.paper',
	m: 1,
	border: 1,
	style: { width: '100%', height: 'auto', marginTop: '3px' },
};

export default function TablaMovimiento() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { planilla } = React.useContext(PlanillaContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [planillas, setPlanillas] = React.useState(typeof planilla.informacion.fecha !== 'undefined' ? planilla.informacion : {
		numero: '',
		fecha: '',
		glosa: '',
		vou: '',
		soles: '',
		dolares: '',
		estado: ''
	})
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(planillas.fecha);
	const classes = useStyles();
	const detalles = [
		{
			item: 1,
			cliente: 'AGROEXPORTADORA VILLACURI',
			cta: '1213201',
			TD: 'FA',
			documento: 'FF011-7894',
			emision: '02/02/2020',
			vencimiento: '02/02/2020',
			MC: 'D',
			cobrado: '2.076.80',
			tc: '1000',
			formapago: 'DEPOSITO',
			bco: 'BBVA',
			comprobante: '',
			abonous: '2.076.80',
			glosa: planillas.glosa || ''
		},
		{
			item: 2,
			cliente: 'AGROEXPORTADORA VILLACURI',
			cta: '1213201',
			TD: 'FA',
			documento: 'FF011-7894',
			emision: '02/02/2020',
			vencimiento: '02/02/2020',
			MC: 'D',
			cobrado: '2.076.80',
			tc: '1000',
			formapago: 'DEPOSITO',
			bco: 'BBVA',
			comprobante: '',
			abonous: '2.076.80',
			glosa: planillas.glosa || ''
		},
		{
			item: 3,
			cliente: 'AGROEXPORTADORA VILLACURI',
			cta: '1213201',
			TD: 'FA',
			documento: 'FF011-7894',
			emision: '02/02/2020',
			vencimiento: '02/02/2020',
			MC: 'D',
			cobrado: '2.076.80',
			tc: '1000',
			formapago: 'DEPOSITO',
			bco: 'BBVA',
			comprobante: '',
			abonous: '2.076.80',
			glosa: planillas.glosa || ''
		},
		{
			item: 4,
			cliente: 'AGROEXPORTADORA VILLACURI',
			cta: '1213201',
			TD: 'FA',
			documento: 'FF011-7894',
			emision: '02/02/2020',
			vencimiento: '02/02/2020',
			MC: 'D',
			cobrado: '2.076.80',
			tc: '1000',
			formapago: 'DEPOSITO',
			bco: 'BBVA',
			comprobante: '',
			abonous: '2.076.80',
			glosa: planillas.glosa || ''
		}
	]

	const onChange = (e) => {
		setPlanillas({
			...planillas,
			[e.target.name]: e.target.value
		})
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Volver' }
		]
		dispatch(['planillaNuevo', '/planilla/nuevo', 'funcion', interactions.formContent.funcionSecundaria, aja])
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
						name="operacion"
						fullWidth
						disabled
						margin='normal'
						value='26706'
						label='Operación'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<TextField
						name="vou1"
						fullWidth
						disabled
						margin='normal'
						value='35'
						label='Voucher'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<TextField
						name="vou"
						fullWidth
						disabled
						margin='normal'
						value={planillas.vou || ''}
						label='Voucher'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box borderColor='primary.main' borderRadius={5} {...defaultProps}>
						<Grid container spacing={2} style={{ padding: '2px' }}>
							<Grid item xs={12}>
								<Typography variant='body1' className={classes.texto}>Planilla de cobranza</Typography>
								<Typography variant='body1' className={classes.texto}>{planillas.vou}</Typography>
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
							id="date-picker-inline3"
							label="Fecha de registro"
							value={selectedDateFiltro}
							onChange={handleFechaFiltro}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<Grid item xs={12} sm={9} />
				<Grid item xs={12} sm={4}>
					<TextField
						name="tc"
						fullWidth
						margin='normal'
						value={planillas.tc || '3.56'}
						onChange={onChange}
						label='Tipo de cambio'
					/>
				</Grid>
				<Grid item xs={12} sm={8}>
					<TextField
						name="glosa"
						fullWidth
						margin='normal'
						value={planillas.glosa || ''}
						onChange={onChange}
						label='Glosa'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' color='primary' className={classes.button2} onClick={() => alert('agrega')}>agrega</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => setOpenDialog(true)}>modifica</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('quitar')}>quitar</Button>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('importar')}>importar</Button>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button variant='outlined' className={classes.button2} color='primary' onClick={() => alert('multiples documentos')}>multiples documentos</Button>
				</Grid>
			</Grid>
			<Zoom in={true} timeout={800}>
				<MaterialTable
					title='Detalle'
					columns={[
						{ title: 'Item', field: 'item' },
						{ title: 'Cliente', field: 'cliente' },
						{ title: 'Cta', field: 'cta' },
						{ title: 'TD', field: 'td' },
						{ title: 'Documento.', field: 'documento' },
						{ title: 'Emisión', field: 'emision' },
						{ title: 'Vencimiento', field: 'vencimiento' },
						{ title: 'MC', field: 'mc' },
						{ title: 'Cobrado', field: 'cobrado' },
						{ title: 'TC', field: 'tc' },
						{ title: 'Forma de pago', field: 'formapago' },
						{ title: 'BCO', field: 'bco' },
						{ title: 'Comprobante', field: 'comprobante' },
						{ title: 'Abono US$', field: 'abonous' },
						{ title: 'Glosa', field: 'glosa' }
					]}
					data={detalles}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver',
							onClick: (event, rowData) => {
								setOpenDialog(true)
							}
						},
					]}
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
						selection: true,
						search: false
					}}
				/>
			</Zoom>
			<Grid container style={{marginTop: '2px'}}>
				<Grid item xs={6} className={classes.contenedorLista1}>
					<Typography variant='body1'>{detalles[0].cta}</Typography>
				</Grid>
				<Grid item xs={6} className={classes.contenedorLista}>
					<TextField disabled value='10,123,456' label='S/' />
				</Grid>
				<Grid item xs={6} className={classes.contenedorLista1}>
					<Typography variant='body1'>{`${detalles[0].cliente} - CERRADA`}</Typography>
				</Grid>
				<Grid item xs={6} className={classes.contenedorLista}>
					<TextField disabled value='5,5637,89' label='US$%' />
				</Grid>
			</Grid>
		</>
	);
}