import React, { useState } from "react";
import { Input, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { Search } = Input;
const CommentInput = ({ addComment }) => {
  const [text, setText] = useState({ body: '', error: null });

  const onAddComment = () => {
    if (text) {
      setText({ body: '', error: null })
      addComment(text.body);
    } else setText({ body: '', error: 'Enter comment' });
  };

  return (
    <Space direction="vertical">
      <Search
        value={text.body}
        placeholder="Enter a comment"
        onChange={(e) => setText({ body: e.target.value, error: null })}
        size="large"
        enterButton={<SendOutlined />}
        onSearch={onAddComment}
      />
    </Space>
  );
};

export default CommentInput;
