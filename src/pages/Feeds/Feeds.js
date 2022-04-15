import React, { useEffect, useState } from "react";
import { List, Skeleton, Button, Modal, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../util/axiosInstance";
import Post from './sections/Post/Post';
import Poll from './sections/Post/Poll';
import Project from './sections/Post/Project';
import { clearJustCreated } from '../../redux/actions/authActions'
import CreateNew from "./sections/CreateNew";
import toastInstance from '../../util/toastInstance'
import ToastComponent from '../../components/ToastComponent/ToastComponent'
import "./feeds.less";

const items = [
  {
    title: 'Discussions',
    description: 'Create a topic in the discussion section'
  },
  {
    title: 'Polls',
    description: 'Make a quick survey in the poll section, by chosing the polls icon'
  },
  {
    title: 'Projects',
    description: 'An organizational project can be created and managed in the project section also'
  },
  {
    title: 'Connections',
    description: 'You can also connect with other users like colleagues that are in same organization as you, as well as discovering more users from other organization'
  }
]

const PostsFeed = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([])
  const [updating, setUpdating] = useState(false)
  const [limit, setLimit] = useState(8)
  const [count, setCount] = useState(8)
  const [loadingMore, setLoadingMore] = useState(false)
  const [refreshFeeds, setRefreshFeeds] = useState(false)

  useEffect(() => {
    if (refreshFeeds) {
      axiosInstance
        .get("/api/posts?limit=8")
        .then(res => {
          setRefreshFeeds(false)
          setAllPosts(res.data.allPosts)
          setCount(res.data.count)
        })
        .catch(err => {
          setRefreshFeeds(false)
          toastInstance("Couldn't refresh feeds", true)
        });
    }
  }, [refreshFeeds]);

  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get("/api/posts?limit=8")
      .then(res => {
        setAllPosts(res.data.allPosts)
        setCount(res.data.count)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        toastInstance("Couldn't fetch feeds", true)
      });
  }, []);

  const updatePost = ({ postId, action }) => {
    setUpdating(true)
    axiosInstance
      .patch(`/api/posts/${postId}`, { action })
      .then(res => {
        const newAllPosts = [...allPosts]
        const post = newAllPosts.find(post => post._id === res.data.post._id)
        newAllPosts[newAllPosts.indexOf(post)] = res.data.post
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        toastInstance("Couldn't update post", true)
      });
  };

  const deletePost = postId => {
    setUpdating(true)
    axiosInstance
      .delete(`/api/posts/${postId}`)
      .then(res => {
        const newAllPosts = allPosts.filter(post => post._id !== res.data.deletedPost._id)
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        toastInstance("Couldn't delete post", true)
      });
  };

  const updatePoll = ({ pollId, optionName, action }) => {
    setUpdating(true)
    axiosInstance
      .patch(`/api/polls/${pollId}`, { optionName, action })
      .then(res => {
        const newAllPosts = [...allPosts]
        const poll = newAllPosts.find(poll => poll._id === res.data.poll._id)
        newAllPosts[newAllPosts.indexOf(poll)] = res.data.poll
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        toastInstance("Couldn't update poll", true)
      });
  };

  const deletePoll = pollId => {
    setUpdating(true)
    axiosInstance
      .delete(`/api/polls/${pollId}`)
      .then(res => {
        const newAllPosts = allPosts.filter(poll => poll._id !== res.data.deletedPoll._id)
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        toastInstance("Couldn't delete poll", true)
      });
  };

  const updateProject = ({ projectId, action, stage, taskName }) => {
    setUpdating(true)
    axiosInstance
      .patch(`/api/projects/${projectId}`, { action, stage, taskName })
      .then(res => {
        const newAllPosts = [...allPosts]
        const project = newAllPosts.find(project => project._id === res.data.project._id)
        newAllPosts[newAllPosts.indexOf(project)] = res.data.project
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        setUpdating(false)
        toastInstance("Couldn't update project", true)
      });
  };

  const deleteProject = projectId => {
    setUpdating(true)
    axiosInstance
      .delete(`/api/projects/${projectId}`)
      .then(res => {
        const newAllPosts = allPosts.filter(project => project._id !== res.data.deletedProject._id)
        setAllPosts(newAllPosts)
        setUpdating(false)
      })
      .catch(err => {
        setUpdating(false)
        toastInstance("Couldn't delete project", true)
      });
  };

  const loadMore = () => {
    setLimit(limit + 4)
    setLoadingMore(true)
    axiosInstance
      .get(`/api/posts?limit=${limit + 4}`)
      .then(res => {
        setAllPosts(res.data.allPosts)
        setLoadingMore(false)
      })
      .catch(err => {
        toastInstance("Couldn't load more", true)
        setLoadingMore(false)
      });
  }

  return (
    <div className="feeds_container">
      <CreateNew setRefreshFeeds={setRefreshFeeds} />
      <div>
        {loading ? (
          <Skeleton active paragraph={{ row: 10 }} />
        ) : (
          <div className="posts-list">
            {allPosts.length > 0 ? (
              <div style={{ margin: '10px auto' }}>
                <Divider orientation="left">Feeds</Divider>
                <List
                  itemLayout="vertical"
                  dataSource={allPosts}
                  renderItem={(data, i) => {
                    if (data.author) {
                      return <Post key={i} post={data} updating={updating} updatePost={updatePost} deletePost={deletePost} />
                    } else if (data.surveyor) {
                      return <Poll key={i} poll={data} updating={updating} updatePoll={updatePoll} deletePoll={deletePoll} />
                    } else if (data.initiator) {
                      return <Project key={i} project={data} updating={updating} updateProject={updateProject} deleteProject={deleteProject} />
                    } else {
                      return <></>
                    }
                  }}
                />
                {count > allPosts.length &&
                  <Button
                    disabled={loadingMore}
                    loading={loadingMore}
                    style={{ margin: '10px auto', borderRadius: 50 }}
                    onClick={loadMore}>
                    {loadingMore ? 'Loading More' : 'Load More'}
                  </Button>}
              </div>
            ) : (
              <h3>No post to show, make a post to appear here</h3>
            )}
          </div>
        )}
      </div>
      <Modal title="Welcome to Goveera" visible={user?.justCreated} onCancel={() => dispatch(clearJustCreated())}>
        <h2>Once again, welcome to Goveera</h2>
        <h4>Here are some tips to get the best out of this platform</h4>
        <List
          itemLayout="vertical"
          dataSource={items}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Modal>
      <ToastComponent />
    </div>
  );
};

export default PostsFeed;
