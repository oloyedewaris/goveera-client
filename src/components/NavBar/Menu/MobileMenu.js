import React from "react";
import { Badge, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined, SearchOutlined, UsergroupAddOutlined, UserOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo.png";

const MobileMenu = () => {
  const user = useSelector(state => state.auth.user)

  const notifications = user ? user.notifications.filter(not => not.viewed === false) : [];

  return (
    <div className='menu_container'>
      {user ? <>
        <NavLink exact activeClassName='nav_active_color' className='menu_item' to='/home'>
          <HomeOutlined className="nav_menu_icon" />
        </NavLink>
        <NavLink exact activeClassName='nav_active_color' className='menu_item' to={`/profile/${user._id}`}>
          <UserOutlined className="nav_menu_icon" />
        </NavLink>
        <Badge count={notifications && notifications.length}>
          <NavLink exact activeClassName='nav_active_color' className='menu_item' to="/notifications">
            <BellOutlined className="nav_menu_icon" />
          </NavLink>
        </Badge>
        <NavLink exact activeClassName='nav_active_color' className='menu_item' to="/colleagues">
          <UsergroupAddOutlined className="nav_menu_icon" />
        </NavLink>
        <NavLink exact activeClassName='nav_active_color' className='menu_item' to="/discover">
          <SearchOutlined className="nav_menu_icon" />
        </NavLink>
        <NavLink exact activeClassName='nav_active_color' className='menu_item' to="/settings">
          <SettingOutlined className="nav_menu_icon" />
        </NavLink>
      </> : <>
        <div>
          <a href="/"><img className="logo_img" alt="goveera_logo" src={logo} /></a>
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
          <Button className='menu_item'>
            <NavLink exact to="/login">Signin</NavLink>
          </Button>
          <Button className='menu_item' type='primary'>
            <NavLink exact to="/register">Signup</NavLink>
          </Button>
        </div>
      </>}
    </div>
  );
};

export default MobileMenu;