import React from 'react';
import './Loading.css';
import LoadingSpinner from "./LoadingSpinner";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    spinner: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: 60,
        width: 60,
    },
    loadingMessage: {
        textAlign: "center",
        float: "none",
        color: "#787878",
        fontFamily: "JFOpen",
        fontSize: 20,
    },
}))


const Loading = () => {
    const classes = useStyles();
    return (
        <div className=" loading">
            <LoadingSpinner className={classes.spinner}/>
            <p className={classes.loadingMessage}>載入中，請稍等</p>
        </div>
    );
};

export default Loading;
