import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Popconfirm, Comment, Divider, Avatar } from "antd";
import { useSelector } from "react-redux";
import { DeleteTwoTone, UserOutlined } from "@ant-design/icons";

const Comments = ({ post, deleteComment }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const auth = useSelector(state => state.auth);

  return (
    <div>
      {post.comments.length < 1 ?
        <div style={{ margin: "5px" }}>
          <Divider />
          <p>No comment yet</p>
        </div> :
        <List
          className="comment-list"
          header={`${post.comments.length} reply(ies)`}
          itemLayout="horizontal"
          dataSource={post.comments}
          renderItem={(comment, index) => (
            <li key={index}>
              <Comment
                actions={
                  auth.user._id === post.author._id && (
                    [<Popconfirm
                      placement="right"
                      title="Are you sure you want to delete this Comment"
                      onConfirm={() => deleteComment(comment._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteTwoTone twoToneColor="red" />
                    </Popconfirm>]
                  )}
                author={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
                avatar={<Avatar icon={!comment.commenter.image && <UserOutlined />} src={comment.commenter.image} />}
                content={
                  <div className="post-in-list">
                    {comment.text}
                  </div>
                }
                datetime={timeAgo.format(comment.timestamp, 'mini')}
              />
            </li>
          )}
        />
      }
    </div>
  );
};

export default Comments;
