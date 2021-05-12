import {makeStyles} from "@material-ui/core/styles";

const useStyles = () => makeStyles( () => ({
    modal:{
        width:500,
        textAlign:"center"
    }
}))

const MapModal = () => {
    const classes = useStyles()();
    return (
        <div className={classes.modal}>
            You are here
        </div>
    );
};

export default MapModal;
