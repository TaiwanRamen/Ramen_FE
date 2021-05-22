import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {IUser} from "../types/IUser";
import Cookies from "js-cookie";

type UserContextType = {
    user: IUser | null;
    setUser: (value: IUser | null) => void;
};
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);


type Props = {
    children: ReactNode;
};

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        checkAuth()
    },[])


    const checkAuth = () => {
        const localUserString = window.localStorage.getItem("current_user");
        if (localUserString != null && localUserString !== "null" && localUserString !== "undefined") {
            const localUser = JSON.parse(localUserString);
            setUser(localUser);
        } else {
            setUser(null);
            Cookies.remove('access_token', {path: '', domain: process.env.REACT_APP_DOMAIN});
            window.localStorage.removeItem("current_user");
        }
    }

    // const value = useMemo(() => ({
    //     user,
    //     setUser
    // }), [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);