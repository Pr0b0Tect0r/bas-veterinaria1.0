import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Grid,
	Zoom
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CierreContext from './cierreContext';
import AppInteractionContext from '../helpers/appInteraction'

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

function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return year;
}

export default function TablaCierre() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { cierre, dispatchCierre } = React.useContext(CierreContext)
	const [filtro, setFiltro] = React.useState({
		año: formatDateFinal(new Date())
	})
	const classes = useStyles();

	const cierres = [
		{
			id_cierre: 0,
			mes: 'ENERO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 1,
			mes: 'FEBRERO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 2,
			mes: 'MARZO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 3,
			mes: 'ABRIL',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 4,
			mes: 'MAYO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 5,
			mes: 'JUNIO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 6,
			mes: 'JULIO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 7,
			mes: 'AGOSTO',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 8,
			mes: 'SEPTIEMBRE',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 9,
			mes: 'OCTUBRE',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 10,
			mes: 'NOVIEMBRE',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		},
		{
			id_cierre: 11,
			mes: 'DICIEMBRE',
			estadovalor: 'Valorizado',
			ultimavalor: '05/03/2020 06:26:55 pm',
			estado: 'abierto'
		}
	]

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Imprimir' },
			{ name: 'Excel' }
		]
		dispatch(['listaCierre', '/cierre', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const cierreConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchCierre(['consultar', { cierres: cierres }])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(cierreConsultar, [])

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel>Año</InputLabel>
						<Select value={filtro.año || ''} onChange={onChange} name='año' fullWidth>
							<MenuItem value='2012'>2012</MenuItem>
							<MenuItem value='2013'>2013</MenuItem>
							<MenuItem value='2014'>2014</MenuItem>
							<MenuItem value='2015'>2015</MenuItem>
							<MenuItem value='2016'>2016</MenuItem>
							<MenuItem value='2017'>2017</MenuItem>
							<MenuItem value='2018'>2018</MenuItem>
							<MenuItem value='2019'>2019</MenuItem>
							<MenuItem value='2020'>2020</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Zoom in={true} timeout={500}>
				<MaterialTable
					title='Cierre mensual'
					columns={[
						{ title: 'Mes', field: 'mes' },
						{ title: 'Estado valorización', field: 'estadovalor' },
						{ title: 'Última valorización', field: 'ultimavalor' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={cierre.cierres}
					actions={[
						{
							icon: 'lock',
							tooltip: 'cerrar',
							onClick: (event, rowData) => {

								// dispatch(['tipoMovimientoInfo', `/tipomovimiento/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								// dispatchTipomovimiento(['abrirInfo', { id_movimiento: rowData.id_movimiento }])
								// dispatchTipomovimiento(['consultarInfo', { informacion: movimientosIngreso[rowData.id_movimiento] }])
							}
						},
						// {
						// 	icon: 'delete',
						// 	tooltip: 'Eliminar',
						// 	onClick: (event, rowData) => {
						// 		setOpenDialog(true)
						// 		dispatchTipomovimiento(['eliminarMovimiento', { id_eliminar: rowData.id_movimiento, nombreEliminar: rowData.nombre }])
						// 	}
						// },
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { cierreConsultar() }
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