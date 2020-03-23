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
import FacturaContext from './facturaContext';
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

function FacturaDialog({ abrir, funcion }) {
	const classes = useStyles()
	const { factura, dispatchFactura } = React.useContext(FacturaContext)
	const [insertarFactura, setInsertarFactura] = React.useState(typeof factura.informaciondetalle.item !== 'undefined' ? factura.informaciondetalle : {
		item: 0,
		producto: '',
		cantidad: '',
		preciounitario: '',
		descuento: '',
		parcial: '',
		igv: false
	})

	const onChange = (e) => {
		if (e.target.name === 'igv') {
			setInsertarFactura({
				...insertarFactura,
				igv: e.target.checked
			})
		} else {
			setInsertarFactura({
				...insertarFactura,
				[e.target.name]: e.target.value
			})
		}
	}

	const guardar = () => {
		dispatchFactura(['sumar', { precio: parseInt(insertarFactura.preciounitario) * parseInt(insertarFactura.cantidad), precionuevo: factura.subtotal === 0 ? parseInt(insertarFactura.preciounitario) * parseInt(insertarFactura.cantidad) : parseInt(insertarFactura.preciounitario) * parseInt(insertarFactura.cantidad) }])
		dispatchFactura(['insertarFactura', insertarFactura])
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
								value={insertarFactura.item}
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
								value={insertarFactura.producto}
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
								value={insertarFactura.cantidad}
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
								value={insertarFactura.preciounitario}
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
								value={insertarFactura.descuento}
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
								value={insertarFactura.parcial}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox checked={insertarFactura.igv} name='igv' onChange={onChange} />
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

export default FacturaDialog;
