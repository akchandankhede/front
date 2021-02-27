import React from 'react';
import Button from "@material-ui/core/Button";
import {steps} from "./Checkout";


export const ActionBar = ({classes, handleBack, activeStep, step, handleNext, formProps}) => {

    const isNextDisabled = (props) => {
        if (step === 'plek') {
            return !Boolean(props.values.plek.address.openbare_ruimte) || Boolean(props.errors.plek)
        }
        if (step === 'melden') {
            return !props.isValid;
        }
    }


    return <>

        {activeStep < (steps.length - 2) && (
            <div className={classes.buttons}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleNext}
                    disabled={isNextDisabled(formProps)}
                >
                    NIEUWE MELDING
                </Button>
            </div>
        )}
        {activeStep === (steps.length - 2) && (
            <div className={classes.center}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.flat}
                    onClick={formProps.handleSubmit}
                    disabled={isNextDisabled(formProps)}
                >
                    Melding Versturen
                </Button>
            </div>
        )}
    </>
}
