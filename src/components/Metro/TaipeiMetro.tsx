import React from "react";
import {useState, useRef, useLayoutEffect, useEffect,} from "react";
import ImageMapper from 'react-img-mapper';
import MapAreas from './TaipeiMetroMapAreas'
import metroMap from '../../static/TPMetro.png';
import Loading from "../Loading/Loading";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import MetroSideDrawer from "./MetroSideDrawer";

const imageWidth = 960;


function useWindowSize(targetRef: React.RefObject<any>, setMapAreas: React.Dispatch<any>) {
    const [size, setSize] = useState({width: 0, height: 0});
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

const resize = (currentWidth: number) => {
    const factor = currentWidth / imageWidth;
    const oldMapAreas = JSON.parse(JSON.stringify(MapAreas.areas));
    for (let i = 0; i < oldMapAreas.length; i++) {
        let coords = oldMapAreas[i].coords;
        coords = coords.map((c: number) => c * factor);
        oldMapAreas[i].coords = coords;
    }
    return {name: "my-map", areas: JSON.parse(JSON.stringify(oldMapAreas))};
}

const useStyles = makeStyles((theme: Theme) => ({
        presenter: {
            marginBottom: 100,
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        imageDiv: {
            height: "auto",
            maxWidth: "960px",
            '& > div > map > area:hover': {
                cursor: "pointer",
            },
        },
        typography: {
            padding: theme.spacing(2),
        },

        arrow: {
            overflowX: "unset",
            overflowY: "unset",
            width: 0,
            height: 0,
            "&::before": {
                content: '""',
                position: "absolute",
                marginRight: "-1.1em",
                bottom: 0,
                right: "50%",
                width: 20,
                height: 20,
                boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.1)",
                backgroundColor: theme.palette.grey[500],
                transform: "translate(-50%, 50%) rotate(135deg)",
                clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
            },
        },
        paper: {
            height: 50,
            maxHeight: "10vh",
            maxWidth: 150,
            overflow: 'auto',
            boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.1)"
        },
        popper: {
            zIndex: 9999,
            position: "relative"
        },
    }),
);

const TaipeiMetro = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clickedStationName, setClickedStationName] = useState("");
    const [hoverStationName, setHoverStationName] = useState("");

    const [mapAreas, setMapAreas] = useState<any>(MapAreas);

    const [popoverPosition, setPopoverPosition] = useState({left: 800, top: 300})
    const [drawerOpen, setDrawerOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const targetRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize(targetRef, setMapAreas);
    const classes = useStyles();
    const [arrowRef] = React.useState(null);
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        setIsLoading(false);
    }, [])

    const handleClick = (area: any) => {
        setClickedStationName(area.name);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const toggleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen)
    };
    const handleEnter = (area: any, targetRef: React.RefObject<any>) => {
        const centerCoords = {
            left: area.center[0] + targetRef.current.offsetLeft,
            top: area.center[1] + targetRef.current.offsetTop
        };
        setHoverStationName(`${area.name}`)
        setPopoverPosition(centerCoords);
        setOpen(true);
    };
    const handleLeave = () => {
        setHoverStationName("");
        setOpen(false);
    };

    return (
        <div className="grid" style={{border: "2px #FFAC55 solid"}}>
            {isLoading && <Loading/>}
            <div id="bird"
                 style={{position: 'absolute', left: popoverPosition.left, top: popoverPosition.top - 40, zIndex: 9999}}
                 ref={anchorRef}>
            </div>
            <div className={classes.presenter} ref={targetRef}>
                <div className={classes.imageDiv}>
                    <ImageMapper
                        src={metroMap}
                        map={mapAreas}
                        width={width}
                        imgWidth={width}
                        onClick={(area: any) => handleClick(area)}
                        onMouseEnter={(area, _) => handleEnter(area, targetRef)}
                        onMouseLeave={() => handleLeave()}
                        onImageClick={handleDrawerClose}
                        lineWidth={0.01}
                        fillColor={"rgba(0, 0, 0, 0.15)"}
                        strokeColor={"white"}
                    />
                </div>

                <Popper
                    id={'popper-bottom'}
                    open={open}
                    anchorEl={anchorRef.current}
                    placement='top'
                    className={classes.popper}
                    modifiers={{
                        flip: {
                            enabled: true,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'scrollParent',
                        },
                        arrow: {
                            enabled: true,
                            element: arrowRef,
                        },
                    }}
                >
                    <span className={classes.arrow} ref={arrowRef}/>
                    <Paper className={classes.paper}>
                        <DialogTitle>{hoverStationName}</DialogTitle>
                    </Paper>
                </Popper>

            </div>
            <MetroSideDrawer name={clickedStationName} isOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen}/>
        </div>
    );

};

export default TaipeiMetro;