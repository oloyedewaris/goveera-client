import React from "react";
import { Tabs } from "antd";
import CreatePost from "./sections/CreatePosts";
import CreateProject from "./sections/CreateProjects";
import CreatePoll from "./sections/CreatePolls";
import "./Create.less"

const { TabPane } = Tabs;

const newPost = <span style={{ fontSize: '14px' }}>New Post</span>
const newProject = <span style={{ fontSize: '14px' }}>New Project</span>
const newPoll = <span style={{ fontSize: '14px' }}>New Poll</span>

const Index = ({ onClose, setRefreshFeeds }) => {
  return (
    <Tabs defaultActiveKey="post">
      <TabPane tab={newPost} key="post">
        <CreatePost onClose={onClose} setRefreshFeeds={setRefreshFeeds} />
      </TabPane>
      <TabPane tab={newPoll} key="poll">
        <CreatePoll onClose={onClose} setRefreshFeeds={setRefreshFeeds} />
      </TabPane>
      <TabPane tab={newProject} key="project">
        <CreateProject onClose={onClose} setRefreshFeeds={setRefreshFeeds} />
      </TabPane>
    </Tabs>
  );
};

export default Index;
