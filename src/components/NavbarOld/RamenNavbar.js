import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import UserSection from "./UserSection";
import "./NavbarOld.css"
import React from "react";
const RamenNavbar = () => {

    return (
        <Navbar bg="light" expand="md" fixed="top">
            <Navbar.Brand as={Link} to="/stores"><img src="/images/ramen.png" alt="" width="32px" height="32px" className="mx-2"/>台灣拉麵倶樂部</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/map">地圖</Nav.Link>
                    <Nav.Link as={Link} to="/stores">店家列表</Nav.Link>
                </Nav>
                <UserSection />
            </Navbar.Collapse>
        </Navbar>
     );
}
 
export default RamenNavbar;