import React, {useState} from 'react';
import PropTypes from "prop-types";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import clsx from "clsx";
import StepConnector from "@material-ui/core/StepConnector";
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Card from '@material-ui/core/Card';
import logo from '../images/Den-haag-Comact.png';
import {Form} from "./Form/Form";
import {createSignal} from "../api";
import {Success} from "./Success";
import {ErrorPage} from "./ErrorPage";
import * as yup from "yup";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.denhaag.nl/" target={"_blank"}>
                Gemeente Den Haag
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

export const steps = ['plek', 'melden', 'overzicht'];
export const stepsLabel = ['Locatie', 'Melden', 'Bevestiging'];

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: "3rem",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    flat: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    media: {
        width: '60px',
        height: 'auto',
        margin: '0 auto',
    },

    card: {
        width: '100%',
        height: 'auto',
        margin: 'auto',
        boxShadow: 'none',
        textAlign: 'center'
    },
    stepperRoot: {
        paddingTop: '30px !important',
        paddingLeft: '10px !important',
        paddingRight: '10px !important',
        paddingBottom: '30px !important',
    }
}));

//stepper

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        fontWeight: "600",
        "& $line": {
            backgroundColor:
                "linear-gradient( 136deg, rgb(21, 84, 41) 0%,rgb(34, 123, 60) 50%,rgb(80, 161, 90) 100%)"
        }
    },
    completed: {
        fontWeight: "normal",
        "& $line": {
            backgroundImage: "linear-gradient( 136deg, rgb(21, 84, 41) 0%,rgb(34, 123, 60) 50%,rgb(80, 161, 90) 100%)"
        }
    },
    line: {
        height: 1,
        border: 0,
        backgroundColor: "#C4C4C4",
        borderRadius: 1
    }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#C4C4C4",
        zIndex: 1,
        color: "#fff",
        width: 20,
        height: 20,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundColor: "#227B3C",
    },
    completed: {
        backgroundColor: "#50A15A"
    }
});


function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;
    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {props.icon}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
};

function Checkout() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [report, setReport] = useState(null);

    const useLabelStyle = makeStyles({
        active: {
            fontWeight: "600"
        },
    });

    const styles = useLabelStyle();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const generateLabel = (label, index) => {
        return <span
            className={index === activeStep ? styles.active : ''}>{label}</span>;
    }

    const handleSubmit = (values, action) => {

        handleNext();

        const {
            melden: {description, email, image, name, phone, containerAdopt, fraction, containerType},
            plek: {stadsdeel, geometrie, address}
        } = values;

        const payload = {
            text: description,
            address: stadsdeel ? JSON.stringify({
                ...address,
                stadsdeel
            }) : JSON.stringify(address),
            coordinates: JSON.stringify(geometrie.coordinates),
            email,
            images: image,
            name,
            phone,
            containerAdopt,
            fraction,
            containerType,
        }


        createSignal(payload).then(res => {
            setReport({...res.data, error: false})
            setSuccess(true)
        }).catch(err => {
            setError(true);
            setReport({error: true})
        })
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
                        <img className={classes.media} src={logo} alt={'Den Haag Webform'}/>
                    </Card>

                    {
                        report ? success ? <Success report={report}/> : <ErrorPage/> :
                            (<>
                                <Stepper
                                    activeStep={activeStep}
                                    connector={<ColorlibConnector/>}
                                    className={classes.stepperRoot}
                                >
                                    {stepsLabel.map((label, index) => (
                                        <Step orientation={'horizontal'} key={label}>
                                            <StepLabel
                                                StepIconComponent={ColorlibStepIcon}>{generateLabel(label, index)}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <React.Fragment>
                                    <Form classes={classes} handleSubmit={handleSubmit} activeStep={activeStep}
                                          step={steps[activeStep]}
                                          handleBack={handleBack} handleNext={handleNext}/>

                                </React.Fragment>
                            </>)
                    }
                </Paper>
                {/*<Copyright/>*/}
            </main>
        </React.Fragment>
    );
}

export default Checkout;
