import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {TextField, RadioGroup, Radio} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonalInformation from './PersonalInformation';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import {TopNav} from "../TopNav";
import {Image} from "../Image";
import {Notification} from "./Notification";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const fractionsList = ['Restafval',
    'GFT',
    'Papier',
    'Glas',
    'Textiel',
    'PMD',
    'Brood'];


const containerTypeList = [
    'Minicontainer',
    'ORAC',
    'Laadkist'
]

function PaymentForm(props) {

    const theme = useTheme();
    const useStyles = makeStyles((theme) => ({
        locationDiv: {
            padding: '1rem',
            borderRadius: '0.2rem',
        },
        description: {
            width: "100%",
        },
        button: {
            backgroundColor: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#FFFFFF',
            }
        },
        radio: {
            '&$checked': {
                color: '#50A15A'
            }
        },

        address: {
            marginLeft: theme.spacing(1),
        },

        bold: {
            fontSize: "90%",
            fontWeight: "600",
        },
        checked: {},
        radioLabel: {
            fontSize: "0.8rem"
        }
    }));


    const classes = useStyles();


    const {values} = props;
    const {plek} = values;

    const {address: {huisnummer, huisletter, streetname, postcode, woonplaats}} = plek;

    const address = () => <Typography className={classes.bold} variant={"subtitle1"}>
        <div>{huisnummer} {huisletter} {streetname}</div>
        <div>{postcode} {woonplaats}</div>
    </Typography>;

    return (
        <React.Fragment>
            <TopNav handleBack={props.handleBack}/>
            <Grid container spacing={3}>
                {/* address */}
                <Grid item xs={12} md={12}>
                    <Grid container className={classes.locationDiv} alignItems={'center'}>
                        <LocationOnIcon color={'primary'}/>

                        <div className={classes.address}>
                            <Typography variant="overline">
                                GEKOZEN PLEK
                            </Typography>
                            {address()}
                        </div>

                    </Grid>
                </Grid>

                {/* description */}

                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Wat wilt u melden?
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField
                        required
                        name='melden.description'
                        id="description"
                        label="Beschrijf uw melding zo duidelijk mogelijk"
                        multiline
                        rows={7}
                        rowsMax={12}
                        maxLength={500}
                        className={classes.description}
                        variant="outlined"
                        value={props.values.melden.description}
                        onFocus={() => props.setFieldTouched('melden.description', true)}
                        onChange={props.handleChange}
                        helperText={
                            props.touched?.melden?.description && props.errors?.melden?.description &&
                            <Typography variant={"caption"}
                                        color={"error"}>{props?.errors.melden.description}</Typography>
                        }
                    />
                </Grid>


                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Gaat uw melding over een afval container?
                    </Typography>
                    <Notification notifyFieldName={'containerAdopt'} {...props}/>
                </Grid>

                {props.values.melden.containerAdopt && <>

                    <Grid item xs={12} md={12}>
                        <Typography variant="subtitle2">
                        </Typography>
                        <strong>Om wat voor container gaat uw melding?*</strong>
                        <RadioGroup name={'melden.containerType'} value={props.values.melden.containerType}
                                    onChange={props.handleChange}>
                            {containerTypeList.map(ct => <FormControlLabel className={classes.radioLabel} value={ct}
                                                                           control={<Radio/>} label={<span
                                className={classes.radioLabel}>{ct}</span>}/>)}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Typography variant="subtitle2">
                            <strong> Wat voor soort afval is het?*</strong>
                        </Typography>
                        <RadioGroup name={'melden.fraction'} value={props.values.melden.fraction}
                                    onChange={props.handleChange}>
                            {fractionsList.map(f => <FormControlLabel value={f} control={<Radio/>} label={<span
                                className={classes.radioLabel}>{f}</span>}/>)}
                        </RadioGroup>
                    </Grid>

                </>
                }


                {/* photo upload */}
                <Image {...props}/>
                {/* identity radio button */}


                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Wilt u op de hoogte blijven van uw melding?
                    </Typography>
                    <Notification notifyFieldName={'notification'} {...props}/>
                </Grid>

                {/* Personal Information */}
                {props.values.melden.notification && (
                    <Grid item xs={12} md={12}>
                        <PersonalInformation  {...props}/>
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    );
}

export default PaymentForm;
