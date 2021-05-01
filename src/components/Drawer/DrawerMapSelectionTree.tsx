import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";

declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}


const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:focus > $content, &$selected > $content': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
                color: 'var(--tree-view-color)',
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
        },
        labelRoot: {
            margin:"5px 0",
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),

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


type Props = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps> | string;
    labelInfo?: string;
    labelText: string;
    avatar?: string;
};

function StyledTreeItem(props: Props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon} />}
                    <Typography  className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {labelInfo && <Chip
                        variant="outlined"
                        size="small"
                        clickable
                        label={labelInfo}
                        color="secondary"
                    />}
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
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

function StyledTreeItemHead(props: Props) {
    const classes = useTreeItemStyles();
    const classesForHead = useTreeItemStylesForHead();
    const { avatar, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {avatar && <Avatar alt="avatar" src={avatar} className={classesForHead.avatar}/> }
                    {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon} />}
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    {labelInfo && <Chip
                        variant="outlined"
                        size="small"
                        clickable
                        label={labelInfo}
                        color="secondary"
                    />}
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
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

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
        >

            <StyledTreeItemHead
                nodeId="0"
                labelText="Julian Lin"
                avatar={"https://graph.facebook.com/v2.6/3694920833893412/picture?type=large"}
                labelInfo="90"
                color="#1a73e8"
                bgColor="#e8f0fe"
            >
                <StyledTreeItem
                    nodeId="3"
                    labelText="店家列表"
                    labelIcon={SupervisorAccountIcon}
                    labelInfo="90"
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                />
                <StyledTreeItem
                    nodeId="4"
                    labelText="Updates"
                    labelIcon={SupervisorAccountIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                />
            </StyledTreeItemHead>
            <Divider />
            <StyledTreeItem
                nodeId="5"
                labelText="Updates"
                labelIcon={SupervisorAccountIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
            />
            <StyledTreeItem
                nodeId="6"
                labelText="Updates"
                labelIcon={SupervisorAccountIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
            />
            <Divider />
            <ListSubheader  id="nested-list-subheader">
                使用者設定
            </ListSubheader>
            <StyledTreeItem
                nodeId="7"
                labelText="Updates"
                labelIcon={SupervisorAccountIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
            />
        </TreeView>
    );
}
