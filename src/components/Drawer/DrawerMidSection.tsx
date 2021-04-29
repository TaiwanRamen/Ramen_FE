import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MapIcon from "@material-ui/icons/Map";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StoreIcon from "@material-ui/icons/Store";
import {Link as RouterLink} from "react-router-dom";

type Props = {
    toggleDrawerOpen?: () => void
}
const DrawerMidSection = (props:Props) => {

    return (
        <List>
            <ListItem button  component={RouterLink} onClick={props.toggleDrawerOpen} to="/map" key="map">
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="地圖" />
            </ListItem>
            <ListItem button  component={RouterLink} onClick={props.toggleDrawerOpen} to="/stores" key="map">
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="店家列表" />
            </ListItem>

        </List>
    );
};

export default DrawerMidSection;
