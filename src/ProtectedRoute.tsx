import { Route, Redirect,  } from 'react-router-dom';

import {useUser} from "./Context/UserContext";

const ProtectedRoute = ({ component:Component, ...rest } : any) => {
    const { user } = useUser()!;
    return (
        <Route {...rest} render={(props) => {
            if (user) {
                return <Component />;
            } else {
                return ( <Redirect to ={ { pathname:'/', state: {from: props.location} }}/> );
            }
        }}/>
    );
}
 
export default ProtectedRoute;