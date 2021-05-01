import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useState} from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";

import TaiwanIcon from "../../static/taiwan.svg";
import TaipeiMetroIcon from "../../static/taipei-metro-logo.svg";
import KaohsiungMetroIcon from "../../static/kaohsiung-metro-logo.svg";
// import TaipeiMetroIcon from "../../static/taipei-metro-logo.svg";

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
        imageIcon: {
            width: "24px",
            height: "24px",

        },
        listItemIcon: {
            minWidth: 36,
        }
    }));

type Props = {
    toggleDrawerOpen: () => void;
}

const DrawerMapSection = (props:Props) => {
    const classes = useStyles();
    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggleDrawerOpen = props.toggleDrawerOpen;

    const handleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <List>
            <ListItem button onClick={handleCollapse} key="map">
                <ListItemIcon>
                    <FontAwesomeIcon icon={faMapMarkedAlt}/>
                </ListItemIcon>
                <ListItemText primary="地圖" />
                {collapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen}  to="/map" key="follow">
                        <ListItemIcon >
                            <img className={classes.imageIcon} src={TaiwanIcon} alt={"Taiwan icon"}/>
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="臺灣地圖" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen}  to="/map/TaipeiMetro" key="follow">
                        <ListItemIcon>
                            <img className={classes.imageIcon} src={TaipeiMetroIcon} alt={"Taipei Metro icon"}/>
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="臺北捷運地圖" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={RouterLink} onClick={toggleDrawerOpen} to="/map/KaohsiungMetro" key="follow">
                        <ListItemIcon>
                            <img className={classes.imageIcon} src={KaohsiungMetroIcon} alt={"Kaohsiung Metro icon"}/>
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.nestedText }} primary="高雄捷運地圖" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default DrawerMapSection;
