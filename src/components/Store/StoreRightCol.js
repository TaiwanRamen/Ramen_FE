import React from 'react';
import {Tabs, Tab, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";

const StoreRightCol = (props) => {
    const [user, setUser] = useContext(UserContext);

    const followOrUnFollow = () => {
        console.log("hi");
    }
    return (
        <div className="col-md-9 h-scroll scrollbar-light-blue">
            <div className="thumbnail">`
                <div className="caption-full">
                    <Button variant="info" className="badge-pill mr-2" as={Link} to="/stores?search=">{props.store.city}</Button>
                    <Button variant="primary" className="m-2" onClick={followOrUnFollow} >追蹤</Button>

                    <Tabs id="controlled-tab-example">
                        <Tab eventKey="home" title="Home">

                        </Tab>
                        <Tab eventKey="profile" title="Profile">

                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default StoreRightCol;