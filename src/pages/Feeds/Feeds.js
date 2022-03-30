import React from "react";
import { Tabs, Modal, List } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostsFeed from "./sections/PostsFeed";
import PollsFeed from "./sections/PollsFeed";
import ProjectsFeed from "./sections/ProjectsFeed";
import { clearJustCreated } from '../../redux/actions/authActions'
import CreateNew from "./CreateNew";
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

const Feeds = () => {
  const location = useLocation()
  const history = useHistory()
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

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
    </div>
  );
};

export default Feeds;
