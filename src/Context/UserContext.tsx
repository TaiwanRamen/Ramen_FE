import {useState, createContext, useMemo, PropsWithChildren} from 'react';
import {IUser} from "../types/IUser";

export type UserContent = {
    user?: IUser | null,
    setUser: (user:IUser) => void
}

export const UserContext = createContext<UserContent>({
    user: null,
    setUser: () => {}
});

export const UserProvider = (props:PropsWithChildren<any>) => {

    const userTest = {
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
    const [user, setUser] = useState<IUser>(userTest);

    //const [user, setUser] = useState<IUser>();
    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={providerUser}>
            {props.children}
        </UserContext.Provider>
    );
};
