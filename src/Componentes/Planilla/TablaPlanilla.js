import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Slide,
	Backdrop,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Grid,
	Zoom,
	MenuItem,
	FormControl,
	InputLabel,
	Select
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
		marginTop: theme.spacing(1)
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
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	}
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

	return [day, month, year].join('/');
}

function formatDateInicio(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;

	return ['01', month, year].join('/');
}

export default function TablaPlanilla() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { planilla, dispatchPlanilla } = React.useContext(PlanillaContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [filtro, setFiltro] = React.useState({
		rangofechas1: new Date(),
		rangofechas2: formatDateInicio(new Date()),
		estado: 'todos'
	})
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(filtro.rangofechas1);
	const classes = useStyles();
	const planillas = [
		{
			id_planilla: 0,
			numero: '1',
			fecha: '02/02/2020',
			glosa: 'COBRANZAS VARIOS',
			vou: '1',
			soles: '10.161.80',
			dolares: '2.256.236',
			estado: 'cerrado'

		},
		{
			id_planilla: 1,
			numero: '2',
			fecha: '02/02/2020',
			glosa: 'COBRANZAS VARIOS',
			vou: '1',
			soles: '10.161.80',
			dolares: '2.256.236',
			estado: 'cerrado'

		},
		{
			id_planilla: 2,
			numero: '3',
			fecha: '02/02/2020',
			glosa: 'COBRANZAS VARIOS',
			vou: '1',
			soles: '10.161.80',
			dolares: '2.256.236',
			estado: 'cerrado'

		}
	]

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const planillaConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchPlanilla(['consultar', planillas])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		planillaConsultar()
		// })
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Imprimir' },
			{ name: 'Excel' }
		]
		dispatch(['listaPlanilla', '/planilla', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setFiltro({
			...filtro,
			rangofechas1: formatDateFinal(date)
		})
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(planillaConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${planilla.numero}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminado se perderá toda la información de esta planilla.
          			</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} color="secondary">
						Cancelar
          			</Button>
					<Button variant='contained' onClick={() => eliminar()} color="primary">
						Confirmar
          			</Button>
				</DialogActions>
			</Dialog>
			<Grid container spacing={2}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid item xs={12} sm={3}>
						<KeyboardDatePicker
							disableToolbar
							fullWidth
							margin='normal'
							variant="inline"
							format="dd/MM/yyyy"
							id="date-picker-inline3"
							label="Rango"
							value={selectedDateFiltro}
							onChange={handleFechaFiltro}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid item xs={12} sm={3}>
						<KeyboardDatePicker
							disableToolbar
							fullWidth
							margin='normal'
							variant="inline"
							format="dd/MM/yyyy"
							id="date-picker-inline2"
							label="Rango"
							value={filtro.rangofechas2 || ''}
							onChange={onChange}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel id="idsede">Estado</InputLabel>
						<Select value={filtro.estado || ''} onChange={onChange} name='estado' fullWidth>
							<MenuItem value='todos'>Todos</MenuItem>
							<MenuItem value='pendiente'>Pendiente</MenuItem>
							<MenuItem value='cerrado'>Cerrado</MenuItem>
							<MenuItem value='anulado'>Anulado</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => alert('buscar')}>Buscar</Button>
				</Grid>
			</Grid>
			<Zoom in={true} timeout={500}>
				<MaterialTable
					title='Planilla de cobranza'
					columns={[
						{ title: 'ID', field: 'numero' },
						{ title: 'Fecha', field: 'fecha' },
						{ title: 'Glosa', field: 'glosa' },
						{ title: 'Voucher', field: 'vou' },
						{ title: 'Soles', field: 'soles' },
						{ title: 'Dólares', field: 'dolares' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={planilla.planillas}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver',
							onClick: (event, rowData) => {
								dispatch(['planillaInfo', `/planilla/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchPlanilla(['abrirInfo', { id_planilla: rowData.id_planilla }])
								dispatchPlanilla(['consultarInfo', { informacion: planillas[rowData.id_planilla], otraInformacion: filtro }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchPlanilla(['eliminarPlanilla', { id_eliminar: rowData.id_planilla, nombreEliminar: rowData.numero }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { planillaConsultar() }
						},
						{
							icon: 'filter_list',
							tooltip: 'Filtrar',
							isFreeAction: true,
							onClick: (event) => { alert('filtro') }
						}
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
						search: false
					}}
				/>
			</Zoom>
		</>
	);
}