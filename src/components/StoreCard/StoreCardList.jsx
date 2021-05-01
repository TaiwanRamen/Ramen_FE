import {useEffect} from "react";
// import StoreCard from "./StoreCard";
// import './StoreCard.css';
import StoreCard from "./StoreCard";
import Loading from "../Loading/Loading";
import Grid from '@material-ui/core/Grid';

const StoreCardList = (props) => {
    const stores = props.stores;

    useEffect(()=> {
    },[])

    return (

        <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
            { !stores && <Loading />}
            { stores && stores.map( store =>
                <Grid key={store._id} item xs={12} sm={12} md={6} lg={4} >
                    <StoreCard store={store} />
                </Grid>
            )}
        </Grid>

    );
}
 
export default StoreCardList;

