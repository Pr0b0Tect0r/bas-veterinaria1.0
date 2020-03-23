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
import CompraContext from './compraContext';
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

function CompraDialog({ abrir, funcion }) {
	const classes = useStyles()
	const { compra, dispatchCompra } = React.useContext(CompraContext)
	const [insertarCompra, setInsertarCompra] = React.useState(typeof compra.informaciondetalle.item !== 'undefined' ? compra.informaciondetalle : {
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
			setInsertarCompra({
				...insertarCompra,
				igv: e.target.checked
			})
		} else {
			setInsertarCompra({
				...insertarCompra,
				[e.target.name]: e.target.value
			})
		}
	}

	const guardar = () => {
		dispatchCompra(['sumar', { precio: parseInt(insertarCompra.preciounitario) * parseInt(insertarCompra.cantidad), precionuevo: compra.subtotal === 0 ? parseInt(insertarCompra.preciounitario) * parseInt(insertarCompra.cantidad) : parseInt(insertarCompra.preciounitario) * parseInt(insertarCompra.cantidad) }])
		dispatchCompra(['insertarCompra', insertarCompra])
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
								value={insertarCompra.item}
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
								value={insertarCompra.producto}
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
								value={insertarCompra.cantidad}
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
								value={insertarCompra.preciounitario}
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
								value={insertarCompra.descuento}
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
								value={insertarCompra.parcial}
								type="text"
							/>
						</Grid>
					</ListItem>
					<ListItem>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox checked={insertarCompra.igv} name='igv' onChange={onChange} />
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

export default CompraDialog;
