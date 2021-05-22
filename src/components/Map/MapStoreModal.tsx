import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {IStore} from "../../types/IStore";
import StoreCard from "../StoreCard/StoreCard";

const useStyles = makeStyles(() => ({
    storeModal: {
        margin: 16,
        marginTop:0,
        position: "absolute",
        zIndex: 500,
        justifyContent: "left"
    },
    modalRoot: {
        padding: '2px 4px',
        width: "25vw",
        maxWidth: 350,
    },
    closeButton: {
        padding:5,
        margin:20,
        float:"right",
        zIndex: 600,
        backgroundColor: "rgba(255,255,255,1.0)",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.7)",
        }
    },
}))

type Props = {
    store: IStore,
    closePopup: () => void
}
const MapStoreModal = (props:Props) => {
    const store = props.store;
    const closePopup = props.closePopup;
    const classes = useStyles();

    return (
        <div className={classes.storeModal}>
            <Paper className={classes.modalRoot}>
                <IconButton className={classes.closeButton} onClick={closePopup}>
                    <CloseIcon/>
                </IconButton>
                <StoreCard store={store} />
            </Paper>
        </div>
    );
};

export default MapStoreModal;
