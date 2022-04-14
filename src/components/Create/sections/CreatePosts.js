import React, { useState, useEffect } from "react";
import { Alert, Button, Input, Form, Checkbox } from "antd";
import Spinner from "../../Spinner/Spinner";
import axiosInstance from "../../../util/axiosInstance";
import toastInstance from "../../../util/toastInstance";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";

function CreatePosts({ onClose, setRefreshFeeds }) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [isAnnouncement, setAnnouncement] = useState(false)

  useEffect(() => {
    setAnnouncement(false)
  }, [])

  const onInputChange = e => {
    setError(null);
    setText(e.target.value);
  };

  const onCreatePost = () => {
    if (text) {
      const newPost = { text, isAnnouncement };
      setCreating(true)
      axiosInstance
        .post("/api/posts", newPost)
        .then(res => {
          setCreating(false)
          if (res.data.success) {
            setRefreshFeeds(true)
            setText("");
            onClose()
          }
        })
        .catch(err => {
          setCreating(false)
          toastInstance("Couldn't create post, try again", true)
        });
    } else {
      setError("Please enter a text to post");
    }
  };

  return (
    <div className="create_post">
      <h3>Create A New Topic</h3>
      {error && <Alert type="error" message={error} />}
      {creating && <Spinner />}
      <Form className="post_input_container">
        <Input.TextArea value={text}
          className="post_input"
          placeholder="What's on your mind"
          onChange={onInputChange} />
        <div className='post_submit_area'>
          <div className='post_announcement'>
            <Checkbox checked={isAnnouncement}
              onChange={() => setAnnouncement(!isAnnouncement)}>
              Announcement
            </Checkbox>
            <p style={{ fontSize: '11px' }}>Announcements are pinned to the top</p>
          </div>
          <Button className='button' size="medium" type="primary" onClick={onCreatePost}>Post</Button>
        </div>
      </Form>
      <ToastComponent />
    </div >
  );
}

export default CreatePosts;
