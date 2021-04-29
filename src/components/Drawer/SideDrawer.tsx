import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import SendIcon from "@material-ui/icons/Send";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, Theme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import StoreIcon from '@material-ui/icons/Store';
import {Link as RouterLink} from "react-router-dom";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CommentIcon from '@material-ui/icons/Comment';
import MapIcon from '@material-ui/icons/Map';
const drawerWidth = 300;

const useStyles = (props:Props) => makeStyles( (theme:Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: props.navbarHeight || 64,
        backgroundColor: '#f8f9fa!important'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        //justifyContent: 'flex-end',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedText:{
        fontSize:"0.9rem"
    },
    inline: {
        display: 'inline',
    },

    link:{
        fontSize:100,
        color:theme.palette.text.primary,
        "&:hover":{
            color:theme.palette.text.primary,
        }
    },
    bottomPush: {

    }
}));

type Props = {
    isOpen: boolean;
    navbarHeight?: number
}

const SideDrawer = (props: Props) => {
    const isDrawerOpen = props.isOpen;
    const classes = useStyles(props)();
    const [collapseOpen, setCollapseOpen] = React.useState(false);


    const handleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={isDrawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
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
                        <ListItem button className={`${classes.nested} ${classes.link}` } component={RouterLink} to="/" key="notification">
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
                        <ListItem button className={`${classes.nested} ${classes.link}` } component={RouterLink} to="/follow" key="follow">
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="追蹤清單" />
                        </ListItem>
                        <ListItem button className={`${classes.nested} ${classes.link}` } component={RouterLink} to="/follow" key="follow">
                            <ListItemIcon>
                                <PlaylistAddIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="願望清單" />
                        </ListItem>
                        <ListItem button className={`${classes.nested} ${classes.link}` } component={RouterLink} to="/follow" key="follow">
                            <ListItemIcon>
                                <CommentIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.nestedText }} primary="已評論店家" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="地圖" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="店家列表" />
                </ListItem>
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
                className={classes.bottomPush}
            >
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="設定" />
                </ListItem>
            </List>
        </Drawer>

    );
};

export default SideDrawer;
