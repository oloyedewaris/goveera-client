import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, List, Modal, Popconfirm } from "antd";
import Name from "./Sections/Name";
import Email from "./Sections/Email";
import Password from "./Sections/Password";
import Bio from "./Sections/Bio";
import { logout } from "../../redux/actions/authActions";
import { PoweroffOutlined } from "@ant-design/icons";

function Settings() {
  const [component, setComponent] = useState(null)
  const [modalToggle, setModalToggle] = useState(false)
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
        <List.Item>
          <div>Name</div>
          <div>{`${firstName} ${lastName}`}</div>
          <Button onClick={() => {
            setComponent(<Name toggleModal={setModalToggle} />);
            setModalToggle(true)
          }} size="sm">Edit</Button>
        </List.Item>
        <List.Item>
          <div>Email Address</div>
          <div>{email}</div>
          <Button onClick={() => {
            setComponent(<Email toggleModal={setModalToggle} />);
            setModalToggle(true)
          }} size="sm">Edit</Button>
        </List.Item>
        <List.Item>
          <div>Bio</div>
          <div>{bio}</div>
          <Button onClick={() => {
            setComponent(<Bio toggleModal={setModalToggle} />);
            setModalToggle(true)
          }} size="sm">Edit</Button>
        </List.Item>
        <List.Item>
          <div>Password</div>
          <h5>If you feel someone else's got your password, you can change it below</h5>
          <Button onClick={() => {
            setComponent(<Password toggleModal={setModalToggle} />);
            setModalToggle(true)
          }} size="sm">Change Password</Button>
        </List.Item>
      </List>
      <Button style={{ color: "red" }}>
        <Popconfirm
          onConfirm={onLogout}
          placement="right"
          title="Are you sure you want to logout"
          okText="Yes"
          cancelText="No">
          <PoweroffOutlined /> Logout
        </Popconfirm>
      </Button>
      <Modal title="Edit data" visible={modalToggle} onCancel={() => setModalToggle(false)}>
        {component}
      </Modal>
    </div>
  );
}

export default Settings;
