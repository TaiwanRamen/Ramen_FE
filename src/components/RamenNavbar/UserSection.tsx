import LoginAndRegisterBtn from "./LoginAndRegisterBtn";
import UserInfoAndLogout from "./UserInfoAndLogout";
import {useUser} from "../../Context/UserContext";


const UserSection = () => {
    const { user } = useUser()! ;
    console.log(user)
    return (
        <>
            { !user && <LoginAndRegisterBtn/>}
            { user && <UserInfoAndLogout />}
        </>
    );
}

export default UserSection;