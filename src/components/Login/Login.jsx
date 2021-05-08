import FacebookLogin from "react-facebook-login";
import { useState} from "react";
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useUser} from "../../Context/UserContext";
import LoadingIcon from "../Loading/LoadingIcon";
import {Button} from "react-bootstrap";


type Props = {
    disabled?: boolean
}
const Login = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);

    const { setUser } = useUser();
    const url = `${process.env.REACT_APP_URL}/api/v1/user/oauth/facebook`;

    const componentClicked = () => {
        setIsLoading(true);
    };

    const loginToOurServer = async (response) => {
        try {
            console.log(response);
            let payload = { "access_token": response.accessToken };
            let options = {
                method: 'post',
                url: url,
                data: payload,
                config: { headers: {'Content-Type': 'application/json' }}
            };
            let serverRes = await axios(options);
            let loginUser = serverRes.data.user;
            setUser(loginUser);
            Cookies.set('access_token', serverRes.data.token);
        } catch (e) {
            console.log("error:", e);
            setIsLoginFail(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onFailure = () => {
        setIsLoading(false);
        setIsLoginFail(true);
    };

    const handleFailure = () => {
        setIsLoginFail(false);
    };
    // const buttonOnClick = async () => {
    //     let options = {
    //         method: 'get',
    //         url: `${process.env.REACT_APP_URL}/api/v1/user/profile`,
    //         withCredentials: true
    //     };
    //     let serverRes = await axios(options);
    //     console.log(serverRes.data)//user profile
    // }

    const fields = 'id, name, gender, picture.type(large), email';

    return (
        <div>

            {isLoading && <div className="m-2">
                <LoadingIcon/>
                <span>登入中，請稍等</span>
            </div>  }

            {isLoginFail && <div>
                <Button variant="outline-primary" className="btn btn-outline-primary m-2" onClick={handleFailure}>
                    登入失敗，請點擊重試
                </Button>
            </div>}

            {!isLoading && !isLoginFail && <FacebookLogin
                appId="315819223006532"
                autoLoad={false}
                fields={fields}
                cookie={true}
                textButton=" 使用facebook登入"
                onClick={componentClicked}
                callback={loginToOurServer}
                onFailure={onFailure}
                cssClass="btn btn-outline-primary m-2"
                version="10.0"
                icon="fab fa-facebook-f"
                isDisabled={props.disabled && !isLoading}
            />}

        </div>
    );
};

export default Login;
