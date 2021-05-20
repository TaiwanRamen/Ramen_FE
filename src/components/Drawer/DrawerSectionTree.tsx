import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, {TreeItemProps} from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {SvgIconProps} from '@material-ui/core/SvgIcon';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CommentIcon from "@material-ui/icons/Comment";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {useNotification} from "../../Context/NotificationContext";
import {Link as RouterLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import TaiwanIcon from "../../static/taiwan.svg";
import TaipeiMetroIcon from "../../static/taipei-metro-logo.svg";
import KaohsiungMetroIcon from "../../static/kaohsiung-metro-logo.svg";
import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import {useUser} from "../../Context/UserContext";

const useTreeItemStyles = makeStyles((theme: Theme) => ({
        root: {
            marginTop: "10px",
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
            padding: 3,
            margin: "1px 0",
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
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelRoot: {
            margin: "5px 0",
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            padding: theme.spacing(0.5, 0),
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelIcon: {
            width: "24px",
            height: "24px",
            marginRight: theme.spacing(2),
        },
        labelText: {
            fontSize: '0.9rem',
            fontWeight: 500,
            flexGrow: 1,
        },
    }),
);


type StyledTreeItemProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelIconFA?: IconProp;
    labelIconSVG?: string;
    labelInfo?: string | number | null;
    labelText: string;
    avatar?: string;
    to: string;
};

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const {labelIconSVG, labelIconFA, labelText, labelIcon: LabelIcon, labelInfo, to, ...other} = props;

    // @ts-ignore
    return (
        <TreeItem
            label={
                <RouterLink className={classes.labelRoot} to={to}>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                    {labelIconFA && <FontAwesomeIcon icon={labelIconFA} color="inherit" className={classes.labelIcon}/>}
                    {labelIconSVG && <img className={classes.labelIcon} src={labelIconSVG} alt="alt"/>}
                    <Typography className={classes.labelText}>
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

const useTreeItemStylesForHead = makeStyles((theme: Theme) => ({
        avatar: {
            marginRight: theme.spacing(2),
        },
        headLabel: {
            margin: "5px 0",
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            fontSize: '0.9rem',
            padding: theme.spacing(0.5, 0),
            "&:hover": {
                color: '#1a73e8',
                textDecoration: "none",
            }
        },
        labelText: {
            fontSize: '1rem',
            fontWeight: 500,
            flexGrow: 1,
        },
    }),
);

type StyledTreeUserHeadProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelInfo?: string | number | null;
    labelText?: string;
    avatar?: string;
};

function StyledTreeUserHead(props: StyledTreeUserHeadProps) {
    const classes = useTreeItemStyles();
    const classesForHead = useTreeItemStylesForHead();
    const {avatar, labelText, labelIcon: LabelIcon, labelInfo, ...other} = props;

    // @ts-ignore
    return (
        <TreeItem
            label={
                <div className={classesForHead.headLabel}>
                    <Avatar alt="avatar" src={avatar} className={classesForHead.avatar}/>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                    <Typography variant="body2" className={classesForHead.labelText}>
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


type StyledTreeItemHeadProps = TreeItemProps & {
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelIconFA?: IconProp;
    labelIconSVG?: string;
    labelInfo?: string | number | null;
    labelText?: string;
};

function StyledTreeItemHead(props: StyledTreeItemHeadProps) {
    const classes = useTreeItemStyles();
    const classesForHead = useTreeItemStylesForHead();
    const {labelText, labelIcon: LabelIcon, labelIconFA, labelIconSVG, labelInfo, ...other} = props;

    // @ts-ignore
    return (
        <TreeItem
            label={
                <div className={classesForHead.headLabel}>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon}/>}
                    {labelIconFA && <FontAwesomeIcon icon={labelIconFA} color="inherit" className={classes.labelIcon}/>}
                    {labelIconSVG && <img className={classes.labelIcon} src={labelIconSVG} alt="alt"/>}
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


const useStyles = makeStyles(() => ({
        root: {
            // height: 264,
            // flexGrow: 0.8,
            maxWidth: 240,
        },
    }),
);

type Props = {
    toggleDrawerOpen: () => void;
}


export default function CustomTreeView(props: Props) {
    const classes = useStyles();
    const {user} = useUser()!;
    const {notificationCount, setNotificationCount} = useNotification()!;
    const toggleDrawerOpen = props.toggleDrawerOpen;

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
        >

            {!!user && <>
                <StyledTreeUserHead
                    nodeId="0"
                    labelText={user?.fbName}
                    avatar={user?.avatar}
                    labelInfo={notificationCount}
                >
                    <StyledTreeItem
                        nodeId="1"
                        labelText="通知"
                        labelIcon={NotificationsIcon}
                        labelInfo={notificationCount}
                        onClick={() => {
                            setNotificationCount(0);
                            toggleDrawerOpen()
                        }}
                        to="/notification"
                    />
                    <StyledTreeItem
                        nodeId="2"
                        labelText="追蹤清單"
                        labelIcon={BookmarkIcon}
                        to="/following"
                        onClick={toggleDrawerOpen}
                    />
                    <StyledTreeItem
                        nodeId="3"
                        labelText="願望清單"
                        labelIcon={PlaylistAddIcon}
                        to="/wishlist"
                        onClick={toggleDrawerOpen}
                    />
                    <StyledTreeItem
                        nodeId="4"
                        labelText="已評論店家"
                        labelIcon={CommentIcon}
                        to="/commented"
                        onClick={toggleDrawerOpen}
                    />
                </StyledTreeUserHead>
                <Divider/>
            </>
            }

            <StyledTreeItemHead
                nodeId="5"
                labelText="地圖"
                labelIconFA={faMapMarkedAlt}
            >
                <StyledTreeItem
                    nodeId="6"
                    labelText="臺灣地圖"
                    to="/map"
                    labelIconSVG={TaiwanIcon}
                    onClick={toggleDrawerOpen}
                />
                <StyledTreeItem
                    nodeId="7"
                    labelText="臺北捷運地圖"
                    labelIconSVG={TaipeiMetroIcon}
                    to="/map/TaipeiMetro"
                    onClick={toggleDrawerOpen}
                />
                <StyledTreeItem
                    nodeId="8"
                    labelText="高雄捷運地圖"
                    labelIconSVG={KaohsiungMetroIcon}
                    to="/map/KaohsiungMetro"
                    onClick={toggleDrawerOpen}
                />
            </StyledTreeItemHead>

            {user && <>
                <Divider/>
                <StyledTreeItem
                    nodeId="9"
                    labelText="用戶設定"
                    labelIcon={SettingsIcon}
                    to="/setting"
                    onClick={toggleDrawerOpen}
                />
            </>
            }

        </TreeView>

    );
}
