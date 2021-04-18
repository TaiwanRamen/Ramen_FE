import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';

const RamenNavbar = (user) => {

    return ( 
        // </nav>
        // <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        //     <Link className="navbar-brand" to="/stores"><img src="/images/ramen.png" alt="" width="32px" height="32px" class="mx-2" />台灣拉麵倶樂部</Link>
        // </nav>
    <Navbar bg="light" expand="md" fixed="top">
        <Navbar.Brand as={Link} to="/stores"><img src="/images/ramen.png" alt="" width="32px" height="32px" class="mx-2"/>台灣拉麵倶樂部</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/map">地圖</Nav.Link>
                <Nav.Link as={Link} to="/stores">店家列表</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Nav className="mr-sm-2">
                <Button as={Link} as={Link} to="/user/login" variant="outline-primary" size="md">登入</Button>
                <Button as={Link} as={Link} to="/user/register" variant="outline-secondary" size="md">註冊</Button>
            </Nav>

        </Navbar.Collapse>
    </Navbar>
        
     );
}
 
export default RamenNavbar;