import {useQuery} from "react-query";
import axios from "axios";
import {useUser} from "../Context/UserContext";
import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom";

type Props = {
    enabled?: boolean,
    key: string,
    url: string,
    requestQuery: Object
}


export default function useFetch<T>(props: Props) {
    const history = useHistory();
    const {setUser} = useUser()!;
    const enabled = (props.enabled !== null) ? props.enabled : true;
    const key = props.key;
    const requestQuery = props.requestQuery;
    const url = props.url;

    const getData = async (url: string, params: Object): Promise<T> => {
        try {
            const response = await axios.get(url, {params: params, withCredentials: true});
            return await response.data.data;
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                window.sessionStorage.removeItem("current_user");
                await Cookies.remove('access_token', {path: '', domain: process.env.REACT_APP_DOMAIN});
                history.push("/login");
            }
            throw new Error("Problem fetching data");
        }
    }

    const {data, status, error} = useQuery<T, Error>(
        [key, url, requestQuery],
        () => getData(url, requestQuery),
        {
            keepPreviousData: true,
            enabled: enabled
        }
    );
    return {data, status, error}
};


