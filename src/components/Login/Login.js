import FacebookLogin from "react-facebook-login";
import {useContext, useState} from "react";
import './Login.css';
import axios from 'axios';
import cookies from 'js-cookie';
import {UserContext} from "../../Context/UserContext";
const Login = () => {
    const [accessToken, setAccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [user, setUser] = useState(null);
    const {user, setUser} = useContext(UserContext);
    const abortCont = new AbortController(); //when update state, when no state to update, abort
    const url = "http://localhost:4000/api/v1/user/oauth/facebook"
    const componentClicked = data => {
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
            const test2 = {
                //avatar: "https://graph.facebook.com/v2.6/3694920833893412/picture?type=large",
                //isVerified: true,
                userRole: 4,
                //hasStore: [ "5f477e32ee24401e3c8d200f" ],
                //notifications: ["607c0ae9ad31635df6fbebcc", "sfd", "99999" ],
                //followedStore: [],
               // reviews: [],
                _id: "607b3025844b5c2aa56ac12a",
                //fbUid: "3694920833893412",
                //fbName: "wrong Julian",
                //email: "sres3416@gmail.com",
                //createdAt: "2021-04-17T18:59:49.843Z",
                updatedAt: "2021-04-29T16:59:38.102Z",
                __v: 1
            }


            setUser(test2);
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
