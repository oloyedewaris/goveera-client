import React from "react";
import { List, Popconfirm, Comment, Divider, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, UserOutlined } from "@ant-design/icons";
import { deleteComment } from "../../../redux/actions/pollActions";

const Comments = ({ poll }) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onDeleteComment = (pollId, commentId, action) => {
    dispatch(deleteComment(pollId, commentId, action));
  };

  return (
    <div>
      {poll.comments.length < 1 ?
        <div style={{ margin: "5px" }}>
          <Divider />
          <p>No comment yet</p>
        </div> :
        <List
          className="comment-list"
          header={`${poll.comments.length} reply(ies)`}
          itemLayout="horizontal"
          dataSource={poll.comments}
          renderItem={(comment, index) => (
            <li key={index}>
              <Comment
                actions={[
                  auth.user._id === poll.surveyor._id ? (
                    <Popconfirm
                      placement="right"
                      title="Are you sure you want to delete this Comment"
                      onConfirm={() => onDeleteComment(poll._id, comment._id, "deleteComment")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteTwoTone twoToneColor="red" />
                    </Popconfirm>
                  ) : null
                ]}
                author={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
                avatar={<Avatar icon={!comment.commenter.image && <UserOutlined />} src={comment.commenter.image} />}
                content={comment.text}
                datetime={null}
              />
            </li>
          )}
        />
      }
    </div>
  );
};

export default Comments;
