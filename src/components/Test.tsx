import useFetch from "../utils/UseFetch";
import {IStore} from "../types/IStore";

const Test = () => {
    const options = {
        key:"stores",
        url: process.env.REACT_APP_URL + "/api/v1/stores",
        queryParams: {
            page:1,
            search:"拉麵"
        }
    }

    type Stores = {
        current: number;
        mapboxAccessToken: string;
        pages: number;
        search: boolean;
        stores: IStore[]
    };

    const { data, status, error } = useFetch<Stores>(options);

    if (status === "loading"){
        console.log("loading...")
    }
    if(status === "error"){
        console.log(error?.message);
    }
    if(data){
        console.log(data)
    }

    return <div>
        test
    </div>

};
export default Test;
