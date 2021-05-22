import {makeStyles, Theme} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import MetroStoreCard from "./MetroStoreCard";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 400;

const useStyles = (props:Props) => makeStyles( (theme:Theme) => ({
    drawer: {
        zIndex: 1200,
        width: drawerWidth,
        display:'inline-flex'
    },
    drawerPaper: {
        height:'100%',
        width: drawerWidth,
        top: props.navbarHeight || 64,
        backgroundColor: '#f8f9fa!important'
    },

    cardRoot: {
        margin:"0 auto 60px auto",
        overflowY: "scroll",
    },

    headerRoot: {
        margin:"1px 0",
        display: 'flex',
        alignItems: 'center',
        color:theme.palette.text.secondary,
        paddingTop: theme.spacing(1),
        justifyContent:"space-between",
    },
    headerText: {
        margin:theme.spacing(1, 3),
    },
    closeButton: {
        color: theme.palette.grey[500],
    },
    headLabel: {
        display: 'flex',
        alignItems: 'center',
        color:theme.palette.text.secondary,
    },


}));



type Props = {
    name?:string;
    isOpen: boolean;
    toggleDrawerOpen: () => void;
    navbarHeight?: number;
}

const MetroSideDrawer = (props: Props) => {
    const isDrawerOpen = props.isOpen;
    const classes = useStyles(props)();
    const toggleDrawerOpen = props.toggleDrawerOpen;
    const stores = ['apple','banana', 'cake', 'dog','eagle']
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={isDrawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.headerRoot}>
                <Typography variant="h5" className={classes.headerText}>
                    {props.name}
                </Typography>
                <IconButton onClick={toggleDrawerOpen} className={classes.closeButton} >
                    <CloseIcon />
                </IconButton>
            </div>
            <div className={classes.cardRoot}>
                { stores.map(store => <MetroStoreCard store={store}/>) }
            </div>
        </Drawer>

    );
};

export default MetroSideDrawer;
