import {ThemeContext} from "./testContext";
import * as React from "react";
import {IUser} from "../types/IUser";

type Props = {
    children: React.ReactNode;
};
const defaultUser = {
    avatar: "https://graph.facebook.com/v2.6/3694920833893412/picture?type=large",
    isVerified: true,
    userRole: 4,
    hasStore: [ "5f477e32ee24401e3c8d200f" ],
    notifications: ["607c0ae9ad31635df6fbebcc", "sfd", "99999" ],
    followedStore: [],
    reviews: [],
    _id: "607b3025844b5c2aa56ac12a",
    fbUid: "3694920833893412",
    fbName: "Lin Julian",
    email: "sres3416@gmail.com",
    createdAt: "2021-04-17T18:59:49.843Z",
    updatedAt: "2021-04-29T16:59:38.102Z",
    __v: 1
}

export const ThemeProvider = ({ children }: Props) => {
    const [user, setUser] = React.useState<IUser>(defaultUser);

    React.useEffect(() => {
        // We'd get the theme from a web API / local storage in a real app
        // We've hardcoded the theme in our example
        // const currentTheme = "lightblue";
        const currentUser = {
            avatar: "https://graph.facebook.com/v2.6/3694920833893412/picture?type=large",
            isVerified: true,
            userRole: 4,
            hasStore: [ "5f477e32ee24401e3c8d200f" ],
            notifications: ["607c0ae9ad31635df6fbebcc", "sfd", "99999" ],
            followedStore: [],
            reviews: [],
            _id: "607b3025844b5c2aa56ac12a",
            fbUid: "3694920833893412",
            fbName: "Lin Julian",
            email: "sres3416@gmail.com",
            createdAt: "2021-04-17T18:59:49.843Z",
            updatedAt: "2021-04-29T16:59:38.102Z",
            __v: 1
        }

        setUser(currentUser);
    }, []);

    return (
        <ThemeContext.Provider value={{ user, setUser }}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => React.useContext(ThemeContext);
