import {Redirect, Route} from 'react-router-dom';
import {useUser} from "./Context/UserContext";


const ProtectedRoute = ({ component:Component, path, ...rest } : any) => {
    const { user } = useUser()!;

    console.log(user);
    return (
        <Route path={path} {...rest}
               render={props => {
                   return user ? (<Component {...props} />)  : (<Redirect to ={ { pathname:'/login', state: {from: props.location} }}/>)
               }}
        />
    );

}
 
export default ProtectedRoute;