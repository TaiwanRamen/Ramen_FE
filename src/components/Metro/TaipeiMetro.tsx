import React from "react";
import {useState, useRef, useLayoutEffect, useEffect,} from "react";
import ImageMapper from 'react-img-mapper';
import MapAreas from './MetroMapAreas'
import metroMap from '../../static/routemap2020.png';
import Loading from "../Loading/Loading";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";


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
        imageDiv:{
            maxWidth: "960px", height:"auto",
            '& > div > map > area:hover': {
                cursor: "pointer",
            }
        },
        typography: {
            padding: theme.spacing(2),
        },
        popover: {
            zIndex:1300
        }
    }),
);

const TaipeiMetro = () => {
    const [ hoveredArea, setHoveredArea ] = useState({name:"no"});
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg]  = useState("");
    const [mapAreas, setMapAreas] = useState<any>(MapAreas);

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverPosition] = useState({ top:100, left:800 })

    const targetRef = useRef<HTMLDivElement>(null)
    const {width} = useWindowSize(targetRef, setMapAreas);
    const classes = useStyles();


    useEffect(() => {
        setIsLoading(false);
    },[])

    const handleClick = (area:any) => {
        console.log(area);
        setPopoverOpen(true)
        setMsg(`You clicked on ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`)
    };

    const handleClose = () => {
        setPopoverOpen(false)
    };

    const enterArea = (area:any) => {
        setHoveredArea(area);
        setMsg(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);

    };
    const leaveArea = (area:any) => {
        setHoveredArea({name:"no"});
        setMsg(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);
    };

    return (
        <div className="grid"  style={{ border: "2px #FFAC55 solid" }}>
            {isLoading && <Loading/>}
            <div className="presenter" ref={targetRef}>
                <div className={classes.imageDiv} >
                    <ImageMapper
                        src={metroMap}
                        map={mapAreas}
                        width={width}
                        imgWidth={width}
                        onClick={(event: any) => handleClick(event)}
                        onMouseEnter={(event: any) => enterArea(event)}
                        onMouseLeave={(event: any) => leaveArea(event)}
                        lineWidth={0.01}
                        fillColor={"rgba(0, 0, 0, 0.15)"}
                        strokeColor={"white"}
                    />
                    {hoveredArea && (
                        <span>
                            {hoveredArea.name}
                        </span>
                    )}
                </div>
                <pre className="message">
                    {msg ? msg : null}
                </pre>
                <Popover
                    open={popoverOpen}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: popoverPosition.top, left: popoverPosition.left }}
                    onClose={handleClose}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>The content of the Popover.</Typography>
                </Popover>
            </div>
        </div>
    );

};

export default TaipeiMetro;
