import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	CssBaseline,
	Zoom
} from '@material-ui/core';
import TablaOrden from './TablaOrden';
import AppInteractionContext from '../helpers/appInteraction';
// import Info from './Info';
import Nuevo from './Nuevo';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(8),
		paddingLeft: theme.spacing(4)
	}
}));


export default function Orden() {
	const { interactions } = React.useContext(AppInteractionContext)
	const classes = useStyles()

	return (
		<React.Fragment>
			<CssBaseline />
			<Zoom in={true} timeout={500}>
				<Grid container spacing={1} className={classes.root}>
					<Grid item xs={12}>
						{interactions.formContent.path === '/orden/info' ?
							null //info
							:
							interactions.formContent.path === '/orden/nuevo' ?
								<Nuevo />
								:
								<TablaOrden />
						}
					</Grid>
				</Grid>
			</Zoom>
		</React.Fragment>
	);
}