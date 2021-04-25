import { useParams } from "react-router";

import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";
import { useQuery } from "react-query";
import axios from 'axios';
import Loading from "../Loading/Loading";
import { IStore } from '../../types/IStore'


type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}

const getStore = async (id: string): Promise<StoreResponse> => {
    const response = await axios.get(process.env.REACT_APP_URL+ `/api/v1/stores/${id}`);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    const data = await response.data.data;
    console.log(data)
    return data;
}

interface ParamTypes {
    id: string
}
const Store = () => {
    const { id } = useParams<ParamTypes>()
    //let store = {city:"台北市", name:"麵屋讚讚"};
    const { data: store, status, error } = useQuery<StoreResponse, Error>(
        ['stores', id],
        () => getStore(id),
        {
            keepPreviousData: true,
        }
    );


    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }


    return store ?
        <div className="row">
            <StoreLeftCol data={store}/>
            <StoreRightCol data={store}/>
        </div>
        : null;
};

export default Store;
