import React from 'react';
import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	Box,
	List,
	ListItem,
	Divider,
	Button,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox
} from '@material-ui/core';
import OrdenContext from './ordenContext';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

function OrdenDialog({ abrir, funcion }) {
	const classes = useStyles()
	const { orden, dispatchOrden } = React.useContext(OrdenContext)
	const [insertarOrden, setInsertarOrden] = React.useState(orden.informaciondetalle)

	const onChange = (e) => {
		if (e.target.name === 'igv') {
			setInsertarOrden({
				...insertarOrden,
				igv: e.target.checked
			})
		} else {
			setInsertarOrden({
				...insertarOrden,
				[e.target.name]: e.target.value
			})
		}
	}

	const guardar = () => {
		dispatchOrden(['sumar', { precio: parseInt(insertarOrden.preciounitario) * parseInt(insertarOrden.cantidad), precionuevo: orden.subtotal === 0 ? parseInt(insertarOrden.preciounitario) * parseInt(insertarOrden.cantidad) : parseInt(insertarOrden.preciounitario) * parseInt(insertarOrden.cantidad) }])
		dispatchOrden(['insertarOrden', insertarOrden])
		funcion()
	}


	return (
		<Dialog open={abrir} onClose={funcion}>
			<DialogTitle disableTypography><Typography variant="h6">Insertar</Typography></DialogTitle>
			<DialogContent>
				<List disablePadding>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='item'
								fullWidth
								autoFocus
								onChange={onChange}
								label="Item"
								value={insertarOrden.item || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='producto'
								fullWidth
								onChange={onChange}
								label="Producto"
								value={insertarOrden.producto || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='cantidad'
								fullWidth
								onChange={onChange}
								label="Cantidad"
								value={insertarOrden.cantidad || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='preciounitario'
								fullWidth
								onChange={onChange}
								label="Precio Uni."
								value={insertarOrden.preciounitario || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='descuento'
								fullWidth
								onChange={onChange}
								label="Descuento"
								value={insertarOrden.descuento || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<TextField
								name='parcial'
								fullWidth
								onChange={onChange}
								label="Parcial"
								value={insertarOrden.parcial || ''}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox checked={insertarOrden.igv || false} name='igv' onChange={onChange} />
								}
								label="IGV"
							/>
						</Grid>
					</ListItem>
					<Box mt={2} mb={1}>
						<Divider light />
					</Box>

					<ListItem className={classes.buttons}>
						<Button color="secondary" variant="contained" className={classes.button} onClick={() => guardar()}>Guardar</Button>
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>
	)
}

export default OrdenDialog;
