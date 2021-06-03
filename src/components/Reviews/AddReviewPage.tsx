import {useHistory, withRouter} from "react-router-dom";
import useStackedSnackBar from "../../customHooks/UseStackedSnackBar";
import React, {useState} from "react";
import QuillEditor from "../QuillEditor/QuillEditor";
import {IStore} from "../../types/IStore";
import useFetch from "../../customHooks/UseFetch";
import Loading from "../Loading/Loading";

type StoreResponse = {
    mapboxAccessToken: string,
    isStoreOwner: boolean,
    store: IStore
}

const AddReviewPage = () => {
    const showSnackBar = useStackedSnackBar();
    const history = useHistory();
    const [value, setValue] = useState('');


    if (!window.location.pathname.match(/\/stores\/[a-fA-F0-9]{24}\/newReview/g)) {
        showSnackBar('新增評論的店家ID錯誤', 'error');
        history.push("/stores");
    }

    const storeId = window.location.pathname.slice(8, 32)
    const options = {
        key: "store",
        url: process.env.REACT_APP_BE_URL + `/api/v1/stores/${storeId}`,
        requestQuery: {}
    }

    const {data: store, status, error} = useFetch<StoreResponse>(options);

    if (status === "loading") {
        return <Loading/>;
    }

    if (status === "error") {
        return <div>{error?.message}</div>;
    }

    return store ? <QuillEditor store={store.store}/> : null

};

export default withRouter(AddReviewPage);
