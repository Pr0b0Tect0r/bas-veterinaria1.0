import React, { Suspense } from 'react';
import Cabecera from './Cabecera';
import { Paper } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Footer from './Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './Menu';
import { makeStyles } from '@material-ui/core/styles';
import AppInteractionContext from '../helpers/appInteraction';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

const useStyles = makeStyles(theme => ({
	root: {
		width: '89%',
		paddingBottom: theme.spacing(5),
		marginLeft: theme.spacing(27),
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			width: '100%',
			marginLeft: 'auto'
		}
	},
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing(7),
		right: theme.spacing(2),
	}
}));

function Layout() {
	const [open, setOpen] = React.useState(window.screen.width < 769 ? false : true)
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const classes = useStyles()

	const preventActionClickClose = (evt, action) => {
		evt.preventDefault()
		evt.stopPropagation()
		if (action.name === 'Nuevo') {
			dispatch(['Nuevo', `${interactions.formContent.path}/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
		}
		if (action.name === 'Table') {
			dispatch(['Tarjeta', interactions.formContent.path, 'funcion', false, interactions.acciones])
		}
		if (action.name === 'Tarjeta') {
			dispatch(['Tarjeta', interactions.formContent.path, 'funcion', true, interactions.acciones])
		}
		if (action.name === 'Volver') {
			dispatch(['Volver', `/${interactions.formContent.path.split('/')[1]}`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])
		}

		if (action.name === 'Guardar') {
			interactions.formContent.funcion()
		}

		if (action.name === 'Imprimir') {
			alert('Se acabó la tinta, recargar cartucho')
		}

		if (action.name === 'Excel') {
			alert('Importando excel')
		}
	}


	return (
		<React.Fragment>
			<CssBaseline />
			<div className="app">
				<Paper elevation={4}>
					<Suspense>
						<Cabecera />
					</Suspense>
				</Paper>
				<Suspense style={{ position: 'fixed' }}>
					<Menu />
				</Suspense>

				<main className={classes.root}>
					{interactions.formContent.path === '/inicio' ?
						null : interactions.formContent.path === '/agenda' ? null
							: <SpeedDial
								ariaLabel="Speedial"
								className={classes.speedDial}
								icon={<SpeedDialIcon />}
								onClick={() => setOpen(!open)}
								open={open}>
								{interactions.acciones.map((action, index) => (
									<SpeedDialAction
										tooltipOpen
										key={index}
										icon={action.name === 'Guardar' ? <SaveOutlinedIcon /> : action.name === 'Volver' ? <ArrowBackOutlinedIcon /> : action.name === 'Nuevo' ? <PetsOutlinedIcon /> : action.name === 'Table' ? <TableChartOutlinedIcon /> : action.name === 'Tarjeta' ? <WidgetsOutlinedIcon /> : action.name === 'Imprimir' ? <PrintOutlinedIcon /> : action.name === 'Excel' ? <ReceiptOutlinedIcon /> : ''}
										tooltipTitle={action.name}
										onClick={evt => preventActionClickClose(evt, action)}
									/>
								))}
							</SpeedDial>}
					<Suspense>
						<Switch>
							{routes.map((route) => {
								return route.component ? (
									<Route
										key={route.id}
										path={route.path}
										exact={route.exact}
										name={route.name}
										render={props => (
											<route.component key={route.id} {...props} />
										)} />
								) : (null);
							})}
							<Redirect to="/login" />
						</Switch>
					</Suspense>
				</main>
				<Suspense >
					<Footer />
				</Suspense>
			</div>
		</React.Fragment>
	);
}
export default Layout;