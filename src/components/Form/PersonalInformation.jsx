import React, {Fragment} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Typography} from "@material-ui/core";


const PersonalInformation = (props) => {
    return (

        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        name='melden.name'
                        id="name"
                        label={'Uw naam'}
                        variant='outlined'
                        placeholder="Jan de Vries"
                        maxLength={50}
                        autoComplete='off'
                        defaultValue={props.values.melden.name}
                        onChange={props.handleChange}
                        helperText={
                            props.errors?.melden?.name &&
                            <Typography variant={"caption"} color={"error"}>{props?.errors.melden.name}</Typography>
                        }
                    />
                </Grid>


                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        name='melden.phone'
                        id="phone"
                        label={'Uw telefoonnummer'}
                        placeholder="0612345678"
                        variant='outlined'
                        autoComplete='off'
                        defaultValue={props.values.melden.phone}
                        onChange={props.handleChange}
                        helperText={
                            props.errors?.melden?.phone &&
                            <Typography variant={"caption"} color={"error"}>{props?.errors.melden.phone}</Typography>
                        }
                    />
                </Grid>

                {/* email */}
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        name='melden.email'
                        id="email"
                        label={'Uw e-mailadres'}
                        placeholder="jandevries@email.nl"
                        variant='outlined'
                        autoComplete='off'
                        required={props.values.melden.notification}
                        defaultValue={props.values.melden.email}
                        onChange={props.handleChange}
                        helperText={
                            props.errors?.melden?.email &&
                            <Typography variant={"caption"} color={"error"}>{props?.errors.melden.email}</Typography>
                        }
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default PersonalInformation
