import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Modal } from "antd";
import Name from "./Sections/Name";
import Email from "./Sections/Email";
import Password from "./Sections/Password";
import Bio from "./Sections/Bio";
import { logout } from "../../redux/actions/authActions";
import { PoweroffOutlined } from "@ant-design/icons";

function Settings() {
  const [component, setComponent] = useState(null)
  const [modalToggle, setModalToggle] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();

  const firstName = useSelector(state => state.auth.user.firstName);
  const lastName = useSelector(state => state.auth.user.lastName);
  const email = useSelector(state => state.auth.user.email);
  const bio = useSelector(state => state.auth.user.bio);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ margin: 15 }}>
      <List direction="vertical">
        <List.Item><div>Name</div><div>{`${firstName} ${lastName}`}</div>
          <Button onClick={() => { setComponent(<Name />); setModalToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Email Address</div><div>{email}</div>
          <Button onClick={() => { setComponent(<Email />); setModalToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Bio</div><div>{bio}</div><Button onClick={() => { setComponent(<Bio />); setModalToggle(true) }} size="sm">Edit</Button>
        </List.Item>
        <List.Item><div>Password</div><h5>If you feel someone else's got your password, you can change it below</h5>
          <Button onClick={() => { setComponent(<Password />); setModalToggle(true) }} size="sm">Change Password</Button>
        </List.Item>
      </List>
      <Button style={{ color: "red" }} onClick={() => setLogoutModal(true)}><PoweroffOutlined /> Logout</Button>
      <Modal title='Logout' visible={logoutModal} onCancel={() => setLogoutModal(false)}>
        <p>Sure you want to logout?</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Button type='primary' onClick={onLogout}>Yes</Button>
          <Button onClick={() => setLogoutModal(false)}>No</Button>
        </div>
      </Modal>
      <Modal title="Edit data" visible={modalToggle} onCancel={() => setModalToggle(false)}>
        {component}
      </Modal>
    </div>
  );
}

export default Settings;
