import React from 'react';
import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    Box,
    List,
    ListItem,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Button,
    Grid
} from '@material-ui/core';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
import CitaContext from './citaContext';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

function formatDateFinal(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

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

function CitaDialog({ abrir, funcion }) {
    const classes = useStyles()
    const { cita, dispatchCita } = React.useContext(CitaContext)
    const [citas, setCitas] = React.useState({ fechacita: new Date(), horacita: cita.informacion.horacita })
    const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(citas.fechacita);
    const hora1 = [
        { hora: '08:00 - 09:00' },
        { hora: '10:00 - 11:00' },
        { hora: '14:00 - 15:00' },
    ]

    const hora2 = [
        { hora: '10:00 - 11:00' },
        { hora: '12:00 - 13:00' },
        { hora: '13:00 - 14:00' },
        { hora: '15:00 - 16:00' }
    ]

    const hora3 = [
        { hora: '08:00 - 09:00' },
        { hora: '10:00 - 11:00' },
        { hora: '12:00 - 13:00' },
        { hora: '14:00 - 15:00' },
        { hora: '16:00 - 17:00' },
    ]

    const handleFechaFiltro = date => {
        setSelectedDateFiltro(date);
        setCitas({
            ...citas,
            fechacita: formatDateFinal(date)
        })
    }

    const onChange = (e) => {
        setCitas({
            ...citas,
            [e.target.name]: e.target.value
        })
    }

    const reprogramar = () => {
        dispatchCita(['reprogramar', citas])
        funcion()
    }


    return (
        <Dialog open={abrir} onClose={funcion}>
            <DialogTitle disableTypography><Typography variant="h6">Reprogramar Cita</Typography></DialogTitle>
            <DialogContent>
                <List disablePadding>
                    <ListItem>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    fullWidth
                                    margin='normal'
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    id="date-picker-inline"
                                    label="Fecha de cita"
                                    value={selectedDateFiltro}
                                    onChange={handleFechaFiltro}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </ListItem>
                    <ListItem>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="horacita">Horas disponibles</InputLabel>
                            <Select value={citas.horacita || ''} onChange={onChange} name='horacita' fullWidth>
                                {citas.fechacita === '09/03/2020' ?
                                    hora1.map((hora, index) => (
                                        <MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
                                    ))
                                    : citas.fechacita === '10/03/2020' ?
                                        hora2.map((hora, index) => (
                                            <MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
                                        )) : citas.fechacita === '11/03/2020' ?
                                            hora3.map((hora, index) => (
                                                <MenuItem key={index} value={hora.hora}>{hora.hora}</MenuItem>
                                            )) :
                                            <MenuItem value='no disponible'>No hay horas disponibles</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </ListItem>
                    <Box mt={2} mb={1}>
                        <Divider light />
                    </Box>

                    <ListItem className={classes.buttons}>
                        <Button color="secondary" variant="contained" className={classes.button} onClick={() => reprogramar()}>Aceptar</Button>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default CitaDialog;
