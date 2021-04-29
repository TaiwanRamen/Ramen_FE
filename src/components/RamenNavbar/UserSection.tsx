import {UserContext} from "../../Context/UserContext";
import  {useContext} from "react";
import LoginAndRegisterBtn from "./LoginAndRegisterBtn";
import UserInfoAndLogout from "./UserInfoAndLogout";


const UserSection = () => {
    const {user} = useContext(UserContext);
    return (
        <>
            { !user && <LoginAndRegisterBtn/>}
            { user && <UserInfoAndLogout />}
        </>
    );
}

export default UserSection;