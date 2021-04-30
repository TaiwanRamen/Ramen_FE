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
// import Metro from './components/Metro/Metro'

function App() {
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
                    <div className="container">
                      <Switch>
                        <Route exact path="/stores">
                          <StoreIndex/>
                        </Route>
                        <Route exact path="/test">
                          {/*<Metro />*/}
                        </Route>
                        <ProtectedRoute path="/create" component={Profile}/>
                        <ProtectedRoute path="/stores/:id" component={Store}/>

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
