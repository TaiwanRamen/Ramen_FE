import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import {Link as RouterLink} from "react-router-dom";

type Props = {
    toggleDrawerOpen?: () => void
}
const DrawerBottomSection = (props:Props) => {

    return (
        <List>
            <ListSubheader  id="nested-list-subheader">
                使用者設定
            </ListSubheader>
            <ListItem button  component={RouterLink} onClick={props.toggleDrawerOpen} to="/map" key="map">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="設定" />
            </ListItem>

        </List>
    );
};

export default DrawerBottomSection;
