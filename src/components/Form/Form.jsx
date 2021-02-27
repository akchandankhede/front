import React from 'react';
import {Formik} from 'formik';
import {formSchema} from "./formSchema";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import {ActionBar} from "../ActionBar";

const initialValues = {
    plek: {
        address: {openbare_ruimte: '', huisnummer: '', postcode: '', woonplaats: ''},
        geometrie: {type: '', coordinates: [0, 0]},
        stadsdeel: ''
    },
    melden: {
        image: [],
        description: "",
        name: "",
        email: "",
        phone: "",
        date: new Date(),
        notification: false,
        containerAdopt: false,
        fraction: '',
        containerType: ''
    },
    overzicht: {
        id: null
    }
}

export const Form = ({step, classes, activeStep, handleBack, handleNext, handleSubmit}) => {

    const renderForm = (props) => {
        if (step === 'plek') {
            return <AddressForm {...props} />
        }
        if (step === 'melden') {
            return <PaymentForm {...props} handleBack={handleBack}/>
        }
    }

    const renderActionBar = (props) => {
        return <ActionBar classes={classes} activeStep={activeStep} step={step} formProps={props}
                          handleBack={handleBack} handleNext={handleNext}/>
    }

    const renderView = (props) => {
        return <>
            {renderForm(props)}
            {renderActionBar(props)}
        </>
    }

    return (
        <Formik onSubmit={handleSubmit} validateOnBlur={true} initialValues={initialValues}
                validationSchema={formSchema} render={renderView}>
        </Formik>
    )

}
