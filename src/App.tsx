import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NotificationProvider} from './Context/NotificationContext';

import Store from "./components/Store/Store";
import Footer from "./components/Footer/Footer";
import 'moment/locale/zh-tw';
import RamenNavbar from './components/RamenNavbar/RamenNavbar'
import Landing from "./components/Landing/Landing";
import TaipeiMetro from "./components/Metro/TaipeiMetro";
import KaohsiungMetro from "./components/Metro/KaohsiungMetro";
import {makeStyles} from "@material-ui/core/styles";
import Map from "./components/Map/Map";
import LoginPage from "./components/Login/LoginPage";
import UserFollowingPage from "./components/UserFollowing/UserFollowingPage";
import {UserProvider} from "./Context/UserContext";
import {Container} from "@material-ui/core";

// import DrawerUserSelectionTree from './components/Drawer/DrawerUserSelectionTree';

const useStyles = makeStyles(() => ({
        container: {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            maxWidth: "1440px",
            width: "80%",
            padding: "0 15px",
            margin: "100px auto 0 auto",
        }
    }),
);

function App() {
    const classes = useStyles();
    useEffect(() => {
        document.title = "台灣拉麵倶樂部";

    }, []);

    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <NotificationProvider>
                        <RamenNavbar/>
                    </NotificationProvider>
                    <Switch>
                        {/* landing page only */}
                        <Route exact path="/">
                            <Landing/>
                            <Footer/>
                        </Route>
                        <Route>
                            <Container className={classes.container}>

                                <Switch>
                                    <Route exact path="/stores">
                                        <StoreIndex/>
                                    </Route>

                                    <Route exact path="/test">
                                        <UserFollowingPage/>
                                    </Route>

                                    <Route exact path="/map">
                                        <Map/>
                                    </Route>
                                    <Route path="/map/TaipeiMetro">
                                        <TaipeiMetro/>
                                    </Route>
                                    <Route path="/map/KaohsiungMetro">
                                        <KaohsiungMetro/>
                                    </Route>

                                    <Route path="/login">
                                        <LoginPage/>
                                    </Route>
                                    <ProtectedRoute path="/create" component={Profile}/>
                                    <ProtectedRoute path="/stores/:id" component={Store}/>
                                    <ProtectedRoute path="/notification" component={Profile}/>
                                    <ProtectedRoute path="/following" component={UserFollowingPage}/>
                                    <ProtectedRoute path="/wishlist" component={Profile}/>
                                    <ProtectedRoute path="/commented" component={Profile}/>
                                    <ProtectedRoute path="/setting" component={Profile}/>


                                    <Route exact path="/404" component={NotFound}/>
                                    <Redirect from='*' to="/404"/>
                                </Switch>


                            </Container>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
