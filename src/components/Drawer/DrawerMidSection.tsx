import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StoreIcon from "@material-ui/icons/Store";
import {Link as RouterLink} from "react-router-dom";
import DrawerMapSection from './DrawerMapSection';
type Props = {
    toggleDrawerOpen: () => void
}
const DrawerMidSection = (props:Props) => {

    return (
        <List>
            <ListItem button  component={RouterLink} onClick={props.toggleDrawerOpen} to="/stores" key="map">
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="店家列表" />
            </ListItem>
            <DrawerMapSection toggleDrawerOpen={props.toggleDrawerOpen}/>
        </List>
    );
};

export default DrawerMidSection;
