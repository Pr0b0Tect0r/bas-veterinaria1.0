import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { Drawer, CssBaseline, AppBar, Toolbar, List, ListItemAvatar, Badge, Collapse, Typography, Divider, IconButton, ListItem, ListItemText, Avatar, MenuItem, Menu, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, withRouter, Link, useHistory } from 'react-router-dom';
import TemaDialog from '../Configuracion/TemaDialog';
import Logo2 from '../../assets/images/Logo5.svg';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LoginContext from '../helpers/loginContext';
import ThemeContext from '../helpers/themeContext';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#364049'
	},
	drawerHeader: {
		backgroundColor: '#1f303d',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	avatarButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(22),
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			marginLeft: 'auto'
		}
	},
	bigAvatar: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 120,
		height: 'auto'
	},
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	lista: {
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	},
	snack: {
		opacity: '0.8'
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	},
	avatarMensaje: {
		marginRight: theme.spacing(1)
	},
	close: {
		padding: theme.spacing(0.5)
	},
	contenedorLetras: {
		backgroundColor: '#1f303d',
		width: '100%',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		color: theme.palette.getContrastText('#1f303d')
	},
	iconos: {
		color: theme.palette.getContrastText('#364049')
	},
	divisor: {
		backgroundColor: theme.palette.getContrastText('#364049')
	},
	textoPerfil: {
		width: '100%',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	}

}));

// const MenuNavegacion = [
// 	{ nombre: 'Inicio', link: '/inicio' },
// 	{ nombre: 'Contactos', link: '/contactos' },
// 	{ nombre: 'Empresas', link: '/empresas' },
// 	{ nombre: 'Agenda', link: '/agenda' },
// 	{ nombre: 'Chat', link: '/chat' },
// 	{ nombre: 'Cobranza', link: '/cobranza' },
// 	{ nombre: 'Caso', link: '/caso' }
// ]


