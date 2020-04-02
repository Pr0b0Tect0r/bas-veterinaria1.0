import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Typography, Divider, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import Logo2 from '../../assets/images/Logo5.svg';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			display: 'none'
		}
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#364049',
	},
	drawerHeader: {
		backgroundColor: '#1f303d',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	title: {
		flexGrow: 1,
	},
	bigAvatar: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 120,
		height: 'auto'
	},
	lista: {
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
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
	nested: {
		paddingLeft: theme.spacing(4),
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	}
}));

function Menu() {
	const [abrirMenu, setAbrirMenu] = React.useState(false)
	const [abrirMenu2, setAbrirMenu2] = React.useState(false)
	// const [abrir, setAbrir] = React.useState({});
	// const MenuNavegacion = [
	// 	{ nombre: 'Inicio', link: '/inicio' },
	// 	{ nombre: 'Contactos', link: '/contactos' },
	// 	{ nombre: 'Empresas', link: '/empresas' },
	// 	{ nombre: 'Agenda', link: '/agenda' },
	// 	{ nombre: 'Chat', link: '/chat' },
	// 	{ nombre: 'Cobranza', link: '/cobranza' },
	// 	{ nombre: 'Caso', link: '/caso' }
	// ]
	// const array = [
	// 	{
	// 		id: 1,
	// 		title: "Socio de negocios",
	// 		link: '/socio'
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Mascota",
	// 		link: '/mascota'
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Productos",
	// 		link: '/producto'
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Orden de servicio",
	// 		link: '/orden'
	// 	},
	// 	{
	// 		id: 5,
	// 		title: "Historia clinica",
	// 		link: '/historia'
	// 	},
	// 	{
	// 		id: 6,
	// 		title: "Compras",
	// 		link: '/compra'
	// 	},
	// 	{
	// 		id: 7,
	// 		title: "Facturación",
	// 		link: '/facturacion'
	// 	},
	// 	{
	// 		id: 8,
	// 		title: "Finanzas",
	// 		children: [
	// 			{
	// 				id: 1,
	// 				title: "Cuentas"
	// 			},
	// 			{
	// 				id: 2,
	// 				title: "Caja y banco"
	// 			},
	// 			{
	// 				id: 3,
	// 				title: "Movimiento de cuentas"
	// 			},
	// 			{
	// 				id: 3,
	// 				title: "Caja"
	// 			},
	// 			{
	// 				id: 4,
	// 				title: "Cronograma de pagos"
	// 			},
	// 			{
	// 				id: 5,
	// 				title: "Planilla de cobranzas"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 9,
	// 		title: "Inventario",
	// 		children: [
	// 			{
	// 				id: 1,
	// 				title: "Operaciones"
	// 			},
	// 			{
	// 				id: 2,
	// 				title: "Almacén"
	// 			},
	// 			{
	// 				id: 3,
	// 				title: "Comprobante"
	// 			},
	// 			{
	// 				id: 4,
	// 				title: "Valoración de inventario"
	// 			},
	// 			{
	// 				id: 5,
	// 				title: "Cierre mensual"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: 10,
	// 		title: "Informes",
	// 		link: '/informe'
	// 	},
	// 	{
	// 		id: 11,
	// 		title: "Acerca de",
	// 		link: '/acerca'
	// 	},
	// 	{
	// 		id: 12,
	// 		title: "Ayuda",
	// 		link: '/ayuda'
	// 	}
	// ];
	const classes = useStyles()

	const handleClick = () => {
		setAbrirMenu(!abrirMenu)
	}

	const handleClick2 = () => {
		setAbrirMenu2(!abrirMenu2)
	};

	// const handleClick3 = (nombre) => {
	// 	setAbrir({ [nombre]: !abrir[nombre] });
	// };

	// const recursiva = () => {
	// 	if (datos) {
	// 		return datos.map((item) =>
	// 			item.children ? (
	// 				<>
	// 					<ListItem key={item.id} button onClick={() => handleClick3(item.title)} className={classes.lista}>
	// 						<ListItemText primary={item.title} key={item.title} />
	// 						{abrir[item.title] ? <ExpandMore /> : <ExpandLess />}
	// 					</ListItem>
	// 					<Collapse
	// 						in={abrir[item.title]}
	// 						timeout="auto"
	// 						unmountOnExit
	// 					>
	// 						<List component="div" disablePadding>
	// 							{item.children.map((submenu) => (
	// 								<ListItem button key={submenu.id} className={classes.nested}>
	// 									<ListItemText primary={submenu.title} key={submenu.title} />
	// 								</ListItem>
	// 							))}
	// 						</List>
	// 					</Collapse>
	// 				</>
	// 			) : (<>
	// 				<ListItem key={item.id} button className={classes.lista}>
	// 					<ListItemText primary={item.title} key={item.title} />
	// 				</ListItem>
	// 			</>
	// 				)
	// 		);
	// 	}
	// };

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={true}
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
				{/* <Link to='/inicio' style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button className={classes.lista}>
						<ListItemText primary="Inicio" />
					</ListItem>
				</Link>
				{array.map((item, index) =>
					item.children ?
						<>
							<ListItem key={index} button onClick={() => handleClick3(item.link, item.title)} className={classes.lista}>
								<ListItemText primary={item.title} />
								{abrir[item.title] ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse
								in={abrir[item.title]}
								timeout="auto"
								unmountOnExit
							>
								<List component="div" disablePadding>
									{item.children.map((submenu, i) => (
										<ListItem button key={i} className={classes.nested}>
											<ListItemText primary={submenu.title} />
										</ListItem>
									))}
								</List>
							</Collapse>
						</>
						:
						<Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem key={index} button className={classes.lista} onClick={() => handleClick3(item.link, item.title)}>
								<ListItemText primary={item.title} />
							</ListItem>
						</Link>
				)} */}
				<Link to='/inicio' style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button className={classes.lista}>
						<ListItemText primary="Inicio" />
					</ListItem>
				</Link>
				<Link to='/socio' style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button className={classes.lista}>
						<ListItemText primary="Socio de negocios" />
					</ListItem>
				</Link>
				<Link to='/mascota' style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button className={classes.lista}>
						<ListItemText primary="Mascota" />
					</ListItem>
				</Link>
				<Link to='/producto' style={{ textDecoration: 'none', color: 'inherit' }}>
					<ListItem button className={classes.lista}>
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
						<Link to='/tipomovimiento' style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem button className={classes.nested}>
								<ListItemText primary="Tipo de movimiento" />
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
						<Link to='/valor' style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem button className={classes.nested}>
								<ListItemText primary="Valorización de inventario" />
							</ListItem>
						</Link>
						<Link to='/cierre' style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem button className={classes.nested}>
								<ListItemText primary="Cierre mensual" />
							</ListItem>
						</Link>
						<Link to='/kardex' style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem button className={classes.nested}>
								<ListItemText primary="Kardex" />
							</ListItem>
						</Link>
						<Link to='/inventario' style={{ textDecoration: 'none', color: 'inherit' }}>
							<ListItem button className={classes.nested}>
								<ListItemText primary="Inventario" />
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
			</List>
			<Divider className={classes.divisor} />
		</Drawer>
	);
}

export default withRouter(Menu);