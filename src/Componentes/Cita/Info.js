import React from 'react';
import { CssBaseline, Card, CardContent, List, ListItem, ListItemText, Snackbar, CardActions, CardHeader, Typography, Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AppInteractionContext from '../helpers/appInteraction';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import CitaContext from './citaContext';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import MuiAlert from '@material-ui/lab/Alert';
import CitaDialog from './CitaDialog'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		width: 200,
		height: 200,
		margin: 'auto'
	},
	texto: {
		textAlign: 'center',
		marginTop: theme.spacing(1)
	},
	info: {
		marginTop: theme.spacing(1)
	},
	Paper: {
		width: '100%',
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			width: '100%',
			padding: theme.spacing(3)
		}
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	close: {
		padding: theme.spacing(0.5)
	},
	snack: {
		opacity: '0.8',
		width: '100%'
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Info() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { cita, dispatchCita } = React.useContext(CitaContext)
	const [expanded, setExpanded] = React.useState(true)
	const [aviso, setAviso] = React.useState({ tipo: '', mensaje: '', abrir: false })
	const [reprogramarDialog, setReprogramarDialog] = React.useState(false)
	const classes = useStyles()

	const info = () => {
		// AuthTokenRequest.get('contactos/info', {
		// 	params: {
		// 		id_usuarios: contactos.id_usuarios
		// 	}
		// }).then(result => {
		dispatchCita(['consultarInfo', cita.informacion])
		// })
	}

	const consultarAcciones = () => {
		var aja = [{ name: 'Volver' }]
		// AuthTokenRequest.post('acciones', { form: 'contactosInfo' })
		// 	.then(result => {
		dispatch(['citaInfo', `/cita/info`, 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleExpandClick = () => {
		setExpanded(!expanded);
	}

	const handleCloseMensaje = () => {
		setAviso({ tipo: aviso.tipo, mensaje: aviso.mensaje, abrir: false })
	}

	const confirmar = (tipo, mensaje) => {
		dispatchCita(['confirmar', 'confirmado'])
		setAviso({ tipo: tipo, mensaje: mensaje, abrir: true })
	}

	const cancelar = (tipo, mensaje) => {
		dispatchCita(['cancelar', 'cancelado'])
		setAviso({ tipo: tipo, mensaje: mensaje, abrir: true })
	}

	const cerrar = () => {
		setReprogramarDialog(false)
		setAviso({ tipo: 'success', mensaje: 'Cita reprogramada', abrir: true })
	}

	React.useEffect(consultarAcciones, [])

	React.useEffect(info, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<CitaDialog abrir={reprogramarDialog} funcion={() => cerrar()} />
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={aviso.abrir} autoHideDuration={3000}
				onClose={handleCloseMensaje}
				className={classes.snack}>
				<Alert onClose={handleCloseMensaje} severity={aviso.tipo}>
					<Typography variant='button'>{aviso.mensaje}</Typography>
				</Alert>
			</Snackbar>
			<Zoom in={true} timeout={500}>
				<main className={classes.layout}>
					<Card raised={true} className={classes.root}>
						<CardHeader title={<Typography variant='h5' className={classes.texto} color='secondary'>Información de cita</Typography>}
							subheader={<Typography variant='h6' className={classes.texto}>{cita.informacion.fechacita}</Typography>} />
						<CardActions disableSpacing>
							<Tooltip title='Confirmar'>
								<IconButton onClick={() => confirmar('success', 'Cita confirmada')}>
									<DoneOutlineOutlinedIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Reprogramar'>
								<IconButton onClick={() => setReprogramarDialog(true)}>
									<EditOutlinedIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Cancelar'>
								<IconButton onClick={() => cancelar('error', 'Cita cancelada')}>
									<DeleteOutlineOutlinedIcon />
								</IconButton>
							</Tooltip>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="Ver información"
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<List>
									<ListItem>
										<ListItemText primary='Cliente' secondary={cita.informacion.dnidueño} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Mascota' secondary={cita.informacion.idmascota} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Especialidad' secondary={cita.informacion.idespecialidad} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Médico' secondary={cita.informacion.idmedico} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Sede' secondary={cita.informacion.idsede} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Hora de atención' secondary={cita.informacion.horacita} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Estado' secondary={cita.informacion.idestado} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Fecha de registro' secondary={cita.informacion.fecharegistro} />
									</ListItem>
									<Typography paragraph>Observación:</Typography>
									<Typography paragraph>
										{cita.informacion.observaciones}
									</Typography>

								</List>
							</CardContent>
						</Collapse>
					</Card>
				</main>
			</Zoom>
		</React.Fragment>
	);
}