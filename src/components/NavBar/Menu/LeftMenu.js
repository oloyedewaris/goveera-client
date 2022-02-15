import React from "react";
import { Badge, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined, SearchOutlined, UsergroupAddOutlined, BellOutlined } from "@ant-design/icons";

const LeftMenu = () => {
  const user = useSelector(state => state.auth.user)

  const notifications = user ? user.notifications.filter(not => not.viewed === false) : [];

  return (
    <Menu mode="horizontal">
      {user && user.company && <>
        <Menu.Item key="home">
          <NavLink exact to="/home">
            <HomeOutlined /> Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="notifications">
          <Badge count={notifications && notifications.length}>
            <NavLink exact to="/notifications">
              <BellOutlined /> Notifications
            </NavLink>
          </Badge>
        </Menu.Item>
        <Menu.Item key="company">
          <NavLink exact to="/company">
            <UsergroupAddOutlined /> {user.company.name}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="discover">
          <NavLink exact to="/discover">
            <SearchOutlined /> Discover
          </NavLink>
        </Menu.Item>
      </>}
    </Menu>
  );
};

export default LeftMenu;
