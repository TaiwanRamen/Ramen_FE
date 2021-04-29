import {UserContext} from "../../Context/UserContext";
import {useContext} from "react";
import LoginAndRegisterBtn from "./LoginAndRegisterBtn";
import UserMenu from "./UserMenu";


const UserSection = () => {
    const {user} = useContext(UserContext);
    console.log(user);
    return (
        <>
            { !user && <LoginAndRegisterBtn/>}
            { user && <UserMenu/>}
        </>
    );
}

export default UserSection;