import {Popup} from "react-map-gl";
import {IStore} from "../../types/IStore";

const markerSize = 45;

type Props = {
    index:number,
    store:IStore,
    closePopup: Function
};

const CustomPopup = (props: Props) => {
    const store = props.store;
    const closePopup = props.closePopup;
    return (
        <Popup
            longitude={store?.location?.coordinates[0]}
            latitude={store?.location?.coordinates[1]}
            onClose={closePopup}
            closeButton={false}
            offsetLeft={markerSize/2}
            closeOnClick={false}
        >
            <p>{store.name}</p>
        </Popup>
    )};

export default CustomPopup;
