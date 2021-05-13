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
    openPopup: Function
}

const CustomMarker = (props: Props) => {
    const store = props.store;
    const index = props.index;
    const openPopup = props.openPopup;

    const classes = useStyles();
    return (
        <Marker
            longitude={store?.location?.coordinates[0]}
            latitude={store?.location?.coordinates[1]}>
            <div className={classes.marker} onClick={() => openPopup(index)}>
            </div>
        </Marker>
    )
};

export default CustomMarker;
