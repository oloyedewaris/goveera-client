import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { List, Space, Avatar, Menu, Dropdown, Popconfirm } from "antd";
import { useTransition, animated } from 'react-spring';
import { ArrowLeftOutlined, HeartOutlined, HeartFilled, UserOutlined, LinkOutlined, TagOutlined, DeleteTwoTone } from "@ant-design/icons";
import { saveItem } from "../../redux/actions/authActions";
import Comments from "./sections/Comments";
import CommentInput from "./sections/CommentInput";
import Spinner from "../../components/Spinner/Spinner";
import toastInstance from "../../util/toastInstance";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import axiosInstance from '../../util/axiosInstance';

const Post = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const postId = useParams().id;
  const history = useHistory();

  const transition = useTransition(isVisible, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
  })

  useEffect(() => {
    setPostLoading(true)
    axiosInstance
      .get(`/api/posts/${postId}`)
      .then(res => {
        setPost(res.data.post)
        setVisible(true)
        setPostLoading(false)
      })
      .catch(err => {
        toastInstance("Couldn't get post", true)
        setPostLoading(false)
      });
  }, [postId]);

  const updatePost = action => {
    setUpdatingPost(true)
    axiosInstance
      .patch(`/api/posts/${postId}`, { action })
      .then(res => {
        setPost(res.data.post)
        setUpdatingPost(false)
      })
      .catch(err => {
        setUpdatingPost(false)
      });
  };

  const addComment = text => {
    setUpdatingPost(true)
    axiosInstance
      .patch(`/api/posts/${postId}`, { action: 'addComment', commenterId: auth.user._id, text })
      .then(res => {
        setPost(res.data.post)
        setUpdatingPost(false)
      })
      .catch(err => {
        setUpdatingPost(false)
      });
  };

  const deleteComment = commentId => {
    setUpdatingPost(true)
    axiosInstance
      .patch(`/api/posts/${postId}`, { action: 'deleteComment', commentId })
      .then(res => {
        setPost(res.data.post)
        setUpdatingPost(false)
      })
      .catch(err => {
        setUpdatingPost(false)
      });
  };

  const deletePost = postId => {
    setUpdatingPost(true)
    axiosInstance
      .delete(`/api/posts/${postId}`)
      .then(res => {
        setUpdatingPost(false)
        if (res.data.deletedPost === post.id)
          history.push('/home?tab=post')
      })
      .catch(err => {
        setUpdatingPost(false)
      });
  };


  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div className="feeds_dropdown_bg">
      <div onClick={() => history.goBack()} style={{ margin: "5px" }}>
        <ArrowLeftOutlined />
      </div>
      <>{postLoading ? <Spinner /> :
        <>
          {transition((style, item) =>
            item && <animated.div style={style}>
              {post ? (
                <>
                  <List.Item
                    actions={[
                      <IconText
                        style={{ cursor: 'pointer', color: '#ff889c' }}
                        onClick={() => (!post.likers.includes(auth.user._id)) ?
                          updatePost("like") :
                          updatePost("unlike")
                        }
                        text={`${post.likers.length}`} disabled={updatingPost}
                        icon={!post.likers.includes(auth.user._id) ? HeartOutlined : HeartFilled}
                      />
                    ]}
                  >
                    <Dropdown.Button className="feeds_dropdown" overlay={
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            auth.user.saves.find((save) => save.link === `/post/${post._id}`) ?
                              dispatch(
                                saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text })
                                  (() => toastInstance('Post unsaved'))
                              ) :
                              dispatch(
                                saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text, action: 'save' })
                                  (() => toastInstance('Post saved')))

                          }
                          key="4"
                          icon={<TagOutlined />}>
                          {auth.user.saves.find((save) => save.link === `/post/${post._id}`) ? 'Unsave' : 'Save'}
                        </Menu.Item>
                        <Menu.Item onClick={() => navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`)} key="2" icon={<LinkOutlined />}>
                          Copy link
                        </Menu.Item>
                        {auth.user._id === post.author._id &&
                          <Menu.Item style={{ color: "red" }} key="3"
                            icon={<DeleteTwoTone twoToneColor="red" />}>
                            <Popconfirm
                              onConfirm={() => deletePost(post._id)}
                              placement="left"
                              title="Are you sure you want to delete this post"
                              okText="Yes"
                              cancelText="No">
                              Delete Post
                            </Popconfirm>
                          </Menu.Item>}
                      </Menu>
                    } trigger={["click"]} />
                    <List.Item.Meta
                      avatar={<Avatar icon={!post.author.image && <UserOutlined />} src={post.author.image} />}
                      title={<Link to={`/profile/${post.author._id}`}>{`${post.author.firstName} ${post.author.lastName}`}</Link>}
                      description={
                        <div className="post-in-list">
                          {post.text}
                          <p className="time_ago">{timeAgo.format(post.postedTime, 'twitter-now')}</p>
                        </div>
                      }
                    />
                  </List.Item>
                  <Comments post={post} deleteComment={deleteComment} />
                  <CommentInput post={post} addComment={addComment} />
                </>
              ) : (
                <div className="loader">
                  No post to show
                </div>
              )}
            </animated.div>)}
        </>
      }</>
      <ToastComponent />
    </div>
  );
};

export default Post;
