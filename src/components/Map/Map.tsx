import ReactMapGL, {Marker, GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ramenIcon from '../../static/ramen.svg';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import SearchBar from "../SearchBar/SearchBar";



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
            width: "45px",
            height: "45px",
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

    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log(pos.coords.latitude, pos.coords.longitude);
            setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
        });
    };
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
            <Button onClick={setUserLocation}>user loc</Button>
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

                {
                    [25.046, 25.047, 25.048].map(lat =>
                        <Marker latitude={lat} longitude={121.5178}>
                            <div className={classes.marker} onClick={() => alert(1)}/>
                        </Marker>
                    )
                }
                {/*<Marker latitude={25.046} longitude={121.5178}>*/}
                {/*    <div className={classes.marker} onClick={() => alert(1)}/>*/}
                {/*</Marker>*/}
            </ReactMapGL>
        </div>

    );

};

export default Map;
