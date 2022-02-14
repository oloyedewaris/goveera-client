import React from 'react'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Avatar } from "antd";
import { DatabaseOutlined, ProjectOutlined, FormOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner";

function SavedItem() {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const user = useSelector(state => state.auth.user);

  const Items = user && user.saves.sort((a, b) => b.time - a.time)

  return (
    <div style={{ padding: "10px auto" }}>
      <h2 style={{ textAlign: "center" }}>Saved Items</h2>
      {Items ?
        <List
          itemLayout="vertical"
          pagination={{ pageSize: 4 }}
          dataSource={Items}
          renderItem={(item, i) => {
            const style = { fontSize: '30px' }
            let icon;
            switch (item.type) {
              case "post":
                icon = (<FormOutlined style={style} />)
                break;
              case "poll":
                icon = (<DatabaseOutlined style={style} />)
                break;
              case "project":
                icon = (<ProjectOutlined style={style} />)
                break;
              default:
                icon = (<Avatar style={style} />)
                break;
            }
            return (
              <div style={{ margin: 5, padding: 5, borderRadius: 3 }}>
                <Link to={item.link}>
                  <List.Item key={i}>
                    <List.Item.Meta
                      avatar={icon}
                      title={item.type}
                      description={item.title}
                    />
                    <p style={{ margin: "auto 10px" }}>{timeAgo.format(item.time)}</p>
                  </List.Item>
                </Link>
              </div>
            )
          }}
        /> : (
          <div>
            <Spinner />
          </div>
        )}
    </div>
  )
}

export default SavedItem
