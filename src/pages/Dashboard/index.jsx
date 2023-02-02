import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <Sidebar />
          </div>
          <div className="col-10">
            <div className="dash-control pt-5 pb-2 ms-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
