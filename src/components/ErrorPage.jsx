import {Container, Typography, useTheme} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";




export const ErrorPage = () => {
    const theme = useTheme()

    const styles = makeStyles({
        center: {
            textAlign: 'center',
        },
        container:{
            border: `1px solid ${theme.palette.error}`,
            borderRadius: '5px',
            padding: '1rem'
        }
    })

    const  classes = styles();
    return <Container className={classes.container}>
        <Typography variant={'h6'} className={classes.center} color={'error'}>Kan rapport niet maken.</Typography>
        <Typography variant={'body2'} color={'error'} className={classes.center}>Neem contact op met ondersteuning.</Typography>
    </Container>
}