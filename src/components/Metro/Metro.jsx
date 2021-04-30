import {useState, useRef, useLayoutEffect,} from "react";
import ImageMapper  from "react-image-mapper";
import MapAreas from './MetroMapAreas'
import metroMap from '../../static/routemap2020.png';
const React = require("react");

function useWindowSize(targetRef, setMapAreas) {
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

const resize = (currentWidth) => {
    const factor = currentWidth / 960;
    const oldMapAreas = JSON.parse(JSON.stringify(MapAreas.areas));
    for (let i=0; i<oldMapAreas.length; i++){
        let coords = oldMapAreas[i].coords;
        coords = coords.map(c => c * factor);
        oldMapAreas[i].coords = coords;
    }
    return {name: "my-map", areas: JSON.parse(JSON.stringify(oldMapAreas))};
}

const Metro = () => {
    const [ hoveredArea, setHoveredArea ] = useState(null);
    const [msg, setMsg]  = useState(null);
    const [moveMsg, setMoveMsg] = useState(null);
    const [mapAreas, setMapAreas] = useState(MapAreas);
    const targetRef = useRef();
    const {width} = useWindowSize(targetRef, setMapAreas);


    const load = () => {
        setMsg("Interact with image !");
    };

    const clicked = (area) => {
        setMsg(`You clicked on ${area.shape} at coords ${JSON.stringify(
            area.coords
        )} !`)
    };
    const clickedOutside = (evt) => {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
    };
    const moveOnImage = (evt) => {
        const coords = {x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY};
        setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
    };
    const enterArea = (area) => {
        setHoveredArea(area);
        setMsg(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);

    };
    const leaveArea = (area) => {
        setHoveredArea(null);
        setMsg(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);
    };
    const moveOnArea = (area, evt) => {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        setMoveMsg(`You moved on ${area.shape} ${
            area.name
        } at coords ${JSON.stringify(coords)} !`);
    };

    const getTipPosition = (area) => {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    };


    return (
        <div className="grid"  style={{ border: "3px #FFAC55 solid" }}>

            <div className="presenter" ref={targetRef}>
                <div style={{ maxWidth: "960px", height:"auto" }} >
                    <ImageMapper
                        src={metroMap}
                        map={mapAreas}
                        width={width}
                        imageWidth={{width}}
                        onLoad={() => load()}
                        onClick={area => clicked(area)}
                        onMouseEnter={area => enterArea(area)}
                        onMouseLeave={area => leaveArea(area)}
                        onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
                        onImageClick={evt => clickedOutside(evt)}
                        onImageMouseMove={evt => moveOnImage(evt)}
                        lineWidth={4}
                        strokeColor={"white"}
                    />
                    {hoveredArea && (
                        <span
                            className="tooltip"
                            style={ getTipPosition(hoveredArea) }
                        >
                            {hoveredArea && hoveredArea.name}
                        </span>
                    )}
                </div>
                <pre className="message">
                    {msg ? msg : null}
                </pre>
                <pre>{moveMsg ? moveMsg : null}</pre>
                <pre>{width}</pre>
            </div>
        </div>
    );

};

export default Metro;
