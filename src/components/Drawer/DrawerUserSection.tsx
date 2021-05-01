import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import React, {useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {UserContext} from "../../Context/UserContext";
import {NotificationContext} from "../../Context/NotificationContext";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({

    nested: {
        paddingLeft: theme.spacing(4),
        "&:hover":{
            color:"inherit",
        }
    },
    nestedText:{
        fontSize:"0.9rem",
    },
    inline: {
        display: 'inline',
    },
}));

type Props = {
    toggleDrawerOpen: () => void;

}

const DrawerUserSection = (props:Props) => {
    const {user} = useContext(UserContext);
    const classes = useStyles();
    const { notificationCount, setNotificationCount } = useContext(NotificationContext);
    const [notificationBadgeDisplay, setNotificationBadgeDisplay] = useState("block");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggleDrawerOpen = props.toggleDrawerOpen;

    const handleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    const handleNotificationClick = () => {
        setNotificationCount(0);
        setNotificationBadgeDisplay("none");
        toggleDrawerOpen();
    }

    const notificationBadge = () => {
        return (
            <Box display={notificationBadgeDisplay}>
                <Chip
                    size="small"
                    clickable
                    label={notificationCount}
                    color="secondary"
                />
            </Box>
        )
    }

    return (
        <List>
            <ListItem button onClick={handleCollapse} key="user-info">
                <ListItemAvatar>
                    <Avatar alt={user?.fbName} src={user?.avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={user?.fbName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                早上好
                            </Typography>
                        </React.Fragment>
                    }
                />
                {notificationBadge()}
                {collapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={RouterLink} to="/" key="notification" >
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="通知" onClick={handleNotificationClick} />
                        {notificationBadge()}

                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen}  to="/follow" key="follow">
                        <ListItemIcon>
                            <BookmarkIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="追蹤清單" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen}  to="/wishList" key="wishList">
                        <ListItemIcon>
                            <PlaylistAddIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="願望清單" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen} to="/commented" key="commented">
                        <ListItemIcon>
                            <CommentIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="已評論店家" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default DrawerUserSection;
