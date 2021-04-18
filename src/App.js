import './App.css';
import Home from './Home';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import Pageination from './components/AllStores/AllStores';
import { useEffect, useState } from 'react';
import RamenNavbar from './components/Navbar/RamenNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.title = "台灣拉麵倶樂部"
  }, []);

  return (
    <Router>
      <div className="App">
        <RamenNavbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
              <Pageination/>
            </Route>
            <ProtectedRoute path="/create" isAuth={isAuth} component={Profile}/>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
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
  );
}

export default App;
