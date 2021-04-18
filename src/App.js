import './App.css';
import Home from './Home';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import { useEffect, useState } from 'react';
import RamenNavbar from './components/Navbar/RamenNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import { UserProvider } from './Context/UserContext';
import Loading from "./components/Loading/Loading";
import ShowRatings from "./components/Ratings/ShowRatings";
function App() {
  useEffect(() => {
    document.title = "台灣拉麵倶樂部"
  }, []);

  return (
      <UserProvider>
        <Router>
          <div className="App">
            <RamenNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Loading />
                </Route>
                <Route exact path="/stores">
                  <StoreIndex/>
                </Route>
                <ProtectedRoute path="/create" component={Profile}/>


                <Route path="/user/login">
                  <Login />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </UserProvider>
  );
}

export default App;
