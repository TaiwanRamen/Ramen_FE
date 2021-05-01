import React, {useContext} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {UserContext} from "../../Context/UserContext";
import {NotificationContext} from "../../Context/NotificationContext";
import {Link as RouterLink} from "react-router-dom";


const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:focus > $content, &$selected > $content ': {
                backgroundColor: `#e8f0fe`,
                color: '#1a73e8',
            },
            '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
                backgroundColor: 'transparent',
            },
        },
        content: {
            padding:5,
            margin:"5px 0",
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },

        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {
        },
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
            "&:hover":{
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelRoot: {
            margin:"5px 0",
            display: 'flex',
            alignItems: 'center',
            color:theme.palette.text.secondary,
            padding: theme.spacing(0.5, 0),
            "&:hover":{
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontSize:'1rem',
            fontWeight: 'inherit',
            flexGrow: 1,
        },
    }),
);

const useTreeItemStylesForHead = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            marginRight: theme.spacing(1),
        },
        headLabel: {

        }
    }),
);


type StyledTreeItemProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelInfo?: string | number | null;
    labelText: string;
    avatar?: string;
    to:string;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, to, ...other } = props;

    // @ts-ignore
    return (
        <TreeItem
            label={
                <RouterLink className={classes.labelRoot}  to={to}>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon} />}
                    <Typography  className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {!!labelInfo && <Chip
                        variant="outlined"
                        size="small"
                        clickable
                        label={labelInfo}
                        color="secondary"
                    />}
                </RouterLink>
            }
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}
type StyledTreeItemHeadProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelInfo?: string | number | null;
    labelText: string;
    avatar?: string;
};


function StyledTreeItemHead(props: StyledTreeItemHeadProps) {
    const classes = useTreeItemStyles();
    const classesForHead = useTreeItemStylesForHead();
    const { avatar, labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

    // @ts-ignore
    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {avatar && <Avatar alt="avatar" src={avatar} className={classesForHead.avatar}/> }
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon} />}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {!!labelInfo && <Chip
                        variant="outlined"
                        size="small"
                        clickable
                        label={labelInfo}
                        color="secondary"
                    />}
                </div>
            }
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

const useStyles = makeStyles(
    createStyles({
        root: {
            height: 264,
            flexGrow: 1,
            maxWidth: 240,
        },
    }),
);

export default function CustomTreeView() {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const { notificationCount, setNotificationCount } = useContext(NotificationContext);
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
        >

            <StyledTreeItemHead
                nodeId="0"
                labelText="Julian Lin"
                avatar={user?.avatar}
                labelInfo={notificationCount}
            >
                <StyledTreeItem
                    nodeId="1"
                    labelText="通知"
                    labelIcon={NotificationsIcon}
                    labelInfo={notificationCount}
                    onClick={() => setNotificationCount(0)}
                    to="/notifications"
                />
                <StyledTreeItem
                    nodeId="2"
                    labelText="追蹤清單"
                    labelIcon={BookmarkIcon}
                    to="/following"
                />
                <StyledTreeItem
                    nodeId="3"
                    labelText="願望清單"
                    labelIcon={PlaylistAddIcon}
                    to="/wishlist"
                />
                <StyledTreeItem
                    nodeId="4"
                    labelText="已評論店家"
                    labelIcon={CommentIcon}
                    to="/commented"
                />
            </StyledTreeItemHead>

        </TreeView>
    );
}
