import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Comment, List, Popconfirm, Divider, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTwoTone, UserOutlined } from "@ant-design/icons";
import { deleteComment } from "../../../redux/actions/projectActions";

const Comments = ({ project }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onDeleteComment = (projectId, commentId, action) => {
    dispatch(deleteComment({ projectId, commentId, action }));
  };

  return (
    <div>
      {project.comments.length < 1 ?
        <div style={{ marginTop: "5px" }}>
          <Divider />
          <p>No comment yet</p>
        </div> :
        <List
          className="comment-list"
          header={`${project.comments.length} feedback(s)`}
          itemLayout="horizontal"
          dataSource={project.comments}
          renderItem={(comment, index) => (
            <li key={index}>
              <Comment
                actions={
                  auth.user._id === project.initiator._id && (
                    [<Popconfirm
                      placement="right"
                      title="Are you sure you want to delete this Comment"
                      onConfirm={() => onDeleteComment(project._id, comment._id, "deleteComment")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteTwoTone twoToneColor="red" />
                    </Popconfirm>]
                  )}
                author={`${comment.commenter.firstName} ${comment.commenter.lastName}`}
                avatar={<Avatar icon={!comment.commenter.image && <UserOutlined />} src={comment.commenter.image} />}
                content={comment.text}
                datetime={timeAgo.format(comment.timestamp, 'mini')}
              />
            </li>
          )}
        />
      }
    </div>
  )
};

export default Comments;
