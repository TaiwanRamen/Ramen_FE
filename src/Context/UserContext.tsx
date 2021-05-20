import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {IUser} from "../types/IUser";

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
        console.log("checking auth")
        const sessionUserString = window.sessionStorage.getItem("current_user");
        if (sessionUserString != null && sessionUserString !== "null" && sessionUserString !== "undefined") {
            const sessionUser = JSON.parse(sessionUserString);
            console.log(sessionUser)
            setUser(sessionUser);
        }
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
