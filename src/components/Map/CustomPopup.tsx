import {Popup} from "react-map-gl";

const markerSize = 45;

type Store = {
    _id: string,
    name: string,
    city: string,
    descriptionText: string,
    imageSmall: string[],
    location: {
        type: string,
        coordinates: number[],
        formattedAddress: string
    },
    rating: number,
    reviewsCount: number,
};

type Props = {
    index:number,
    store:Store,
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
            closeButton={true}
            offsetLeft={markerSize/2}
            closeOnClick={false}
        >
            <p>{store.name}</p>
        </Popup>
    )};

export default CustomPopup;
