import React, { useState } from "react";
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
      <Modal title="Create a New Post" visible={toggle} onCancel={() => setToggle(false)}>
        <Create onClose={() => setToggle(false)} />
      </Modal>
    </div>
  );
};

export default Feeds;
