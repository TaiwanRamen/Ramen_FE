import React from 'react';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import SideDrawer from "../Drawer/SideDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Backdrop} from "@material-ui/core";
import UserSection from "./UserSection";
import './RamenNav.css';

const navbarHeight = 64;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: '#f8f9fa!important',
            color:theme.palette.text.secondary,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            zIndex: 1300,
            height: navbarHeight
        },
        appBarShift: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(0),
        },
        grow: {
            flexGrow: 1,
        },
        title: {
            fontFamily: "JFOpen",
            fontSize:"1.25rem",
            color:theme.palette.text.primary,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            "&:hover":{
                color:theme.palette.text.primary,
            }
        },
        backdrop: {
            zIndex: 1100,
            color: '#fff',
        },
    }),
);

const RamenNavbar = () => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <div className={classes.grow}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton)}
                    >
                        {!drawerOpen ? <MenuIcon /> : <ChevronLeftIcon />}
                    </IconButton>

                    <Button size="large" component={RouterLink} className={classes.title}  to="/">
                        <img src="/images/ramen.png" alt="" width="32px" height="32px" className="mx-2"/>
                        台灣拉麵倶樂部
                    </Button>

                    <div className={classes.grow} />

                    <UserSection />

                </Toolbar>
            </AppBar>

            <SideDrawer isOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} navbarHeight={navbarHeight} />
            <Backdrop className={classes.backdrop} open={drawerOpen} onClick={toggleDrawerOpen} />
        </div>
    );
}
export default RamenNavbar;