import axios from "axios";
import Cookies from "js-cookie";
import {useUser} from "./Context/UserContext";

const NetworkInterceptors = () => {
    const {setUser} = useUser()!;

    axios.interceptors.response.use(
        function (successRes) {
            return successRes;
        },
        async function (err) {
            if (err.response?.status === 401 || err.response?.data.message === '401 Unauthorized') {
                setUser(null);
                console.log("intercrpted!!")
                window.localStorage.removeItem("current_user");
                await Cookies.remove('access_token');
                window.location.href = '/login'
            }
            return Promise.reject(err);
        }
    );
};

export default NetworkInterceptors;
