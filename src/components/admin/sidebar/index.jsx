import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="border-end bg-dark p-4">
      <ul className="list-unstyled">
        <li className="mb-2">
          <Link className="d-md-inline-block d-none" to="/dashboard?page=1">
            dashboard
          </Link>
          <Link
            className="d-flex d-md-none justify-content-center mb-3"
            to="/dashboard?page=1"
          >
            <i className=" text-white fa fa-list p-3 border rounded-circle" />
          </Link>
        </li>
        <li>
          <Link className="d-md-inline-block d-none" to="/dashboard/control">
            control
          </Link>
          <Link
            className="d-flex d-md-none justify-content-center"
            to="/dashboard/control"
          >
            <i className=" text-white fa fa-edit p-3 border rounded-circle" />
          </Link>
        </li>
        <li className="mt-auto">
          <Link className="d-md-inline-block d-none" to="/">
            User
          </Link>
          <Link className="d-flex d-md-none justify-content-center" to="/">
            <i className=" text-white fa fa-user p-3 border rounded-circle" />
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
