import {useTheme} from "../Context/testContextProvider";

const Test = () => {
    const { user, setUser } = useTheme()!;
    const userAfter = {
        avatar: "https://graph.facebook.com/v2.6/3694920833893412/picture?type=large",
        isVerified: true,
        userRole: 0,
        hasStore: [ "5f477e32ee24401e3c8d200f" ],
        notifications: ["607c0ae9ad31635df6fbebcc", "sfd", "99999" ],
        followedStore: [],
        reviews: [],
        _id: "607b3025844b5c2aa56ac12a",
        fbUid: "3694920833893412",
        fbName: "test Julian",
        email: "sres3416@gmail.com",
        createdAt: "2021-04-17T18:59:49.843Z",
        updatedAt: "2021-04-29T16:59:38.102Z",
        __v: 1
    }
    const handleMouseClick = () => {
        setUser(userAfter)
    }

    return (
        <div>
            <button  onClick={handleMouseClick}>
                clickme
            </button>
            <span>{user.fbName}</span>
        </div>
    );
};
export default Test;
