import React from 'react'
import { Avatar, Input } from "antd";
import { useSelector } from "react-redux";
import { DatabaseOutlined, ProjectOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';


function CreateNew() {
  const auth = useSelector(state => state.auth)

  return (
    <div className="create_new_container" style={{ cursor: 'pointer' }}>
      <div className="create_input_container">
        <Avatar icon={!auth.user.image && <UserOutlined />} src={auth.user.image} className="avatar" />
        <Input placeholder="Start a post" disabled style={{ cursor: 'pointer' }} />
      </div>
      <div className="other_options">
        <div style={{ fontSize: '14px' }}><FormOutlined style={{ color: "blue" }} /> New Post</div>
        <div style={{ fontSize: '14px' }}><DatabaseOutlined style={{ color: "red" }} /> New Poll</div>
        <div style={{ fontSize: '14px' }}><ProjectOutlined style={{ color: "green" }} /> New Project</div>
      </div>
    </div>
  )
}

export default CreateNew
