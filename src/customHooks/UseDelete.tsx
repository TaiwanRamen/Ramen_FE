import axios from "axios";
import {useMutation} from "react-query";
import Cookies from "js-cookie";
import {useHistory} from "react-router-dom";
import {useUser} from "../Context/UserContext";
import useStackedSnackBar from "./UseStackedSnackBar";

type Props = {
    url: string,
    requestBody: Object,
    requestQuery?: Object
}

const useDelete = () => {
    const history = useHistory();
    const {setUser} = useUser()!;
    const showSnackBar = useStackedSnackBar();
    const deleteData = async (props: Props) => {
        try {
            const url = props.url;
            const requestBody = props.requestBody;
            const params = props?.requestQuery;
            await axios.delete(url, {data: requestBody, params: params, withCredentials: true})
        } catch (error) {
            if (error.response.status === 401) {
                setUser(null);
                window.localStorage.removeItem("current_user");
                await Cookies.remove('access_token');
                history.push("/login");
            }
            showSnackBar(`您沒有此權限，請重新登入`, 'error');
            throw new Error("Problem fetching data");
        }
    }
    return useMutation((props: Props) => deleteData(props));
};

export default useDelete;
