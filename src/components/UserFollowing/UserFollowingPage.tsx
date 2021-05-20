import {makeStyles} from "@material-ui/core/styles";
import FollowingStrip from "./FollowingStrip";
import {useUser} from "../../Context/UserContext";


const useStyles = makeStyles(() => ({

        header: {margin: 30},
    }),
);
const UserFollowingPage = () => {
    const classes = useStyles();
    const {user} = useUser()!;
    const followedStores = user?.followedStore;
    console.log("followstore:", followedStores)

    return (
        <div>
            <h1 className={classes.header}>追蹤清單</h1>
            {
                followedStores && followedStores.map((store:string) => {
                    <FollowingStrip store={store}/>
                })
            }

        </div>
    );
};

export default UserFollowingPage;
