import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";
import "./SideBar.scss";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Game from "../../assets/game.png";
import { FaKey } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import logo from "../../assets/logoadmin.png";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../utils/Constants";

// import { logoutUser } from "../../services/APIService";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { doLogout } from "../../redux/action/userAction";
// import Swal from "sweetalert2";

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const user = useSelector((state) => state.userRedux.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(doLogout());
    navigate(`${path.HOMEPAGE}/${path.LOGIN}`);
  };
  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "15px",
              display: "flex",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          >
            {/* <div className="logo-1 animate__animated animate__fadeInLeft"> */}
            <img className="logo-2" src={logo} alt="logo" />
            {/* </div> */}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === path.DASHBOARD ? "active" : ""
              }`}
              icon={
                <MdSpaceDashboard size={"20px"} color={"rgb(221, 51, 68)"} />
              }
              onClick={() => handleMenuItemClick(path.DASHBOARD)}
            >
              Dashboard
              <Link to={path.DASHBOARD} />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu
              icon={<FaTools size={"20px"} color={"rgb(221, 51, 68)"} />}
              title="Features"
            >
              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === path.MANAGE_USER ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick(path.MANAGE_USER)}
              >
                Manage Users <Link to={path.MANAGE_USER} />
              </MenuItem>

              <MenuItem
                className={`custom-menu-item ${
                  activeMenuItem === path.MANAGE_PRODUCT ? "active" : ""
                }`}
                onClick={() => handleMenuItemClick(path.MANAGE_PRODUCT)}
              >
                Manage Products <Link to={path.MANAGE_PRODUCT} />
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu iconShape="circle" className="bg-logout">
            <MenuItem
              className={`custom-menu-item ${
                activeMenuItem === "logout" ? "active" : ""
              }`}
              icon={<FaSignOutAlt size={"20px"} color={"rgb(255 116 116)"} />}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/HuynhMinhHoang"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Contact me
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
