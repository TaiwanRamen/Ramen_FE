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
    index:number,
    store:Store,
    openPopup: Function,
    flyTo: Function
}

const CustomMarker = (props: Props) => {
    const store = props.store;
    const index = props.index;
    const openPopup = props.openPopup;
    const flyTo = props.flyTo;
    const lng = store?.location?.coordinates[0];
    const lat = store?.location?.coordinates[1];
    const classes = useStyles();

    const handleMarkerClick = () => {
        flyTo(lng, lat);
        openPopup(index);

    }
    return (
        <Marker
            longitude={lng}
            latitude={lat}>
            <div className={classes.marker} onClick={handleMarkerClick}>
            </div>
        </Marker>
    )
};

export default CustomMarker;
