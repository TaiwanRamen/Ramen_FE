import SearchBar from "../SearchBar/SearchBar";
import Button from "@material-ui/core/Button";
import MapMarkers from "./MapMarkers";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";

const useStyles = makeStyles( () => ({
    reSearchBtn: {
        backgroundColor:"white",
        color:"#4e8fff",
        position: "absolute",
        top: "40px",
        width:"200px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "&:hover":{
            backgroundColor:"#f8f8f8",
        }
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

type MapBound = {
    N: number, S: number,
    E: number, W: number,
}

type Props = {
    mapBound: MapBound
}

const MapContent = (props:Props) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const [searchBtnShow, setSearchBtnShow] = useState<boolean>(false);

    const handleSearchBtnClick =  () => {
        setSearchBtnShow(false);
    }
    const defaultMapBound = {N:25.046, S:25.045, E:121.5178, W:121.5177}

    const options = {
        enabled: false,
        key:"mapStores",
        url: process.env.REACT_APP_URL + "/api/v1/map/get-store",
        queryParams: props.mapBound
    }

    if (!(JSON.stringify(props.mapBound) === JSON.stringify(defaultMapBound))) {
        options.enabled = true;
    }

    const { data:stores, status, error } = useFetch<Stores[]>(options);

    if (status === "loading") {
        return <div style={{ backgroundColor: "rgba(255,255,255,0.7)", padding: "15px" }}>
            <Loading />
        </div>;
    }

    if (status === "error") {
        return <div style={{ backgroundColor: "rgba(255,255,255,0.7)", padding: "15px" }}>
            {error?.message}
        </div>;
    }
    if(status === "success") {

    }

    return (
        <>
            <p>{searchInput}</p>
            <SearchBar setSearchInput={setSearchInput}/>

            {searchBtnShow && <Button variant="contained" className={classes.reSearchBtn}
                                      onClick={handleSearchBtnClick}> 搜尋這個區域
            </Button>}

            <MapMarkers stores={stores}/>
        </>
    );
};

export default MapContent;
