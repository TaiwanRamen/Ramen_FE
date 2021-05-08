import {useQuery} from "react-query";
import axios from "axios";
import {useUser} from "../Context/UserContext";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

type Props = {
    key:string
    url:string,
    queryParams: Object
}

export default function useFetch<T>(props: Props) {
    const history = useHistory();
    const { setUser } = useUser()!;
    const key = props.key;
    const queryParams = props.queryParams;
    const url = props.url;

    const getStores = async (url:string ,params:Object): Promise<T> => {
        try {
            const response = await axios.get(url, { params:params, withCredentials:true});
            console.log("response", response.status)
            return await response.data.data;
        } catch (error) {
            if(error.response.status === 401) {
                setUser(null);
                window.sessionStorage.removeItem("current_user");
                await Cookies.remove('access_token', { path: '', domain: process.env.REACT_APP_DOMAIN });
                history.push("/login");
            }
            throw new Error("Problem fetching data");
        }
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


