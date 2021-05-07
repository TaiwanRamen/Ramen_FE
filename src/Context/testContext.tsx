import * as React from "react";
import {IUser} from "../types/IUser";

type ThemeContextType = {
    user: IUser;
    setUser: (value: IUser) => void;
};
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
    undefined
);


export const useTheme = () => React.useContext(ThemeContext);

