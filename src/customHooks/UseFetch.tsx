import {useQuery} from "react-query";
import axios from "axios";
// import {useUser} from "../Context/UserContext";
// import Cookies from 'js-cookie';
import {useHistory} from "react-router-dom";
import useStackedSnackBar from "./UseStackedSnackBar";

type Props = {
    enabled?: boolean,
    key: string,
    url: string,
    requestQuery: Object
}


export default function useFetch<T>(props: Props) {
    const history = useHistory();
    // const {setUser} = useUser()!;
    const showSnackBar = useStackedSnackBar();
    const enabled = (props.enabled !== null) ? props.enabled : true;
    const key = props.key;
    const requestQuery = props.requestQuery;
    const url = props.url;

    const getData = async (url: string, params: Object): Promise<T> => {
        try {
            const response = await axios.get(url, {params: params, withCredentials: true});
            console.log(response);
            return await response.data.data;
        } catch (error) {
            const message = error?.response?.data?.message;
            switch (error.response.status){
                case 401:
                    // setUser(null);
                    // window.localStorage.removeItem("current_user");
                    // await Cookies.remove('access_token');
                    history.push("/unAuthorized");
                    break;
                case 404:
                    history.push('/notFound');
                    break;
                case 500:
                    history.push('/error');
                    break;
                default:
                    history.push('/');
            }
            showSnackBar(message, 'error');
            throw new Error("Problem fetching data, please retry later");
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


