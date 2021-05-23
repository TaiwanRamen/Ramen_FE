import axios from "axios";
import Cookies from "js-cookie";
import {useUser} from "../Context/UserContext";
import useStackedSnackBar from "../customHooks/UseStackedSnackBar";

const NetworkInterceptors = () => {
    const {setUser} = useUser()!;
    const showSnackBar = useStackedSnackBar();
    axios.interceptors.response.use(
        function (successRes) {
            return successRes;
        },
        async function (err) {
            if (err.response?.status === 401 || err.response?.data.message === '401 Unauthorized') {
                setUser(null);
                window.localStorage.removeItem("current_user");
                await Cookies.remove('access_token');
                window.location.href = '/login';
            }
            showSnackBar(`請登入`, 'error')
            return Promise.reject(err);
        }
    );
};

export default NetworkInterceptors;
