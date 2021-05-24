import axios from "axios";
// import Cookies from "js-cookie";
// import {useUser} from "../Context/UserContext";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";
import {history} from "./history";

const NetworkInterceptors = () => {
    // const {setUser} = useUser()!;
    const showSnackBar = useStackedSnackBar();
    axios.interceptors.response.use(
        function (successRes) {
            return successRes;
        }, function (error) {
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
                    break;
            }
            showSnackBar(message, 'error');
            return Promise.reject(error);
        }
    );
};

export default NetworkInterceptors;
