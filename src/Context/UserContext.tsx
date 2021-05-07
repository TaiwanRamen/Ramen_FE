import {useState, ReactNode, SetStateAction, Dispatch, createContext} from 'react';
import {IUser} from "../types/IUser";

type Context = {
    user?: IUser | null,
    setUser: Dispatch<SetStateAction<Context>>
}
const initialContext: Context = {
    user:{
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
    },
    setUser: ():void => {
        throw new Error("setContext must be overiden");
    }
}
const UserContext = createContext<Context>(initialContext);

type Props = {
    children?: ReactNode;
}

const GlobalUserProvider = ({children}: Props): JSX.Element => {

    const [user, setUser] = useState<Context>(initialContext);

    //const [user, setUser] = useState<IUser>();
    // const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <UserContext.Provider value={{...user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, GlobalUserProvider}
