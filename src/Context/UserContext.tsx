import {createContext, useContext, useState, ReactNode} from "react";
import {IUser} from "../types/IUser";

type UserContextType = {
    user: IUser | null;
    setUser: (value: IUser) => void;
};
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);


type Props = {
    children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<IUser | null>(null);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);
