import React from 'react';
import { useParams } from "react-router";
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";
import { useQuery } from "react-query";
import axios from 'axios';
import Loading from "../Loading/Loading";




async function getStore(params) {
    const [, { id }] = params.queryKey;
    console.log("id:", id)
    const response = await axios.get(`http://localhost:4000/api/v1/stores/${id}`);
    if (response.status !== 200) {
      throw new Error("Problem fetching data");
    }
    const data = await response.data.data;
    console.log(data)
    return data;
}

const Store = () => {
    const { id } = useParams();
    //let store = {city:"台北市", name:"麵屋讚讚"};
    const { status, error, data } = useQuery(
        ["store", { id: id }],
        getStore, {
            keepPreviousData: true,
          }
      ); 
    if (status === "loading") {
    return <Loading />;
    }

    if (status === "error") {
    return <div>{error?.message}</div>;
    }


    return data ? 
    <div className="row">
        <StoreLeftCol store={data.store}/>
        <StoreRightCol store={data.store}/> 
    </div>
    : null;
};

export default Store;
