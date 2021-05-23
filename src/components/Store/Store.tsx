import {useParams} from "react-router";

import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";
import {useQuery} from "react-query";
import axios from 'axios';
import Loading from "../Loading/Loading";
import {IStore} from '../../types/IStore'
import Grid from "@material-ui/core/Grid";


type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}

const getStore = async (id: string): Promise<StoreResponse> => {
    const response = await axios.get(process.env.REACT_APP_BE_URL+ `/api/v1/stores/${id}`);
    if (response.status !== 200) {
        throw new Error("Problem fetching data");
    }
    return await response.data.data;
}

interface ParamTypes {
    id: string
}
const Store = () => {
    const { id } = useParams<ParamTypes>()
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
        // <div className="row">
            <Grid container direction="row" justify="space-between" spacing={5}>
                <Grid key={"leftCol"} item sm={4} lg={3}>
                    <StoreLeftCol store={store.store}/>
                </Grid>
                <Grid key={"rightCol"} item sm={8} lg={9}>
                    <StoreRightCol data={store}/>
                </Grid>
            </Grid>

        // </div>
        : null;
};

export default Store;
