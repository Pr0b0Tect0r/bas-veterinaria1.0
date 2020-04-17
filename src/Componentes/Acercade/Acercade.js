import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	CssBaseline,
	Zoom
} from '@material-ui/core';
import AppInteractionContext from '../helpers/appInteraction';
// import Info from './Info';
// import Nuevo from './Nuevo';
import Logo2 from '../../assets/images/Logo5.svg';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(10),
		paddingLeft: theme.spacing(4)
	},
	bigAvatar: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 200,
		height: 'auto'
	},
}));


export default function Acercade() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const classes = useStyles()


	const consultarAcciones = () => {
		var aja = [
			{ name: 'Volver' }
		]
		dispatch(['listaAcercade', '/acercade', 'funcion', interactions.formContent.funcionSecundaria, aja])

	}

	React.useEffect(consultarAcciones, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<Zoom in={true} timeout={500}>
				<Grid container spacing={1} className={classes.root}>
					<img alt='...' src={Logo2} className={classes.bigAvatar} />
				</Grid>
			</Zoom>
		</React.Fragment>
	);
}