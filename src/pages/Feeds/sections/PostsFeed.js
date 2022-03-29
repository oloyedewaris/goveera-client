import React, { useEffect } from "react";
import { Space, List, Avatar, Skeleton, Popconfirm, Dropdown, Menu } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CommentOutlined, DeleteTwoTone, HeartOutlined, HeartFilled, EyeOutlined, LinkOutlined, TagOutlined, UserOutlined, PushpinOutlined } from "@ant-design/icons";
import { getPosts, updatePostLikes, deletePost } from "../../../redux/actions/postActions";
import { saveItem } from "../../../redux/actions/authActions";
import toastInstance from "../../../util/toastInstance";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";

const PostsFeed = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.post.posts);
  const postLoading = useSelector((state) => state.post.postLoading);
  const updatingPostLike = useSelector((state) => state.post.updatingPostLike);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div>
      {postLoading ? (
        <Skeleton active paragraph={{ row: 10 }} />
      ) : (
        <div className="posts-list">
          {posts ? (
            posts.length === 0 ? (
              <h3>No post to show, make a post to appear here</h3>
            ) : (
              <List
                itemLayout="vertical"
                pagination={{ pageSize: 8 }}
                dataSource={posts}
                renderItem={(post, i) => (
                  <List.Item
                    className="feeds_dropdown_bg"
                    key={Math.random()}
                    actions={[
                      <IconText
                        style={{ cursor: 'pointer', color: "#ff889c" }}
                        onClick={() => !post.likers.includes(auth.user._id) ?
                          dispatch(updatePostLikes({ postId: post._id, action: "like" })) :
                          dispatch(updatePostLikes({ postId: post._id, action: "unlike" }))}
                        disabled={updatingPostLike} text={`${post.likers.length}`}
                        icon={!post.likers.includes(auth.user._id) ? HeartOutlined : HeartFilled}
                      />,
                      <Link to={`/post/${post._id}`}>
                        <IconText icon={CommentOutlined} text={`${post.comments.length}`} />
                      </Link>,
                    ]}
                  >
                    <Dropdown.Button className="feeds_dropdown" overlay={
                      <Menu>
                        <Menu.Item key="3" icon={<EyeOutlined />}>
                          <Link to={`/post/${post._id}`}>
                            View Post
                          </Link>
                        </Menu.Item>
                        <Menu.Item
                          onClick={() =>
                            auth.user.saves.find((save) => save.link === `/post/${post._id}`) ?
                              dispatch(
                                saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text })
                                  (() => toastInstance('Post unsaved'))
                              ) :
                              dispatch(
                                saveItem({ type: 'post', link: `/post/${post._id}`, title: post.text, action: 'save' })
                                  (() => toastInstance('Post saved'))
                              )
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
                              onConfirm={() => dispatch(deletePost(post._id))}
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
                          {post.isAnnouncement ? <p className="time_ago"><PushpinOutlined /> Announcement</p> :
                            <p className="time_ago">{timeAgo.format(post.postedTime)}</p>}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )
          ) : null}
        </div>
      )}
      <ToastComponent />
    </div>
  );
};

export default PostsFeed;
