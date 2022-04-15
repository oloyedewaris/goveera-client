import React, { useEffect, useState } from "react";
import { List, Skeleton, Button, Divider } from "antd";
import { useSelector } from "react-redux";
import axiosInstance from "../../util/axiosInstance";
import Post from '../Feeds/sections/Post/Post';
import Poll from '../Feeds/sections/Post/Poll';
import Project from '../Feeds/sections/Post/Project';
import toastInstance from '../../util/toastInstance';
import ToastComponent from '../../components/ToastComponent/ToastComponent';

const ProfileFeeds = () => {
  const user = useSelector(state => state.auth.user)

  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([])
  const [updating, setUpdating] = useState(false)
  const [limit, setLimit] = useState(8)
  const [count, setCount] = useState(8)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    axiosInstance
      .get(`/api/users/posts/${user._id}?limit=8`)
      .then(res => {
        setAllPosts(res.data.allPosts)
        setCount(res.data.count)
        setLoading(false)
      })
      .catch(err => {
        toastInstance("Couldn't get user's feeds", true)
        setLoading(false)
      });
  }, [user._id]);

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
        toastInstance("Couldn't update post", true)
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
      .get(`/api/users/posts/${user._id}?limit=${limit + 4}`)
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
      {loading ? (
        <Skeleton active paragraph={{ row: 10 }} />
      ) : (
        <div className="posts-list">
          {allPosts.length > 0 ? (
            <div style={{ margin: '10px auto' }}>
              <Divider orientation="left">Personal Feeds</Divider>
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
                    return;
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
      <ToastComponent />
    </div>
  );
};

export default ProfileFeeds;
