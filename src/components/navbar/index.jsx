import { Link, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

function NavbarComponent() {
  const cartList = useSelector((store) => store);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Link className="navbar-brand me-4" to="/">
            KMART
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/products">
                Shop!
              </Link>
              <Link className="nav-link" to="/cart">
                Cart{" "}
                <div className="badge bg-success ms-1">{cartList?.length}</div>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}

export default NavbarComponent;
