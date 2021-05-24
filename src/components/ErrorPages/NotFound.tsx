import { Link } from "react-router-dom"
const NotFound = () => {
    return ( 
    <div className="row">
        <div className="col-md-3 fix">
            <h2>Sorry</h2>
            <p>That is not found</p>
            <Link to='/'>go back</Link>
        </div>
    </div> );
}
 
export default NotFound;