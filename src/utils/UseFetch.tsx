// import {useUser} from "../Context/UserContext";

import {useQuery} from "react-query";
import axios from "axios";
import {useUser} from "../Context/UserContext";

type Props = {
    key:string
    url:string,
    queryParams: Object
}

export default function useFetch<T>(props: Props) {
    const { setUser } = useUser();
    const key = props.key;
    const queryParams = props.queryParams;
    const url = props.url;

    const getStores = async (url:string ,params:Object): Promise<T> => {
        const response = await axios.get(url, { params:params, withCredentials:true});
        if(response.status === 401) {
            setUser(null);
        }
        if (response.status !== 200) {
            throw new Error("Problem fetching data");
        }
        return await response.data.data;
    }

    const { data, status, error } = useQuery<T, Error>(
        [key, url, queryParams],
        () => getStores(url, queryParams),
        {
            keepPreviousData: true,
        }
    );
    return { data, status, error }
};


