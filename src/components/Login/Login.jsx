import FacebookLogin from "react-facebook-login";
import { useState} from "react";
import './Login.css';
import axios from 'axios';
import cookies from 'js-cookie';
import {useUser} from "../../Context/UserContext";
const Login = () => {
    const [accessToken, setAccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [user, setUser] = useState(null);
    const { user } = useUser();
    const url = "http://localhost:4000/api/v1/user/oauth/facebook"
    const componentClicked = () => {
        setIsLoading(true);
    };

    const resultFacebookLogin = async (response) => {
        try {
            console.log(response);
            setIsLoading(false);
            setAccessToken(response.accessToken);
            let payload = { "access_token": response.accessToken };
            let options = {
                method: 'post',
                url: url,
                data: payload,
                config: { headers: {'Content-Type': 'application/json' }}
            };
            let serverRes = await axios(options);
            console.log(serverRes.data)
            let loginUser = serverRes.data.user;

            console.log(loginUser);

            console.log("true user:", user)

            cookies.set('access_token', serverRes.data.token);
        } catch (e) {
            console.log("error:", e)
        }



    };

    const onFailure = () => {
        console.log('fail');
        setIsLoading(false);
    };
    const buttonOnClick = async () => {
        let options = {
            method: 'get',
            url: "http://localhost:4000/api/v1/user/profile",
            withCredentials: true
        };
        let serverRes = await axios(options);
        console.log(serverRes);
    }

    const fields = 'id, name, gender, picture.type(large), email';

    return (
        <div>
            React Facebook Login
            <br />
            User Short-Lived Access Token:
            <br />
            {accessToken}
            <br />
            {isLoading && <div>Loading!</div>}
            <br/>
            {user && user.fbUid}
            <FacebookLogin
                appId="315819223006532"
                autoLoad={false}
                fields={fields}
                cookie={true}
                textButton=" 使用facebook登入"
                onClick={componentClicked}
                callback={resultFacebookLogin}
                onFailure={onFailure}
                cssClass="btn btn-lg btn-primary mb-4"
                version="10.0"
                icon="fab fa-facebook-f"
            />
            <button onClick={buttonOnClick}>click me</button>
        </div>
    );
};

export default Login;
