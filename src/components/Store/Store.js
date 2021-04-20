import React from 'react';
import { useParams } from "react-router";
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import StoreLeftCol from "./StoreLeftCol";
import StoreRightCol from "./StoreRightCol";


const Store = () => {
    const { id } = useParams();
    let store = {city:"台北市"};
    //const { data: blog, error, isLoading} = useFetch(`http://localhost:8000/blogs/${id}`);
    return (
        <div className="row">
            <StoreLeftCol store={store}/>
            <StoreRightCol store={store}/>
        </div>
    );
};

export default Store;
