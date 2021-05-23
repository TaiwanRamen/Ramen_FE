import FacebookLogin from "react-facebook-login";
import { useState} from "react";
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useUser} from "../../Context/UserContext";
import LoadingIcon from "../Loading/LoadingIcon";
import Button from "@material-ui/core/Button";


type Props = {
    disabled?: boolean
}
const Login = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginFail, setIsLoginFail] = useState(false);
    const [loginCount, setLoginCount] = useState(0);

    const { user, setUser } = useUser();
    const url = `${process.env.REACT_APP_BE_URL}/api/v1/user/oauth/facebook`;

    const componentClicked = () => {
        setIsLoading(true);
    };

    const loginToOurServer = async (response) => {
        try {
            let payload = { "access_token": response.accessToken };
            let options = {
                method: 'post',
                url: url,
                data: payload,
                config: { headers: {'Content-Type': 'application/json' }}
            };
            let serverRes = await axios(options);
            let loginUser = serverRes.data.data.user;
            setUser(loginUser);
            Cookies.set('access_token', serverRes.data.data.token);
            window.localStorage.setItem("current_user", JSON.stringify(loginUser));

        } catch (e) {
            console.log("error:", e);
            setIsLoginFail(true);
            setLoginCount(loginCount+1)
        } finally {
            setIsLoading(false);
        }
    };

    const onFailure = () => {
        setIsLoading(false);
        setIsLoginFail(true);
        setLoginCount(loginCount+1)
    };

    const handleFailure = () => {
        setIsLoginFail(false);
    };

    const fields = 'id, name, gender, picture.type(large), email';

    if(user){
        return <></>
    }

    return (
        <div className="m-3">
            {isLoading && <div className="m-2">
                <LoadingIcon/>
                <span>登入中，請稍等</span>
            </div>  }

            {isLoginFail && loginCount < 3 &&
                <div>
                    <Button variant="outlined"  color="secondary" size="large" onClick={handleFailure} className="m-2">
                        登入失敗，請點擊重試
                    </Button>
                </div>
            }
            {loginCount >= 3 && <div className="m-2">
                <p>登入異常，請重新整理或稍後再試</p>
            </div>  }


            {!isLoading && !isLoginFail && <FacebookLogin
                appId="315819223006532"
                autoLoad={false}
                fields={fields}
                cookie={true}
                textButton=" 使用facebook登入"
                onClick={componentClicked}
                callback={loginToOurServer}
                onFailure={onFailure}
                cssClass="btn btn-lg btn-outline-primary m-2"
                version="10.0"
                icon="fab fa-facebook-f"
                isDisabled={props.disabled && !isLoading}
            />}

        </div>
    );
};

export default Login;
