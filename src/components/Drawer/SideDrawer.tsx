import Divider from "@material-ui/core/Divider";
import { makeStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import DrawerMid from "./DrawerMid";
import DrawerBottom from "./DrawerBottom";
import DrawerUser from "./DrawerUser";

const drawerWidth = 250;

const useStyles = (props:Props) => makeStyles( () => ({
    drawer: {
        zIndex: 1200,
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        height:'100%',
        width: drawerWidth,
        top: props.navbarHeight || 64,
        backgroundColor: '#f8f9fa!important'
    },
}));

type Props = {
    isOpen: boolean;
    navbarHeight?: number;
}

const SideDrawer = (props: Props) => {
    const isDrawerOpen = props.isOpen;
    const classes = useStyles(props)();

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

            <DrawerUser />

            <Divider />

            <DrawerMid />

            <Divider />

            <DrawerBottom/>
        </Drawer>

    );
};

export default SideDrawer;
