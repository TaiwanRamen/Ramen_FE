import SearchBar from "../SearchBar/SearchBar";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../customHooks/UseFetch";
import MarkersAndModal from "./MarkersAndModal";

const useStyles = makeStyles( () => ({
    mapComponent: {
      position:"relative"
    },
    reSearchBtn: {
        backgroundColor:"white",
        color:"#4e8fff",
        position:"relative",
        top: "40px",
        width:"200px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex:1400,
        "&:hover":{
            backgroundColor:"#f8f8f8",
        }
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

type MapBound = {
    N: number, S: number,
    E: number, W: number,
}

type Props = {
    mapBound?: MapBound
}

const MapContent = (props:Props) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const mapBound = props.mapBound!;

    const options = {
        enabled: !!mapBound,
        key:"mapStores",
        url: process.env.REACT_APP_URL + "/api/v1/map/get-store",
        queryParams: {...mapBound, search: searchInput}
    }

    const { data:stores, status, error } = useFetch<Store[]>(options);


    return (
        <div className={classes.mapComponent}>
            <SearchBar setSearchInput={setSearchInput}/>
            <MarkersAndModal stores={stores} status={status} error={error!}/>
        </div>
    );
};

export default MapContent;
