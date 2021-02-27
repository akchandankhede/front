import React from 'react';
import {Button, Container, Grid, IconButton, Typography, useTheme} from "@material-ui/core";
import {ArrowBack, CloseSharp} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

export const TopNav = ({handleBack}) => {

    const theme = useTheme();

    const styles = makeStyles({
        topBar: {
            backgroundColor: `${theme.palette.primary.main}`,
            padding: '0.5rem 0.5rem',
            color: `${theme.palette.common.white}`,
            marginBottom: '0.25rem'
        },
        backButton: {
            cursor : 'pointer',
        },
        text: {
            marginLeft: theme.spacing(2)
        }
    })

    const classes = styles();


    return (<Grid container alignItems={'center'} justify={'space-between'} className={classes.topBar}>
        <Grid item>
            <Grid container>
                <IconButton size={'small'} color={'inherit'} onClick={handleBack}><ArrowBack className={classes.backButton} color={'inherit'}/></IconButton>
                <Typography variant={'subtitle1'} className={classes.text}> Nieuwe melding</Typography>
            </Grid>
        </Grid>
        <CloseSharp color={'inherit'}/>
    </Grid>)
}