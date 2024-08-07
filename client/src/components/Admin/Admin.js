import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHome from "./Content/ManageUser";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>

      <div className="admin-content">
        <div className="admin-header"></div>

        <div className="admin-main">
          <Outlet />
          {/* <AdminHome /> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
