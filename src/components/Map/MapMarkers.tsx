// import useFetch from "../../customHooks/UseFetch";
// import Loading from "../Loading/Loading";
import {Marker} from "react-map-gl";
import {makeStyles} from "@material-ui/core/styles";
import ramenIcon from "../../static/ramen.svg";

const useStyles = makeStyles( () => ({
    marker: {
        backgroundImage: `url(${ramenIcon})`,
        backgroundSize: "cover",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        cursor: "pointer",
    },
}))

type Stores = {
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
    stores?: Stores[],
}

const MapMarkers = (props:Props) => {
    const stores = props.stores;
    const classes = useStyles();

    return <>
        {   stores && stores.map(store =>
            <Marker longitude={store?.location?.coordinates[0]} latitude={store?.location?.coordinates[1]} key={store?._id}>
                <div className={classes.marker} onClick={() => alert(1)}/>
            </Marker>)
        }
    </>

}

export default MapMarkers;