import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


export  const Notification = (props) => {

    const useBtnStyle = makeStyles({
        button: {
            backgroundColor: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#FFFFFF',
            }
        }
    })

    const  classes = useBtnStyle();

    const {values, notifyFieldName} = props;

    const isNotification = values.melden[notifyFieldName];

    const  JaVariant =  isNotification ? "secondary" : "default";
    const  neeVariant = !isNotification ? "secondary" : "default";


    const handleNotification = () => {
        props.setFieldValue(`melden.${notifyFieldName}`, !values.melden[notifyFieldName])
    }


    return <ButtonGroup>
        <Button color={JaVariant}  className={ `${ !isNotification ? classes.button: ''}`} variant={"contained"} onClick={handleNotification}> JA</Button>
        <Button color={neeVariant}  className={ `${ isNotification ? classes.button: ''}`} variant={"contained"} onClick={handleNotification}> NEE</Button>
    </ButtonGroup>

}
