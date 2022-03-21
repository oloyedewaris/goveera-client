import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { List, Space, Avatar, Menu, Dropdown, Popconfirm } from "antd";
import { useTransition, animated } from 'react-spring';
import { ArrowLeftOutlined, HeartOutlined, HeartFilled, UserOutlined, LinkOutlined, TagOutlined, DeleteTwoTone } from "@ant-design/icons";
import { getPosts, updatePostLikes, deletePost } from "../../redux/actions/postActions";
import { saveItem } from "../../redux/actions/authActions";
import Comments from "./sections/Comments";
import CommentInput from "./sections/CommentInput";
import Spinner from "../../components/Spinner/Spinner";

const Post = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const updatingPostLike = useSelector((state) => state.post.updatingPostLike);
  const posts = useSelector((state) => state.post.posts);
  const auth = useSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const postId = useParams().id;
  const history = useHistory();

  const transition = useTransition(isVisible, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
  })

  useEffect(() => {
    dispatch(getPosts());
    setVisible(true)
    return () => setVisible(false)
  }, [dispatch]);

  useEffect(() => {
    if (posts) {
      const post = posts.find(post => post._id === postId)
      setPost(post)
    }
  }, [posts, postId]);

  const onLikeClick = ({ postId }) => {
    dispatch(updatePostLikes({ postId, action: "like" }));
  };

  const onUnlikeClick = ({ postId }) => {
    dispatch(updatePostLikes({ postId, action: "unlike" }));
  };

  const onDeletePost = (postId) => {
    dispatch(deletePost(postId));
    history.push('/home')
  };

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div>
      <div onClick={() => history.goBack()} style={{ margin: "5px" }}>
        <ArrowLeftOutlined />
      </div>
      {transition((style, item) =>
        item && <animated.div style={style}>
          {post ? (
            <div className="posts-comment feeds_dropdown_bg">
              <Dropdown.Button className="feeds_dropdown" overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      auth.user.saves.find((save) => save.link === `/post/${post._id}`) ?
                        dispatch(saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text })) :
                        dispatch(saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text, action: 'save' }))
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
                        onConfirm={() => onDeletePost(post._id)}
                        placement="left"
                        title="Are you sure you want to delete this post"
                        okText="Yes"
                        cancelText="No">
                        Delete Post
                      </Popconfirm>
                    </Menu.Item>}
                </Menu>
              } trigger={["click"]} />
              <List.Item
                actions={[
                  <IconText
                    style={{ cursor: 'pointer', color: '#ff889c' }}
                    onClick={() => {
                      if (!post.likers.includes(auth.user._id)) {
                        onLikeClick({ postId: post._id });
                      } else {
                        onUnlikeClick({ postId: post._id });
                      }
                    }}
                    text={`${post.likers.length}`} disabled={updatingPostLike}
                    icon={!post.likers.includes(auth.user._id) ? HeartOutlined : HeartFilled}
                  />
                ]}
              >
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
              <Comments post={post} />
              <CommentInput postData={{ commentId: post._id, userId: auth.user._id }} />
            </div>
          ) : (
            <div className="loader">
              <Spinner size="large" />
            </div>
          )}
        </animated.div>)
      }
    </div>
  );
};

export default Post;
