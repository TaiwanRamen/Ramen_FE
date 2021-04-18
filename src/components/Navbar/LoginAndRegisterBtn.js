import React from 'react';
import {Button, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const LoginAndRegisterBtn = () => {
    return (
        <Nav className="mr-sm-2">
            <Button as={Link} to="/user/login" variant="outline-primary" size="md">登入</Button>
            <Button as={Link} to="/user/register" variant="outline-secondary" size="md">註冊</Button>
        </Nav>
    );
};

export default LoginAndRegisterBtn;
