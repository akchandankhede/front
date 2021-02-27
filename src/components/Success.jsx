import React from 'react';
import {Container, Grid, Link, Typography, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import successImage from '../images/tree-and-house.png';
import {CheckCircleOutline} from "@material-ui/icons";

const redirectUrl = "https://www.denhaag.nl/nl/meldingen/melding-openbare-ruimte.htm";

export  const Success = ({report}) =>{

    const theme = useTheme()

    const styles = makeStyles({
        center: {
            textAlign: 'center',
            padding: '1rem',
            fontWeight: 'medium',
        },
        heading: {
            fontWeight: '600',
            margin: '0.25rem 0',
        },
        message: {
            border: `1px solid ${theme.palette.secondary.light}`,
            padding: '1.5rem 2rem',
            borderRadius: '5px',
            textAlign: 'justify',
        },
        kenmark: {
            marginTop: '0.5rem'
        },
        iconDiv : {
            padding: '0.5rem'
        },
        image: {
            width: '75%',
            margin : "2rem auto",
            textAlign: "center",
            '& img': {
                width: '100%',
                height: 'auto'
            }
        }
    })

    const classes = styles();

    return <Container>
        <Typography variant={'h6'} className={classes.center}>
            Bedankt voor uw bijdrage
        </Typography>

        <div className={classes.message}>
            <Grid container justify={'center'}>
                <Grid item xs={2} className={classes.iconDiv} justify={'start'}>
                    <CheckCircleOutline color={"secondary"}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={'subtitle1'} color={'secondary'} className={classes.heading}>Bedankt voor uw melding. Samen houden we Den Haag schoon!</Typography>
                </Grid>

                <Grid item xs={2} className={classes.iconDiv} justify={'start'}>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={'body2'} color={'secondary'}> Uw melding is succesvol verstuurd naar de gemeente en wordt zo snel mogelijk in behandeling genomen </Typography>
                    <Typography variant={'body2'} color={'secondary'} className={classes.kenmark}> Kenmerk : <strong>{report.kenmark}</strong> </Typography>
                </Grid>

            </Grid>
        </div>

        <div className={classes.image}>
            <img src={successImage} alt={"Success Image - Denhaag"}/>
        </div>

        <div>
            <Typography color={"textSecondary"} variant={'body1'}>
                Meer informatie over de openbare ruimte en meldingen op <Link color={'tertiary'} href={redirectUrl} target={"_blank"}>denhaag.nl</Link>
            </Typography>
        </div>

    </Container>
}