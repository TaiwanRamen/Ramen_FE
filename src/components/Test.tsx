import ReactMapGL, { GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ramenIcon from '../../static/ramen.svg';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useState, useEffect} from "react";
// import Button from "@material-ui/core/Button";
import SearchBar from "./SearchBar/SearchBar";
// import Popups from "./Popups";
// import {IStore} from "../../types/IStore";
// import useFetch from "../../customHooks/UseFetch";

const markerSize = 45;

const useStyles = makeStyles(() =>
    createStyles({
        map:{
            borderRadius: "10px",
            height:"100%",
        },
        mapOuter:{
            width:"80vw",
            height:"80vh",
            margin: "0 auto"
        },
        marker:{
            backgroundImage: `url(${ramenIcon})`,
            backgroundSize: "cover",
            width: markerSize,
            height: markerSize,
            borderRadius: "50%",
            cursor: "pointer",
        },

    }));

// type Props = {
//     center: [number, number],
//     zoom: number,
// }

const Map = () => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState<string | null>(null);
    // const [showPopup, setShowPopup] = useState<boolean>(true);
    // const [currentStore, setCurrentStore] = useState<IStore | null>(null);

    const geolocateControlStyle= {
        right: 10,
        top: 10
    };

    const [viewport, setViewport] = useState({
        width:"100%",
        height:"100%",
        latitude: 25.046,
        longitude: 121.5178,
        zoom: 16,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos.coords.latitude, pos.coords.longitude)
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 16
            });
        });
    }, []);



    return (
        <div className={classes.mapOuter}>
            <p>{searchInput}</p>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                className={classes.map}

            >
                <SearchBar setSearchInput={setSearchInput}/>
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    auto
                />

                {/*{*/}
                {/*    stores.map(store =>*/}
                {/*        <Marker latitude={store.location.coordinates[0]} longitude={store.location.coordinates[1]}>*/}
                {/*            <div className={classes.marker} onClick={() => handleMarkerClick(store)}/>*/}
                {/*        </Marker>*/}
                {/*    )*/}
                {/*}*/}
                {/*{showPopup && <Popup*/}
                {/*    latitude={25.046}*/}
                {/*    longitude={121.5178}*/}
                {/*    offsetLeft={markerSize/2}*/}
                {/*    offsetTop={markerSize/2}*/}
                {/*    closeButton={true}*/}
                {/*    closeOnClick={false}*/}
                {/*    onClose={() => setShowPopup(false)}*/}
                {/*    anchor="bottom" >*/}
                {/*    <Popups />*/}
                {/*</Popup>}*/}
            </ReactMapGL>
        </div>

    );

};

export default Map;
