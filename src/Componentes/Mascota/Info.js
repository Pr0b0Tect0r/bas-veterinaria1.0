import React from 'react';
import { CssBaseline, Card, CardContent, List, ListItem, ListItemText, CardActions, Avatar, CardMedia, Typography, Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AppInteractionContext from '../helpers/appInteraction';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import MascotaContext from './mascotaContext';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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
}));

export default function Info() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const { mascota, dispatchMascota } = React.useContext(MascotaContext)
	const [expanded, setExpanded] = React.useState(true);
	const classes = useStyles()

	const info = () => {
		// AuthTokenRequest.get('contactos/info', {
		// 	params: {
		// 		id_usuarios: contactos.id_usuarios
		// 	}
		// }).then(result => {
		dispatchMascota(['consultarInfo', mascota.informacion])
		// })
	}

	const consultarAcciones = () => {
		var aja = [{ name: 'Volver' }]
		// AuthTokenRequest.post('acciones', { form: 'contactosInfo' })
		// 	.then(result => {
		dispatch(['mascotaInfo', `/mascota/info`, 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	React.useEffect(consultarAcciones, [])

	React.useEffect(info, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<Zoom in={true} timeout={500}>
				<main className={classes.layout}>
					<Card raised={true} className={classes.root}>
						<CardMedia>
							<Avatar src={mascota.informacion.avatar} className={classes.avatar} />
						</CardMedia>
						<CardContent>
							<Typography variant="h5" className={classes.texto} color='secondary'>
								{mascota.informacion.nombre}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<Tooltip title='Historia clinica'>
								<IconButton>
									<FindInPageOutlinedIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Agendar cita'>
								<IconButton>
									<EventIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title='Editar'>
								<IconButton onClick={() => dispatch(['Nuevo', `/mascota/nuevo`, 'funcion', interactions.formContent.funcionSecundaria, interactions.acciones])}>
									<EditOutlinedIcon />
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
										<ListItemText primary='Dueño' secondary='Juan Lizama' />
									</ListItem>
									<ListItem>
										<ListItemText primary='Especie' secondary={mascota.informacion.especie} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Raza' secondary={mascota.informacion.raza} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Sexo' secondary={mascota.informacion.sexo} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Fecha de nacimiento' secondary={mascota.informacion.fechanac} />
									</ListItem>
									<ListItem>
										<ListItemText primary='Color de pelaje' secondary={mascota.informacion.color} />
									</ListItem>

									<Typography paragraph>Observación:</Typography>
									<Typography paragraph>
										{mascota.informacion.observacion}
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