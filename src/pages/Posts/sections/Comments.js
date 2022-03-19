import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Popconfirm, Comment, Divider, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, UserOutlined } from "@ant-design/icons";
import { deleteComment } from "../../../redux/actions/postActions";

const Comments = ({ post }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onDeleteComment = (postId, commentId, action) => {
    dispatch(deleteComment(postId, commentId, action));
  };

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
                      onConfirm={() => onDeleteComment(post._id, comment._id, "deleteComment")}
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
                datetime={timeAgo.format(comment.timestamp, 'twitter-now')}
              />
            </li>
          )}
        />
      }
    </div>
  );
};

export default Comments;
