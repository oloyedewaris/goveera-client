import React from "react";
import { Menu, Button } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const RightMenu = () => {
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.auth.user);

  const { isAuthenticated, isAuthenticating } = auth

  return (
    <div>
      {isAuthenticated ? (
        <Menu mode="horizontal">
          <Menu.Item key="profile">
            <NavLink exact activeClassName='' to={`/profile/${user._id}`}><UserOutlined />My Profile</NavLink>
          </Menu.Item>
        </Menu>
      ) : <>
        {!isAuthenticating &&
          <div style={{ margin: '10px' }}>
            <Button style={{ marginRight: '10px' }}><NavLink to="/login">Signin</NavLink></Button>
            <Button type='primary'><NavLink to="/register">Signup </NavLink></Button>
          </div>
        }
      </>
      }
    </div>
  );
};

export default RightMenu;
