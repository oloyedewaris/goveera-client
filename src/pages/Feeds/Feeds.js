import React, { useState, useEffect } from "react";
import { Tabs, Modal } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import Create from "../../components/Create/Create"
import PostsFeed from "./sections/PostsFeed";
import PollsFeed from "./sections/PollsFeed";
import ProjectsFeed from "./sections/ProjectsFeed";
import CreateNew from "./CreateNew";
import "./feeds.less";

const Feeds = () => {
  const location = useLocation()
  const history = useHistory()
  const [toggle, setToggle] = useState(false)
  const [registeredSuccess, setRegisteredSuccess] = useState(false)

  const registered = localStorage.getItem("registered")

  useEffect(() => {
    if (registered) {
      setRegisteredSuccess(true);
    }
    return () => {
      localStorage.removeItem("registered");
    }
  }, [registered])

  const onTabChange = (key) => {
    history.push(`/home${key}`)
  }

  const { TabPane } = Tabs;
  return (
    <div className="feeds_container">
      <div onClick={() => setToggle(!toggle)}>
        <CreateNew />
      </div>
      <Tabs onChange={onTabChange} defaultActiveKey={location.search} >
        <TabPane tab="Forum" key="?tab=post">
          <PostsFeed />
        </TabPane>
        <TabPane tab="Polls" key="?tab=poll">
          <PollsFeed />
        </TabPane>
        <TabPane tab="Projects" key="?tab=project">
          <ProjectsFeed />
        </TabPane>
      </Tabs>
      <Modal title="You have successfully registered"
        visible={registeredSuccess} onCancel={() => setRegisteredSuccess(false)}>
        <h2 style={{ fontSize: "25px" }}>Hurray🎉🎉!!, Welcome to Goveera</h2>
        <h4>To get the best out of this platfom, please follow these steps</h4>
        <p>Upload your profile picture for easy recognition</p>
        <p>Make your first post, poll or project in the home section</p>
        <p>Explore colleagues and users from other companies</p>
        <p>Add a bio in the profile section</p>
      </Modal>
      <Modal title="Create a New Post" visible={toggle} onCancel={() => setToggle(false)}>
        <Create onClose={() => setToggle(false)} />
      </Modal>
    </div>
  );
};

export default Feeds;