function Cabecera() {
	const [abrirMenu, setAbrirMenu] = React.useState(false)
	const [abrirMenu2, setAbrirMenu2] = React.useState(false)
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [conmutador, setConmutador] = React.useState(null);
	const abrirConfig = Boolean(conmutador)
	const abrir = Boolean(anchorEl);
	const [openDialog, setOpenDialog] = React.useState(false)
	const { authLogin } = React.useContext(LoginContext)
	// const path = window.location.pathname.split('/')[1]
	// const path2 = window.location.pathname.split('/')[2]
	const history = useHistory()
	const { dispatchTheme } = React.useContext(ThemeContext)

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleConfig = event => {
		setConmutador(event.currentTarget)
	}

	const LogOut = () => {
		setAnchorEl(null);
		var palette = { primary: 'indigo', secondary: 'red', type: 'light' }
		dispatchTheme(['cambiarTema', palette])
		history.push('/login')
		localStorage.clear();

	}


	const dialog = () => {
		setOpenDialog(true)
		setConmutador(null);
	}

	// const chatDialog = () => {
	// 	setOpenChatDialog(true)
	// 	setConmutador(null);
	// }

	const cerrar = () => {
		setOpenDialog(false)
	}

	const handleClick = () => {
		setAbrirMenu(!abrirMenu)
	}

	const handleClick2 = () => {
		setAbrirMenu2(!abrirMenu2)
	};

	if (localStorage.getItem('token') === null) { return (<Redirect to='/login' />) }

	return (
		<div className={classes.root}>
			<CssBaseline />
			<TemaDialog abrir={openDialog} funcion={() => cerrar()} />
			<Backdrop open={open} className={classes.back} onClick={() => handleDrawerClose()} />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						{/* {typeof path2 === 'undefined' ? path.charAt(0).toUpperCase() + path.slice(1) : path.charAt(0).toUpperCase() + path.slice(1) + ' > ' + path2.charAt(0).toUpperCase() + path2.slice(1)} */}
					</Typography>
					<>
						<div>
							<IconButton color="inherit">
								<Badge badgeContent={5} color='secondary'>
									<NotificationsNoneOutlinedIcon />
								</Badge>
							</IconButton>
							<IconButton onClick={handleConfig} color="inherit">
								<AddOutlinedIcon />
							</IconButton>
							<Menu id="menu-config" anchorEl={conmutador} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={abrirConfig}
								onClose={() => setConmutador(null)}>
								<MenuItem>Configuraciones</MenuItem>
								<MenuItem onClick={() => dialog()}>Tema</MenuItem>
							</Menu>
							<IconButton onClick={handleMenu} color="inherit">
								<PersonOutlineOutlinedIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={abrir}
								onClose={() => setAnchorEl(null)}>
								<MenuItem>
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar src={authLogin.avatar} alt='...' />
											</ListItemAvatar>
											<ListItemText primary={<div className={classes.textoPerfil}>
												<Typography align='center'>{authLogin.correo}</Typography>
												<Typography align='center'><b>{authLogin.name}</b></Typography>
												<Typography align='center'><em>{authLogin.cargo}</em></Typography>
											</div>} />
										</ListItem>
									</List>
								</MenuItem>
								<Divider />
								<MenuItem>Mi perfil</MenuItem>
								<MenuItem>Mi cuenta</MenuItem>
								<Divider />
								<MenuItem onClick={() => LogOut()}><ExitToAppOutlinedIcon /> Cerrar serión</MenuItem>
							</Menu>
						</div>
					</>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<img alt='...' src={Logo2} className={classes.bigAvatar} />
				</div>
				<div className={classes.contenedorLetras}>
					<Typography variant='body1' align='center'>PETSPA</Typography>
					<Typography variant='body2' align='center'>ERP V1.0</Typography>
				</div>
				<Divider className={classes.divisor} />
				<List>
					<Link to='/inicio' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista} onClick={() => setOpen(!open)}>
							<ListItemText primary="Inicio" />
						</ListItem>
					</Link>
					<Link to='/socio' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista} onClick={() => setOpen(!open)}>
							<ListItemText primary="Socio de negocios" />
						</ListItem>
					</Link>
					<Link to='/mascota' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista} onClick={() => setOpen(!open)}>
							<ListItemText primary="Mascota" />
						</ListItem>
					</Link>
					<Link to='/producto' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista} onClick={() => setOpen(!open)}>
							<ListItemText primary="Productos" />
						</ListItem>
					</Link>
					<Link to='/cita' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Citas" />
						</ListItem>
					</Link>
					<Link to='/orden' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Orden de servicio" />
						</ListItem>
					</Link>
					<Link to='/historiaclinica' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Historia clínica" />
						</ListItem>
					</Link>
					<Link to='/compra' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Compras" />
						</ListItem>
					</Link>
					<Link to='/facturacion' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Facturación" />
						</ListItem>
					</Link>
					<ListItem button onClick={handleClick} className={classes.lista}>
						<ListItemText primary="Finanzas" />
						{abrirMenu ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={abrirMenu} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<Link to='/cuenta' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Cuentas" />
								</ListItem>
							</Link>
							<Link to='/caja_y_bancos' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Caja y bancos" />
								</ListItem>
							</Link>
							<Link to='/movimiento' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Movimientos de cuentas" />
								</ListItem>
							</Link>
							<Link to='/caja' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Caja" />
								</ListItem>
							</Link>
							<Link to='/cronograma' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Cronograma de pagos" />
								</ListItem>
							</Link>
							<Link to='/planilla' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Planilla de cobranza" />
								</ListItem>
							</Link>
						</List>
					</Collapse>
					<ListItem button onClick={handleClick2} className={classes.lista}>
						<ListItemText primary="Inventario" />
						{abrirMenu2 ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={abrirMenu2} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<Link to='/operaciones' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Operaciones" />
								</ListItem>
							</Link>
							<Link to='/almacen' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Almacén" />
								</ListItem>
							</Link>
							<Link to='/comprobante' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Comprobante" />
								</ListItem>
							</Link>
							<Link to='/valorizaciondeinventario' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Valorización de inventario" />
								</ListItem>
							</Link>
							<Link to='/cierremensual' style={{ textDecoration: 'none', color: 'inherit' }}>
								<ListItem button className={classes.nested}>
									<ListItemText primary="Cierre mensual" />
								</ListItem>
							</Link>
						</List>
					</Collapse>
					<Link to='/informes' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Informes" />
						</ListItem>
					</Link>
					<Link to='/acercade' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Acerca de" />
						</ListItem>
					</Link>
					<Link to='/ayuda' style={{ textDecoration: 'none', color: 'inherit' }}>
						<ListItem button className={classes.lista}>
							<ListItemText primary="Ayuda" />
						</ListItem>
					</Link>
					{/* {MenuNavegacion.map((items, index) => (
					<Link to={items.link} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
						<ListItem button key={index} className={classes.lista}>
							<ListItemIcon>{items.nombre === 'Inicio' ? <HomeIcon className={classes.iconos} /> :
								items.nombre === 'Gmail' ? <GoogleIcon className={classes.iconos} /> :
									items.nombre === 'Agenda' ? <EventIcon className={classes.iconos} /> :
										items.nombre === 'Empresas' ? <DomainIcon className={classes.iconos} /> :
											items.nombre === 'Llamadas' ? <PhoneAndroidIcon className={classes.iconos} /> :
												items.nombre === 'Caso' ? <FindInPageOutlinedIcon className={classes.iconos} /> :
													items.nombre === 'Chat' ? <ForumOutlinedIcon className={classes.iconos} /> :
														items.nombre === 'Cobranza' ? <MonetizationOnOutlinedIcon className={classes.iconos} /> :
															items.nombre === 'Contactos' ? <GroupOutlinedIcon className={classes.iconos} /> : ''}</ListItemIcon>
							<ListItemText primary={items.nombre} />
						</ListItem>
					</Link>
				))} */}
				</List>
				<Divider className={classes.divisor} />
			</Drawer>
		</div>
	);
}

export default withRouter(Cabecera);