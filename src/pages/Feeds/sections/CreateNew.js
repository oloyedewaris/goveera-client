import React from 'react'
import { Avatar, Input, Modal } from "antd";
import { useSelector } from "react-redux";
import { DatabaseOutlined, ProjectOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import Create from "../../../components/Create/Create";
import axiosInstance from '../../../util/axiosInstance';
import toastInstance from '../../../util/toastInstance';

function CreateNew({ setRefreshFeeds }) {
  const auth = useSelector(state => state.auth)
  const [toggle, setToggle] = React.useState(false)
  const [inputError, setInputError] = React.useState(null)
  const [text, setText] = React.useState('')

  const onInputChange = e => {
    setInputError(null);
    setText(e.target.value);
  };

  const onCreatePost = (e) => {
    if (e.key === 'Enter') {
      if (text !== "") {
        const newPost = { text, isAnnouncement: false };
        axiosInstance
          .post("/api/posts", newPost)
          .then(res => {
            if (res.data.success) {
              setRefreshFeeds(true)
              setText("");
            }
          })
          .catch(err => {
            toastInstance("Couldn't create post", true)
          });
      } else {
        setInputError("Please enter a text to post");
      }
    }
  };

  return (
    <>
      <div className="create_new_container">
        <div className="create_input_container" onKeyPress={onCreatePost}>
          <Avatar icon={!auth.user.image && <UserOutlined />} src={auth.user.image} className="avatar" />
          <Input value={text} style={inputError && ({ border: '1px solid red' })} placeholder="Start a post" onChange={onInputChange} />
        </div>
        <div className="other_options" onClick={() => setToggle(true)} style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: '14px' }}><FormOutlined style={{ color: "blue" }} /> New Post</div>
          <div style={{ fontSize: '14px' }}><DatabaseOutlined style={{ color: "red" }} /> New Poll</div>
          <div style={{ fontSize: '14px' }}><ProjectOutlined style={{ color: "green" }} /> New Project</div>
        </div>
      </div>
      <Modal title="Create a New Post" visible={toggle} onCancel={() => setToggle(false)}>
        <Create setRefreshFeeds={setRefreshFeeds} onClose={() => setToggle(false)} />
      </Modal>
    </>
  )
}

export default CreateNew;