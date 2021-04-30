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
    const [mapAreas, setMapAreas] = useState(MapAreas);
    const targetRef = useRef();
    const {width} = useWindowSize(targetRef, setMapAreas);


    const load = () => {
        setMsg("Interact with image !");
    };

    const clicked = (area) => {
        setMsg(`You clicked on ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`)
    };
    const enterArea = (area) => {
        setHoveredArea(area);
        setMsg(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);

    };
    const leaveArea = (area) => {
        setHoveredArea({name:"no hover"});
        setMsg(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
            area.coords
        )} !`);
    };

    return (
        <div className="grid"  style={{ border: "2px #FFAC55 solid" }}>

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
            </div>
        </div>
    );

};

export default Metro;
