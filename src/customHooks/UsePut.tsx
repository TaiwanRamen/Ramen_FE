import {useHistory} from "react-router-dom";
import {useUser} from "../Context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import {useMutation} from "react-query";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object
}

const usePut = () => {

    const history = useHistory();
    const {setUser} = useUser()!;

    const putData = async (props:Props) => {
        try {
            const url = props.url;
            const requestBody = props.requestBody;
            const params = props?.requestQuery;
            const response = await axios.put(url, requestBody, {params: params, withCredentials: true})
            console.log(response.data);
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

    return useMutation((props:Props) => putData(props));
};

export default usePut;
