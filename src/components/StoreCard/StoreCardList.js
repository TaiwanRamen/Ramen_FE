import {useEffect, useState} from "react";
import StoreCard from "./StoreCard";
import './StoreCard.css';
import Loading from "../Loading/Loading";
const StoreCardList = (props) => {
    const stores = props.stores;

    useEffect(()=> {
    },[])

    return (
        <div className="row">
            { !stores && <Loading />}
            { stores && stores.map( store => <StoreCard store={store} key={store._id}/> )}
        </div>
    );
}
 
export default StoreCardList;