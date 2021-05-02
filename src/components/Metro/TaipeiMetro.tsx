import React from "react";
import {useState, useRef, useLayoutEffect, useEffect,} from "react";
import ImageMapper from 'react-img-mapper';
import MapAreas from './MetroMapAreas'
import metroMap from '../../static/routemap2020.png';
import Loading from "../Loading/Loading";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
// import Button from "@material-ui/core/Button";


function useWindowSize(targetRef: React.RefObject<any>, setMapAreas: React.Dispatch<any>) {
    const [size, setSize] = useState({width:0, height:0});
    useLayoutEffect(() => {

        function updateSize() {
            setSize({width: targetRef.current.offsetWidth, height: targetRef.current.offsetHeight});
            setMapAreas(resize(targetRef.current.offsetWidth));
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const resize = (currentWidth:number) => {
    const factor = currentWidth / 960;
    const oldMapAreas = JSON.parse(JSON.stringify(MapAreas.areas));
    for (let i=0; i<oldMapAreas.length; i++){
        let coords = oldMapAreas[i].coords;
        coords = coords.map((c:number) => c * factor);
        oldMapAreas[i].coords = coords;
    }
    return {name: "my-map", areas: JSON.parse(JSON.stringify(oldMapAreas))};
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        presenter: {
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems:"center"
        },
        imageDiv:{
            height:"auto",
            maxWidth: "960px",
            '& > div > map > area:hover': {
                cursor: "pointer",
            },
        },
        typography: {
            padding: theme.spacing(2),
        },
        paper: {
            zIndex:1300,
            overflowX: "unset",
            overflowY: "unset",
            width:0,
            height:0,
            "&::before": {
                content: '""',
                position: "absolute",
                marginRight: "-1.1em",
                bottom: 0,
                right: "50%",
                width: 20,
                height: 20,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                transform: "translate(-50%, 50%) rotate(135deg)",
                clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
            },
        },
        popover: {
            width:200,
            height:200,
            borderRadius:10,
            boxShadow: "2 2 3px 5px rgba(0, 0, 0, 0.1)"
        }
    }),
);

const TaipeiMetro = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg]  = useState("");
    const [mapAreas, setMapAreas] = useState<any>(MapAreas);

    const [popoverOpen, setPopoverOpen] = useState(false);
    // const [popoverHoverOpen, setPopoverHoverOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({left:800, top:300})
    const [popoverMessage, setPopoverMessage] = useState("")

    const targetRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize(targetRef, setMapAreas);
    const classes = useStyles();


    useEffect(() => {
        setIsLoading(false);
    },[])

    const handleClick = (area:any, evt:any) => {
        const coords = { left: evt.nativeEvent.x, top: evt.nativeEvent.y-20 };
        setPopoverPosition(coords)
        setMsg(`You clicked on ${area.name} at coords ${JSON.stringify(coords)} !`);
        setPopoverMessage(`You clicked on ${area.name}!`);
        setPopoverOpen(true);
        console.log(popoverMessage);
    };

    const handleClose = () => {
        setPopoverOpen(false)
    };


    return (
        <div className="grid"  style={{ border: "2px #FFAC55 solid" }}>
            {isLoading && <Loading/>}
            <div className={classes.presenter} ref={targetRef}>
                <div className={classes.imageDiv} >
                    <ImageMapper
                        src={metroMap}
                        map={mapAreas}
                        width={width}
                        imgWidth={width}
                        onClick={(area:any, _, evt) => handleClick(area, evt)}
                        lineWidth={0.01}
                        fillColor={"rgba(0, 0, 0, 0.15)"}
                        strokeColor={"white"}
                    />

                </div>
                <pre className="message">
                    {msg ? msg : null}
                </pre>
                <Popover
                    id="1"
                    open={popoverOpen}
                    anchorReference="anchorPosition"
                    anchorPosition={popoverPosition}
                    onClose={handleClose}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    classes={{ paper: classes.paper }}
                >
                </Popover>
                <Popover
                    id="2"
                    open={popoverOpen}
                    anchorReference="anchorPosition"
                    anchorPosition={popoverPosition}
                    onClose={handleClose}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    classes={{ paper: classes.popover }}
                >
                    <Typography variant="body2" className={classes.typography} >
                        {popoverMessage}
                    </Typography>
                </Popover>


            </div>
        </div>
    );

};

export default TaipeiMetro;
