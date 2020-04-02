import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Button,
	Grid
} from '@material-ui/core';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
// import ValorContext from './valorContext';
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

function formatDateMes(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return month;
}

export default function TablaValor() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	// const { valor, dispatchValor } = React.useContext(ValorContext)
	const [filtro, setFiltro] = React.useState({
		año: formatDateFinal(new Date()),
		mes: formatDateMes(new Date())
	})
	const classes = useStyles();

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
		dispatch(['listaValor', '/valor', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])

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
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel>Año</InputLabel>
						<Select value={filtro.mes || ''} onChange={onChange} name='mes' fullWidth>
							<MenuItem value='01'>enero</MenuItem>
							<MenuItem value='02'>febrero</MenuItem>
							<MenuItem value='03'>marzo</MenuItem>
							<MenuItem value='04'>abril</MenuItem>
							<MenuItem value='05'>mayo</MenuItem>
							<MenuItem value='06'>junio</MenuItem>
							<MenuItem value='07'>julio</MenuItem>
							<MenuItem value='08'>agosto</MenuItem>
							<MenuItem value='09'>septiembre</MenuItem>
							<MenuItem value='10'>octubre</MenuItem>
							<MenuItem value='11'>noviembre</MenuItem>
							<MenuItem value='12'>diciembre</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => alert('calculando')}>Calcular</Button>
				</Grid>
			</Grid>
		</>
	);
}