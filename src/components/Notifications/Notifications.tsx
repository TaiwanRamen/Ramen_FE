import {withRouter} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import useFetch from "../../customHooks/UseFetch";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {INotification} from "../../types/INotification";
import NotificationStrip from "./NotificationStrip";

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

type NotificationsRes = {
    notifications: INotification[],
    current: number,
    pages: number
}

const Notifications = () => {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    //const {user} = useUser()!;

    const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const options = {
        key: "stores",
        url: process.env.REACT_APP_BE_URL + "/api/v1/user/notifications",
        requestQuery: {
            page: page,
        }
    }

    const {data} = useFetch<NotificationsRes>(options);
    return data?.notifications ?
        <>
            <p className={classes.header}>通知</p>
            {
                data.notifications.map((notification: INotification) => {
                    return <NotificationStrip notification={notification}/>
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

export default withRouter(Notifications);