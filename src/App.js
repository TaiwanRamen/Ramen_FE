import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import StoreIndex from './components/AllStores/StoreIndex';
import { useEffect, useState } from 'react';
import RamenNavbar from './components/Navbar/RamenNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import { UserProvider } from './Context/UserContext';
import Store from "./components/Store/Store";
import Footer from "./components/Footer/Footer";
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  useEffect(() => {
    document.title = "台灣拉麵倶樂部"
  }, [])

  return (
        <UserProvider>
          <Router>
            <div className="App">
              <RamenNavbar />
              <div className="container">
                <Switch>
                  <Route exact path="/">

                  </Route>
                  <Route exact path="/stores">
                    <StoreIndex/>
                  </Route>
                  <Route exact path="/test">

                  </Route>
                  <ProtectedRoute path="/create" component={Profile}/>
                  <ProtectedRoute path="/stores/:id" component={Store}/>

                  <Route path="/user/login">
                    <Login />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </UserProvider>
  );
}

export default App;
