import React, {useContext} from 'react';
import {UserContext} from "../../Context/UserContext";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const UserInfoAndLogout = () => {
    const [user, setUser] = useContext(UserContext);
    const dropdownMenu = <span>通知<span className="badge">{user.notifications.length}</span></span>;
    console.log(user);
    const dropDownItems = user.notifications.map(notification => {
        return <NavDropdown.Item href="#action/3.1" key={"1"}>Action</NavDropdown.Item>
    })
    return (
        <Nav className="mr-sm-2">

            <NavDropdown title={dropdownMenu} id="basic-nav-dropdown">
                {dropDownItems}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/notification">查看所有通知</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/userInfo">Hi, {user.username ? user.username: user.fbName}</Nav.Link>
            <Nav.Link as={Link} to="/stores">登出</Nav.Link>


            {/*        <*/}
            {/*        % notifications.forEach((notify)=>{%>*/}
            {/*        <a class="dropdown-item list-group-item-info" href="/notifications/*/}
            {/*        <*/}
            {/*        %= notify.id %>">*/}
            {/*        <%= notify.storeName %> 於 <span><*/}
            {/*            %= moment(notify.createdAt).fromNow() %></span> 更新*/}
            {/*    </a>*/}
            {/*    <*/}
            {/*    % }) %>*/}
            {/*    <% if(notifications.length > 0){%>*/}
            {/*        <div class="dropdown-divider"></div>*/}
            {/*        <% } %>*/}
            {/*        <a class="dropdown-item" href="/users/<%= currentUser._id %>#list-notification">查看所有通知</a>*/}
            {/*        </div>*/}
            {/*        </li>*/}

            {/*        <li class="nav-item ">*/}
            {/*        <% if(currentUser.fbName) { %>*/}
            {/*        <a class="nav-link" href="/users"> Hi, <%= currentUser.fbName %></a>*/}
            {/*        <% }else{%>*/}
            {/*        <a class="nav-link" href="/users"> Hi, <%= currentUser.username %></a>*/}
            {/*        <% } %>*/}
            {/*        </li>*/}
            {/*        <li class=" nav-item">*/}
            {/*        <a id="logout" class="nav-link" href="/users/logout" onclick="sessionStorage.clear()">登出</a>*/}
            {/*        </li>*/}

        </Nav>
    );
};

export default UserInfoAndLogout;
