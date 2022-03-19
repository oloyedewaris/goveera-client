import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Alert, Button, Input, Form, Checkbox } from "antd";
import { createPost, resetCreated } from "../../../redux/actions/postActions";
import Spinner from "../../Spinner/Spinner";

function CreatePosts({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const postCreating = useSelector(state => state.post.postCreating);
  const postCreated = useSelector(state => state.post.postCreated);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [isAnnouncement, setAnnouncement] = useState(false)

  useEffect(() => {
    setAnnouncement(false)
  }, [])

  useEffect(() => {
    if (postCreated) {
      onClose();
    }
    return () => {
      dispatch(resetCreated())
      setAnnouncement(false)
      // history.push('/home?tab=post')
    }
  }, [postCreated, onClose, dispatch, history])

  const onInputChange = e => {
    setError(null);
    setText(e.target.value);
  };

  const onCreatePost = () => {
    if (text !== "") {
      const newPost = { text, isAnnouncement };
      dispatch(createPost(newPost));
    } else {
      setError("Please enter a text to post");
    }
    setText("");
  };

  return (
    <div className="create_post">
      <h3>Create A New Topic</h3>
      {error && <Alert type="error" message={error} />}
      {postCreating && <Spinner />}
      <Form className="post_input_container">
        <Input.TextArea
          value={text}
          placeholder="What's on your mind"
          onChange={onInputChange}
        />
        <Button
          className="post-button"
          size="large"
          type="primary"
          onClick={onCreatePost}
        >
          Post
        </Button>
      </Form>
      <Checkbox style={{ marginTop: '10px' }} onChange={() => setAnnouncement(!isAnnouncement)} checked={isAnnouncement}>Make an announcement</Checkbox>
      <p style={{ fontSize: '11px', marginTop: '3px' }}>Announcements are pinned to the top</p>
    </div>
  );
}

export default CreatePosts;
