import Divider from "@material-ui/core/Divider";
import { makeStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import DrawerMidSection from "./DrawerMidSection";
import DrawerBottomSection from "./DrawerBottomSection";
import DrawerUser from "./DrawerUser";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";

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

const userSection = (toggleDrawerOpen:()=>void) => {
    return (
        <>
            <DrawerUser toggleDrawerOpen={toggleDrawerOpen}/>
            <Divider />
        </>
    )
}

type Props = {
    isOpen: boolean;
    toggleDrawerOpen?: () => void;
    navbarHeight?: number;
}

const SideDrawer = (props: Props) => {
    const {user} = useContext(UserContext);
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

            { user && userSection }

            <DrawerMidSection toggleDrawerOpen={props.toggleDrawerOpen}/>

            <Divider />

            <DrawerBottomSection toggleDrawerOpen={props.toggleDrawerOpen}/>
        </Drawer>

    );
};

export default SideDrawer;
