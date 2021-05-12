import ReactMapGL, {GeolocateControl, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import MapContent from "./MapContent";

const useStyles = makeStyles( () => ({

    map: {
        borderRadius: "10px",
        height: "100%",
    },
    mapOuter: {
        width: "80vw",
        height: "80vh",
        margin: "0 auto"
    },
    navControlStyle: {
        right: 30,
        bottom: 30,
    },
}));

type MapBound = {
    N: number, S: number,
    E: number, W: number,
}

const Map = () => {
    const classes = useStyles();
    const [map, setMap] = useState<any>();
    const [mapBound, setMapBound] = useState<MapBound>({N:25.046, S:25.045, E:121.5178, W:121.5177});
    const [maxSeenBound, setMaxSeenBound] = useState<MapBound>({N:-90,S:90,E:-180,W:180})
    const [viewport, setViewport] = useState({width:"100%",height:"100%",latitude: 25.046,longitude: 121.5178,zoom: 16});
    const geolocateControlStyle= {
        right: 10,
        top: 10
    };

    const handleInteract = () => {
        const currentMapBound = {
            N: map?.getBounds()._ne.lat, S: map?.getBounds()._sw.lat,
            E: map?.getBounds()._ne.lng, W: map?.getBounds()._sw.lng,
        }
        resetMaxSeenBound(maxSeenBound, currentMapBound);
    }

    const resetMaxSeenBound = (previousMax: MapBound, current: MapBound) =>  {
        if(current.N > previousMax.N || current.E > previousMax.E || current.S < previousMax.S || current.W < previousMax.W){
            let result:MapBound = {N:-90,S:90,E:-180,W:180};
            result.N = current.N > previousMax.N ? current.N : previousMax.N;
            result.E = current.E > previousMax.E ? current.E : previousMax.E;
            result.S = current.S < previousMax.S ? current.S : previousMax.S;
            result.W = current.W < previousMax.W ? current.W : previousMax.W;
            setMaxSeenBound(result);
            setMapBound(current)
        }
    }

    return (
        <div className={classes.mapOuter}>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                onInteractionStateChange={handleInteract}
                mapStyle="mapbox://styles/mapbox/streets-v10"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                doubleClickZoom={false}
                className={classes.map}
                ref={ref => setMap(ref?.getMap)}
            >
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    auto
                />
                <NavigationControl className={classes.navControlStyle} />

                <MapContent mapBound={mapBound}/>

            </ReactMapGL>
        </div>

    );

};

export default Map;
