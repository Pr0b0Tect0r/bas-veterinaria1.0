import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8)
    }
}));

export default function InfoAcercade() {
    const classes = useStyles()


    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Typography variant='body1'>
                        <div align='center'><h3>PETSPA ERP V1.0</h3></div>
                        <br />
                        <div align='justify'>Un agujero negro​ es una región finita del espacio en cuyo interior existe una concentración de masa lo suficientemente elevada y densa como para generar un campo gravitatorio tal que ninguna partícula material, ni siquiera la luz, puede escapar de ella. Sin embargo, los agujeros negros pueden ser capaces de emitir un tipo de radiación, la radiación de Hawking, conjeturada por Stephen Hawking en la década de 1970. La radiación emitida por agujeros negros como Cygnus X-1 no procede del propio agujero negro sino de su disco de acreción.</div>
                        <br />
                        <div align='justify'>La gravedad de un agujero negro, o «curvatura del espacio-tiempo», provoca una singularidad envuelta por una superficie cerrada, llamada horizonte de sucesos. Esto es previsto por las ecuaciones del campo de Einstein. El horizonte de sucesos separa la región del agujero negro del resto del universo, y a partir de él ninguna partícula puede salir, incluyendo los fotones. Dicha curvatura es estudiada por la relatividad general, la que predijo la existencia de los agujeros negros y fue su primer indicio. En la década de 1970, Stephen Hawking, Ellis y Penrose demostraron varios teoremas importantes sobre la ocurrencia y geometría de los agujeros negros. Previamente, en 1963, Roy Kerr había demostrado que en un espacio-tiempo de cuatro dimensiones todos los agujeros negros debían tener una geometría cuasiesférica determinada por tres parámetros: su masa M, su carga eléctrica total e y su momento angular.</div>
                    </Typography>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </React.Fragment>
    );
}