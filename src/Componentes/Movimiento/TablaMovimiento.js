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
	TextField
} from '@material-ui/core';
import MaterialTable from 'material-table';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import MovimientoContext from './movimientoContext';
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

export default function TablaMovimiento() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { movimiento, dispatchMovimiento } = React.useContext(MovimientoContext)
	const [openDialog, setOpenDialog] = React.useState(false)
	const [filtro, setFiltro] = React.useState({
		ejerciciocontable: formatDateFinal(new Date()),
		mes: formatDateMes(new Date()),
		origencontable: 9
	})
	const classes = useStyles();
	const movimientos = [
		{
			id_movimiento: 0,
			origen: 9,
			asiento: '109',
			fecha: '18/03/2020',
			glosa: 'APL ANT V7-341 FEBRERO CITIKOLD',
			tipo: 'Manual',
			estado: 'Pendiente'
		},
		{
			id_movimiento: 1,
			origen: 9,
			asiento: '59',
			fecha: '15/03/2020',
			glosa: 'JUAN LIZAMA',
			tipo: 'Manual',
			estado: 'Pendiente'
		},
		{
			id_movimiento: 2,
			origen: 9,
			asiento: '16',
			fecha: '20/02/2020',
			glosa: 'SAMUEL BUSTAMANTE',
			tipo: 'Manual',
			estado: 'Pendiente'
		}
	]

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const movimientoConsultar = () => {

		// AuthTokenRequest.get('contactos')
		// .then(result => {
		dispatchMovimiento(['consultar', movimientos])
		// })
	}

	const eliminar = () => {
		// AuthTokenRequest.get('contactos/eliminar', {
		// 	params: {
		// 		id_usuarios: mascota.id_eliminar
		// 	}
		// }).then(() => {
		setOpenDialog(false)
		movimientoConsultar()
		// })
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Imprimir' },
			{ name: 'Excel' }
		]
		dispatch(['listaMovimiento', '/movimiento', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])
	React.useEffect(movimientoConsultar, [])

	return (
		<>
			<Backdrop open={openDialog} className={classes.back} />
			<Dialog
				open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
				<DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${movimiento.glosa}?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Una vez eliminada se perderá toda la información de este movimiento.
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
				<Grid item xs={12} sm={4}>
					<TextField
						name="ejerciciocontable"
						fullWidth
						margin='normal'
						value={filtro.ejerciciocontable || ''}
						onChange={onChange}
						label='Ejercicio contable'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<TextField
						name="mes"
						fullWidth
						margin='normal'
						value={filtro.mes || ''}
						onChange={onChange}
						label='Mes'
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						name="origencontable"
						fullWidth
						margin='normal'
						value={filtro.origencontable || ''}
						onChange={onChange}
						label='Origen contable'
					/>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => alert('buscar')}>Buscar</Button>
				</Grid>
			</Grid>
			<Zoom in={true} timeout={500}>
				<MaterialTable
					title='Movimientos de cuentas'
					columns={[
						{ title: 'Origen', field: 'origen' },
						{ title: 'Asiento', field: 'asiento' },
						{ title: 'Fecha', field: 'fecha' },
						{ title: 'Glosa', field: 'glosa' },
						{ title: 'Tipo', field: 'tipo' },
						{ title: 'Estado', field: 'estado' }
					]}
					data={movimiento.movimientos}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver',
							onClick: (event, rowData) => {
								dispatch(['movimientoInfo', `/movimiento/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
								dispatchMovimiento(['abrirInfo', { id_movimiento: rowData.id_movimiento }])
								dispatchMovimiento(['consultarInfo', { informacion: movimientos[rowData.id_movimiento], otraInformacion: filtro }])
							}
						},
						{
							icon: 'delete',
							tooltip: 'Eliminar',
							onClick: (event, rowData) => {
								setOpenDialog(true)
								dispatchMovimiento(['eliminarMovimiento', { id_eliminar: rowData.id_movimiento, nombreEliminar: rowData.descripcion }])
							}
						},
						{
							icon: 'refresh',
							tooltip: 'Actualizar',
							isFreeAction: true,
							onClick: () => { movimientoConsultar() }
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