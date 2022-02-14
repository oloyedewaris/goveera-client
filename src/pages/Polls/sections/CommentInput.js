import React, { useState } from "react";
import { Input, Space, Alert } from "antd";
import { useDispatch } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { addComment } from "../../../redux/actions/pollActions";

const { Search } = Input;
const CommentInput = ({ pollData }) => {
  const [Comment, setComment] = useState("");
  const [Error, setError] = useState(null);

  const dispatch = useDispatch();

  const { userId, commentId } = pollData;

  const onInputChange = e => {
    setComment(e.target.value);
    setError(null);
  };

  const onAddComment = (pollId, action, commenterId, text) => {
    if (Comment !== "") {
      dispatch(addComment(pollId, action, commenterId, text));
    } else {
      setError("Please enter a text to comment");
    }
    setComment("");
  };

  return (
    <div>
      {Error ? (
        <Alert
          className="alert"
          message={Error > 50 ? "Internal Server Error" : Error}
          type="error"
          showIcon
          closable
        />
      ) : null}
      <Space direction="vertical">
        <Search
          value={Comment}
          placeholder="Enter a comment"
          onChange={onInputChange}
          size="large"
          enterButton={<SendOutlined />}
          onSearch={() =>
            onAddComment(commentId, "addComment", userId, Comment)
          }
        />
      </Space>
    </div>
  );
};

export default CommentInput;
