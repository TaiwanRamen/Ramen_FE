import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MapIcon from "@material-ui/icons/Map";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import StoreIcon from "@material-ui/icons/Store";


const DrawerMid = () => {
    return (
        <List>
            <ListItem button>
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="地圖" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="店家列表" />
            </ListItem>

        </List>
    );
};

export default DrawerMid;
