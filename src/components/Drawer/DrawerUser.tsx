import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
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


const useStyles = makeStyles((theme:Theme) =>
    createStyles({

    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedText:{
        fontSize:"0.9rem"
    },
    inline: {
        display: 'inline',
    },
}));

type Props = {
    toggleDrawerOpen?: () => void
}

const DrawerUser = (props:Props) => {
    const classes = useStyles();
    const [collapseOpen, setCollapseOpen] = React.useState(false);


    const handleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <List>
            <ListItem button onClick={handleCollapse} key="user-info">
                <ListItemAvatar>
                    <Avatar alt="Julian" src="" />
                </ListItemAvatar>
                <ListItemText
                    primary="Julian Lin"
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
                <Chip
                    size="small"
                    clickable
                    label="99+"
                    color="secondary"
                />
                {collapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={RouterLink} to="/" key="notification">
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="通知" />
                        <Chip
                            size="small"
                            clickable
                            label="99+"
                            color="secondary"
                        />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={props.toggleDrawerOpen}  to="/follow" key="follow">
                        <ListItemIcon>
                            <BookmarkIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="追蹤清單" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={props.toggleDrawerOpen}  to="/follow" key="follow">
                        <ListItemIcon>
                            <PlaylistAddIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="願望清單" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={props.toggleDrawerOpen} to="/follow" key="follow">
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

export default DrawerUser;
