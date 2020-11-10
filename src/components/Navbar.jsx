import BootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand>RDO F1</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/seasons" activeClassName="active">
              Seasons
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/drivers" activeClassName="active">
              Drivers
            </NavLink>
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
