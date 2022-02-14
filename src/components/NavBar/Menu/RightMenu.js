import React from "react";
import { Menu, Button } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const RightMenu = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      {isAuth ? (
        <Menu mode="horizontal">
          <Menu.Item key="profile">
            <NavLink exact activeClassName='' to={`/profile/${user._id}`}><UserOutlined />My Profile</NavLink>
          </Menu.Item>
        </Menu>
      ) : (
        <div style={{ margin: '10px' }}>
          <Button className='my_button' style={{ marginRight: '10px' }}><NavLink to="/login">Signin</NavLink></Button>
          <Button className='my_button' type='primary'><NavLink to="/register">Signup </NavLink></Button>
        </div>
      )
      }
    </div >
  );
};

export default RightMenu;
