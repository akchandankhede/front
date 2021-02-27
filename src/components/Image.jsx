import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {base64Sync} from 'base64-img';
import {AddAPhoto, Camera, CameraFront, CloseSharp} from "@material-ui/icons";
import {theme} from "npm/docs/src/theme";

export const Image = (props) => {

    const styles = makeStyles({
        styledImage: {
            position: 'relative',
            width: '120px',
            height: '120px',
            border: '1px solid #666',
            margin: '0 0.25rem',

            '& img': {
                width: '100%',
                height: '100%'
            }

        },
        removeBtn: {
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '20px',
            height: '20px',
            zIndex: '2'
        },
        button: {
            backgroundColor: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#FFFFFF',
            }
        }, marginTop: {
            marginTop: "0.5rem"
        }
    });

    const classes = styles();

    const disabledImageSelection = props.values.melden.image.length >= 3;

    const imageChange = (e) => {
        if (disabledImageSelection) return;

        const reader = new FileReader();
        const f = e.target.files[0];
        reader.onload = function (upload) {
            const img = upload.target.result
            if (!props.values.melden.image.includes(img)) {
                props.setValues({
                    ...props.values,
                    melden: {...props.values.melden, image: [...props.values.melden.image, img]}
                })
            }
        }
        reader.readAsDataURL(f);

    }
    const onInputClick = (event) => {
        event.target.value = ''
    }

    const imageRemove = (index) => {

        let images = Array.from(props.values.melden.image);
        images = images.filter((img => images.indexOf(img) !== index))
        props.setValues({...props.values, melden: {...props.values.melden, image: images}})

    }

    return (
        <>
            <Grid item>
                <Grid container>
                    {props.values.melden.image.map((image, key) =>
                        <Grid item key={`img${key}`} className={classes.styledImage}>
                            <CloseSharp onClick={() => imageRemove(key)} className={classes.removeBtn}/>
                            <img src={image} alt={`image-${key}`}/>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    value={undefined}
                    onClick={onInputClick}
                    // defaultValue={props.values.melden.image}
                    onChange={imageChange}
                    disabled={disabledImageSelection}
                />
                <label htmlFor="raised-button-file">
                    <Button
                        variant="contained"
                        color={'default'}
                        className={classes.button}
                        component="span"
                        disabled={props.values.melden.image?.length >= 3}
                        startIcon={<AddAPhoto/>}
                    >
                        FOTO TOEVOEGEN
                    </Button>
                </label>
                {props.values.melden.image?.length === 0 &&
                <div className={classes.marginTop}><Typography variant={"caption"}>Niet verplicht</Typography></div>}
                {props.values.melden.image?.length >= 3 &&
                <div className={classes.marginTop}><Typography variant={"caption"} color={"error"}>Er kunnen maximaal 3 afbeeldingen worden geüpload.</Typography></div>}
            </Grid>
        </>
    )
}
