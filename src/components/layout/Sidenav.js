import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { DashboardOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPermissions } from "../../pages/user/userSlice";

const { SubMenu } = Menu;

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const { permissions } = useSelector((state) =>
    state.users ? state.users : []
  );
  const userRole = localStorage.getItem("userRole");
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(fetchUserPermissions());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>{ capitalizeFirstLetter(localStorage.getItem("userRole")) } Dashboard</span>
      </div>
      {/* <h2>
          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          {localStorage.getItem("firstName") +
            " " +
            localStorage.getItem("lastName")}
        </h2> */}
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item
          key="1"
          style={{
            display:
              permissions && permissions["dashboard"].indexOf(userRole) !== -1
                ? "inline"
                : "none",
          }}
        >
          <NavLink to="/dashboard" style={{ paddingLeft: "25px" }}>
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <DashboardOutlined />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <SubMenu
          key="6"
          style={{
            background: page === "memberList" ? color : "",
            display:
            permissions &&
            (permissions["users"]["create"].indexOf(userRole) !== -1 || permissions["users"]["list"].indexOf(userRole) !== -1)
              ? "inline"
              : "none",
          }}
          title={
            <span>
              <span
                className="icon"
                style={{
                  background: page === "memberList" ? color : ""
                }}
              >
                <DashboardOutlined />
              </span>
              <span >User</span>
            </span>
          }
        >
          <Menu.Item
            key="6.1"
            style={{
              display:
                permissions &&
                permissions["users"]["create"].indexOf(userRole) !== -1
                  ? "inline"
                  : "none",
            }}
          >
            <NavLink to="/users/create">
              <span style={{ paddingLeft: "50px" }} className="label">
                User Create
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="6.2"
            style={{
              display:
                permissions &&
                permissions["users"]["list"].indexOf(userRole) !== -1
                  ? "inline"
                  : "none",
            }}
          >
            <NavLink to="/users/list">
              <span style={{ paddingLeft: "50px" }} className="label">
                User List
              </span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="7"
          style={{
            background: page === "memberList" ? color : "",
            display:
            permissions &&
            (permissions["products"]["create"].indexOf(userRole) !== -1 || permissions["products"]["list"].indexOf(userRole) !== -1)
              ? "inline"
              : "none",
          }}
          title={
            <span>
              <span
                className="icon"
                style={{
                  background: page === "memberList" ? color : "",
                }}
              >
                <DashboardOutlined />
              </span>
              <span>Product</span>
            </span>
          }
        >
          <Menu.Item
            key="7.1"
            style={{
              display:
                permissions &&
                permissions["products"]["create"].indexOf(userRole) !== -1
                  ? "inline"
                  : "none",
            }}
          >
            <NavLink to="/product/create">
              <span style={{ paddingLeft: "50px" }} className="label">
              Product Create
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="7.2"
            style={{
              display:
                permissions &&
                permissions["products"]["list"].indexOf(userRole) !== -1
                  ? "inline"
                  : "none",
            }}
          >
            <NavLink to="/product/list">
              <span style={{ paddingLeft: "50px" }} className="label">
              Product List
              </span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="8"
          style={{
            background: page === "memberList" ? color : "",
            display:
            permissions &&
            (permissions["orders"]["create"].indexOf(userRole) !== -1 || permissions["orders"]["list"].indexOf(userRole) !== -1)
              ? "inline"
              : "none",
          }}
          title={
            <span>
              <span
                className="icon"
                style={{
                  background: page === "memberList" ? color : "",
                }}
              >
                <DashboardOutlined />
              </span>
              <span>Orders</span>
            </span>
          }
        >
          <Menu.Item
            key="8.2"
            style={{
              display:
                permissions &&
                permissions["orders"]["list"].indexOf(userRole) !== -1
                  ? "inline"
                  : "none",
            }}
          >
            <NavLink to="/order/list">
              <span style={{ paddingLeft: "50px" }} className="label">
              Order List
              </span>
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default Sidenav;
