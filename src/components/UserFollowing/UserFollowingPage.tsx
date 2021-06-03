import {makeStyles, Theme} from "@material-ui/core/styles";
import useFetch from "../../customHooks/UseFetch";
import Pagination from "@material-ui/lab/Pagination";
import {ChangeEvent, useState} from "react";
import {IStore} from "../../types/IStore";
import FollowingStrip from "./FollowingStrip";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            justifyContent: "center",
            margin: "3rem 0",
            display: "flex",
        },
        header: {
            textAlign: "left",
            float: "none",
            color: "#323232",
            margin:16,
            fontSize: 24,
        },
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        pagination: {
            backgroundColor: "transparent",
            "& ul > li > button": {
                backgroundColor: "white"
            }
        }
    })
);

type Stores = {
    current: number;
    pages: number;
    stores: IStore[]
};
const UserFollowingPage = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    //const {user} = useUser()!;

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.REACT_APP_BE_URL + "/api/v1/user/followedStore",
        requestQuery: {
            page: page,
        }
    }

    const {data} = useFetch<Stores>(options);
    return data?.stores ?
        <>
            <p className={classes.header}>追蹤清單</p>
            {
                data.stores.map((store: IStore) => {
                    return <FollowingStrip store={store}/>
                })
            }
            <div className={classes.root}>
                <Pagination count={data?.pages}
                            className={classes.pagination}
                            page={page}
                            size="large"
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}/>
            </div>
        </> : null

};

export default withRouter(UserFollowingPage);
