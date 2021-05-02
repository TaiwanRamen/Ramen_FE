import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import { UserProvider } from './Context/UserContext';
import { NotificationProvider } from './Context/NotificationContext';
import Store from "./components/Store/Store";
import Footer from "./components/Footer/Footer";
import 'moment/locale/zh-tw';
import RamenNavbar from './components/RamenNavbar/RamenNavbar'
import Landing from "./components/Landing/Landing";
import TaipeiMetro from "./components/Metro/TaipeiMetro";
import {createStyles, makeStyles} from "@material-ui/core/styles";
// import DrawerUserSelectionTree from './components/Drawer/DrawerUserSelectionTree';

const useStyles = makeStyles(() =>
    createStyles({

      container:{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh",
        maxWidth: "1440px",
        width: "100%",
        padding:"0 15px",
        margin:"100px auto 0 auto"
      }
    }),
);

function App() {
  const classes = useStyles();
  useEffect(() => {
    document.title = "台灣拉麵倶樂部"
  }, [])

  return (
        <UserProvider >
          <Router>
            <div className="App">
              <NotificationProvider >
                <RamenNavbar />
              </NotificationProvider >
                <Switch>
                  {/* landing page only */}
                  <Route exact path="/">
                    <Landing/>
                    <Footer />
                  </Route>
                  <Route>
                    <div className={classes.container}>
                      <Switch>
                        <Route exact path="/stores">
                          <StoreIndex/>
                        </Route>
                        <Route exact path="/test">
                        </Route>
                        <Route exact path="/map">
                        </Route>
                        <Route path="/map/TaipeiMetro">
                          <TaipeiMetro/>
                        </Route>
                        <Route exact path="/map/KaohsiungMetro">

                        </Route>

                        <ProtectedRoute path="/create" component={Profile}/>
                        <ProtectedRoute path="/stores/:id" component={Store}/>
                        <ProtectedRoute path="/notification" component={Profile}/>
                        <ProtectedRoute path="/following" component={Profile}/>
                        <ProtectedRoute path="/wishlist" component={Profile}/>
                        <ProtectedRoute path="/commented" component={Profile}/>
                        <ProtectedRoute path="/setting" component={Profile}/>

                        <Route path="/user/login">
                          <Login />
                        </Route>
                        <Route exact path="/404" component={NotFound} />
                        <Redirect from='*' to="/404" />
                      </Switch>


                    </div>
                  </Route>
                </Switch>

            </div>
          </Router>
        </UserProvider>

  );
}

export default App;
