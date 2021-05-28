import {useParams} from "react-router";

import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";
import Loading from "../Loading/Loading";
import {IStore} from '../../types/IStore'
import Grid from "@material-ui/core/Grid";
import useFetch from "../../customHooks/UseFetch";
import React from "react";


type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}

interface ParamTypes {
    id: string
}

const Store = () => {

    const {id} = useParams<ParamTypes>()
    const [currentTabNum, setCurrentTabNum] = React.useState(0);

    const options = {
        key: "store",
        url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${id}`,
        requestQuery: {}
    }

    const {data: store, status, error} = useFetch<StoreResponse>(options);


    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }


    return store ?
        <Grid container direction="row" justify="space-between" spacing={5}>
            <Grid key={"leftCol"} item sm={4} lg={3}>
                <StoreLeftCol store={store.store} currentTabNum={currentTabNum} setCurrentTabNum={setCurrentTabNum}/>
            </Grid>
            <Grid key={"rightCol"} item sm={8} lg={9}>
                <StoreRightCol data={store} currentTabNum={currentTabNum}/>
            </Grid>
        </Grid>
        : null;
};

export default Store;
