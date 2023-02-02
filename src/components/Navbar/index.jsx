import { Link, Outlet, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation().pathname;
  if (location.match(/dashboard/)) {
    return <Outlet />;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand me-4" to="/">
            KMART
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Shop!
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item ms-lg-auto">
                <Link className="nav-link" to="/dashboard">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
