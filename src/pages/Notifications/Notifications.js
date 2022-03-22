import React, { useEffect } from 'react'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { List, Avatar } from "antd";
import { CommentOutlined, LikeFilled, MailOutlined, DatabaseOutlined, DislikeFilled, HeartFilled } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner";
import { clearNotifications } from "../../redux/actions/authActions"
import toastInstance from '../../util/toastInstance';
import ToastComponent from '../../components/ToastComponent/ToastComponent';

function Notifications() {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearNotifications(() => toastInstance('Notification not cleared')))
    }
  }, [dispatch])

  const Notifications = user && user.notifications.sort((a, b) => b.time - a.time)

  const getColor = (viewed) => {
    return viewed ? "inherit" : "grey";
  }

  return (
    <div style={{ padding: "10px auto" }}>
      <h2 style={{ textAlign: "center" }}>Notifications</h2>
      {Notifications ?
        <List
          itemLayout="vertical"
          pagination={{ pageSize: 8 }}
          dataSource={Notifications}
          renderItem={(notification, i) => {
            let icon;
            switch (notification.type) {
              case "welcome":
                icon = (<MailOutlined style={{ fontSize: '30px', color: 'black' }} />)
                break;
              case "like":
                icon = (<HeartFilled style={{ fontSize: '30px', color: '#ff889c' }} />)
                break;
              case "vote":
                icon = (<DatabaseOutlined style={{ fontSize: '30px', color: 'blue' }} />)
                break;
              case "support":
                icon = (<LikeFilled style={{ fontSize: '30px', color: 'green' }} />)
                break;
              case "oppose":
                icon = (<DislikeFilled style={{ fontSize: '30px', color: 'red' }} />)
                break;
              case "comment":
                icon = (<CommentOutlined style={{ fontSize: '30px', color: 'grey' }} />)
                break;
              default:
                icon = (<Avatar style={{ fontSize: '30px' }} />)
                break;
            }
            return (
              <div style={{ backgroundColor: getColor(notification.viewed), margin: 5, padding: 5, borderRadius: 3 }}>
                <Link to={notification.link}>
                  <List.Item key={i}>
                    <List.Item.Meta
                      avatar={icon}
                      title={notification.title}
                      description={notification.body}
                    />
                    <p style={{ margin: "auto 10px" }}>{timeAgo.format(notification.time, 'twitter-now')}</p>
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
      <ToastComponent />
    </div>
  )
}

export default Notifications
