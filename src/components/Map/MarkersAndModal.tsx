import Loading from "../Loading/Loading";
import {makeStyles} from "@material-ui/core/styles";
import ramenIcon from "../../static/ramen.svg";
import {useState} from "react";
import CustomMarker from "./CustomMarker";
import CustomPopup from "./CustomPopup";


const useStyles = makeStyles( () => ({
    loading: {
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "15px",
        top:"50%"
    },
    error: {
        backgroundColor: "rgba(255,255,255,0.7)",
        padding: "15px"
    },
    elements: {
        zIndex:0
    },
    marker: {
        backgroundImage: `url(${ramenIcon})`,
        backgroundSize: "cover",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex:0
    },
}))
type Store = {
    _id: string,
    name: string,
    city: string,
    descriptionText: string,
    imageSmall: string[],
    location: {
        type: string,
        coordinates: number[],
        formattedAddress: string
    },
    rating: number,
    reviewsCount: number,
};

type Props = {
    status?:string,
    error?:Error,
    stores?: Store[],
}

const MarkersAndModal = (props:Props) => {
    const stores = props?.stores;
    const error = props?.error;
    const status = props?.status;
    const classes = useStyles();
    const [index, setIndex] = useState<number | null>(null);
    const openPopup = (index: number) => {
        setIndex(index)
    }
    const closePopup = () => {
        setIndex(null)
    }

    if (status === "loading") {
        return <div className={classes.error}>
            <Loading />
        </div>;
    }

    if (status === "error") {
        return <div className={classes.error}>
            {error?.message}
        </div>;
    }
    return (
        <div className={classes.elements}>
            {stores && stores.map((store, index) => {
                return(
                    <CustomMarker
                        key={`marker-${index}`}
                        index={index}
                        store={store}
                        openPopup={openPopup}
                    />
                )
            })
            }
            {
                index !== null && stores &&
                <CustomPopup
                    index={index}
                    store={stores[index]}
                    closePopup={closePopup}
                />
            }
        </div>
    );
};

export default MarkersAndModal;
