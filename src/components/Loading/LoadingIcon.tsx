import loadingSpinner from "../../static/Spinner-1s-200px.svg";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
       spinner:{
           margin: "auto",
           height: "2.5rem",
           width: "2.5rem"
       },
        // loadingMessage: {
        //     textAlign: "center",
        //     float: "none",
        //     color: "#787878",
        //     fontFamily: "JFOpen",
        //     fontSize: 20
        // }
    })
)

const LoadingIcon = () => {
    const classes = useStyles();
    return (
        <img className={classes.spinner} src={loadingSpinner}  />
    );
};

export default LoadingIcon;
