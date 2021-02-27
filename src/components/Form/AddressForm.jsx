import React from 'react';
import Grid from '@material-ui/core/Grid';

import {WebMapView} from '../MapView';
import {getStadsdeel} from "../../api";

const AddressForm = (props) => {
    const onChange = (location) => {

        console.log(location);
        props.setValues({...props.values, plek: location})
    }


    const getInitialLocation = () => {
        return !Boolean(props.values.plek.address.openbare_ruimte) ? undefined : props.values.plek
    }


    const {address: {huisnummer, huisletter, streetname, openbare_ruimte, postcode, woonplaats}} = props.values.plek;


    const add = `${huisnummer} ${huisletter} ${streetname}`;
    const add2 = `${postcode} ${woonplaats}`;

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <WebMapView getStadsdeel={getStadsdeel} initialLocation={getInitialLocation()} onChange={onChange}/>
                </Grid>
                <Grid item>
                    {Boolean(openbare_ruimte) &&
                    <>
                        <div className={"custom-map-address"}>{add}</div>
                        <div className={"custom-map-details"}>
                            {add2}
                        </div>
                    </>
                    }
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default AddressForm;
