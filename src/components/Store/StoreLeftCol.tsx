import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core/styles";
import ReactMapGL, {Marker} from "react-map-gl";
import {IStore} from "../../types/IStore";
import ramenIcon from "../../static/ramen.svg";
import {useState} from "react";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
    root: {
        padding: 10,
        borderRadius: 10,
    },
    button: {
        marginTop: "1rem",
        width: "100%",
    },
    icon: {
        margin: 10
    },
    storeMap: {
        borderRadius: 20,
        marginTop: 20,
        height: 500,
    },
    map: {
        borderRadius: 10
    },
    address: {
        marginTop: 20
    },
    addressLink: {},
    marker: {
        backgroundImage: `url(${ramenIcon})`,
        backgroundSize: "cover",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        zIndex: 600
    },
}));
type Props = {
    store: IStore
}
const StoreLeftCol = (props: Props) => {
    const history = useHistory(); //this object represent history
    const classes = useStyles();
    const store = props.store;
    const lng = store?.location?.coordinates[0];
    const lat = store?.location?.coordinates[1];
    const defaultViewport = {latitude: lat, longitude: lng, zoom: 12};
    const [viewport, setViewport] = useState<any>(defaultViewport);
    // const clickCity = (city) => {
    //     history.push('/');
    // }
    return (
        <Paper className={classes.root}>

            <Button variant="outline-secondary"  className={classes.button} onClick={() => history.go(-1)}>
                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                <span className={classes.icon}>返回上一頁</span>
            </Button>

            <div id="map" className={classes.storeMap}>
                <ReactMapGL
                    {...viewport}
                    onViewportChange={setViewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/streets-v10"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    doubleClickZoom={false}
                    className={classes.map}
                >
                    <Marker
                        longitude={lng}
                        latitude={lat}>
                        <div className={classes.marker}>
                        </div>
                    </Marker>
                </ReactMapGL>
            </div>
            <p className={classes.address}>地址：
                <a className={classes.addressLink} href="https://www.google.com.tw/maps/place/%>">
                    {store.address}
                </a>
            </p>

        </Paper>
    );
};

export default StoreLeftCol;
