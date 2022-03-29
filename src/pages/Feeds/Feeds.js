import React, { useState, useEffect } from "react";
import { Tabs, Modal } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostsFeed from "./sections/PostsFeed";
import PollsFeed from "./sections/PollsFeed";
import ProjectsFeed from "./sections/ProjectsFeed";
import { clearJustCreated } from '../../redux/actions/authActions'
import CreateNew from "./CreateNew";
import "./feeds.less";

const Feeds = () => {
  const location = useLocation()
  const history = useHistory()
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (user?.justCreated) {
      setToggle(true)
    }
  }, [user?.justCreated])

  const closeModal = () => {
    setToggle(false)
    dispatch(clearJustCreated())
  }

  const onTabChange = (key) => {
    history.push(`/home${key}`)
  }

  const { TabPane } = Tabs;
  return (
    <div className="feeds_container">
      <div>
        <CreateNew />
      </div>
      <Tabs onChange={onTabChange} defaultActiveKey={location.search} >
        <TabPane tab="Discussions" key="?tab=post">
          <PostsFeed />
        </TabPane>
        <TabPane tab="Polls" key="?tab=poll">
          <PollsFeed />
        </TabPane>
        <TabPane tab="Projects" key="?tab=project">
          <ProjectsFeed />
        </TabPane>
      </Tabs>
      {user?.justCreated &&
        <Modal title="Welcome to Goveera" visible={toggle} onCancel={closeModal}>
          <p>Hurray, Welcome</p>
        </Modal>}

    </div>
  );
};

export default Feeds;
