import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import NotFound from '../src/components/ErrorPages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NotificationProvider} from './Context/NotificationContext';

import Store from "./components/Store/Store";
import Footer from "./components/Footer/Footer";
import RamenNavbar from './components/RamenNavbar/RamenNavbar'
import Landing from "./components/Landing/Landing";
import TaipeiMetro from "./components/Metro/TaipeiMetro";
import KaohsiungMetro from "./components/Metro/KaohsiungMetro";
import {makeStyles} from "@material-ui/core/styles";
import Map from "./components/Map/Map";
import LoginPage from "./components/Login/LoginPage";
import UserFollowingPage from "./components/UserFollowing/UserFollowingPage";
import {Container} from "@material-ui/core";
import NetworkInterceptors from "./utils/NetworkInterceptors";
import UnAuthorized from "./components/ErrorPages/UnAuthorized";
import ErrorPage from "./components/ErrorPages/ErrorPage";
import AddReviewPage from "./components/Reviews/AddReviewPage";


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
    NetworkInterceptors();
    return (
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

                                {/*user section*/}
                                <ProtectedRoute path="/notification" component={Profile}/>
                                <ProtectedRoute path="/following" component={UserFollowingPage}/>
                                <ProtectedRoute path="/wishlist" component={Profile}/>
                                <ProtectedRoute path="/commented" component={Profile}/>
                                <ProtectedRoute path="/setting" component={Profile}/>


                                <ProtectedRoute path="/stores/:id/newReview" component={AddReviewPage}/>
                                <ProtectedRoute path="/stores/new" component={Profile}/>
                                <ProtectedRoute path="/stores/:id" component={Store}/>



                                <Route exact path="/notFound" component={NotFound}/>
                                <Route exact path="/unAuthorized" component={UnAuthorized}/>
                                <Route exact path="/error" component={ErrorPage}/>
                                <Redirect from='*' to="/notFound"/>
                            </Switch>


                        </Container>
                    </Route>
                </Switch>
            </div>
    );
}

export default App;
