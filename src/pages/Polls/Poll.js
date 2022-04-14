import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Menu, Dropdown, Popconfirm } from "antd";
import TimeAgo from "javascript-time-ago";
import { ArrowLeftOutlined, UserOutlined, HeartOutlined, HeartFilled, DeleteTwoTone, TagOutlined, LinkOutlined }
  from "@ant-design/icons";
import en from "javascript-time-ago/locale/en";
import { Link, useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from 'react-spring'
import { saveItem } from "../../redux/actions/authActions";
import Comments from "./sections/Comments";
import CommentInput from "./sections/CommentInput";
import Spinner from "../../components/Spinner/Spinner"
import toastInstance from "../../util/toastInstance";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import axiosInstance from '../../util/axiosInstance'

const Poll = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [poll, setPoll] = useState(null);
  const [pollLoading, setPollLoading] = useState(false);
  const [updatingPoll, setUpdatingPoll] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const pollId = useParams().id;
  const history = useHistory();

  const transition = useTransition(isVisible, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
  })

  useEffect(() => {
    setPollLoading(true)
    axiosInstance
      .get(`/api/polls/${pollId}`)
      .then(res => {
        setPoll(res.data.poll)
        setPollLoading(false)
        setVisible(true)
      })
      .catch(err => {
      });
  }, [pollId]);

  const updatePoll = ({ optionName, action }) => {
    setUpdatingPoll(true)
    axiosInstance
      .patch(`/api/polls/${pollId}`, { optionName, action })
      .then(res => {
        setPoll(res.data.poll)
        setUpdatingPoll(false)
      })
      .catch(err => {
      });
  };

  const addComment = text => {
    setUpdatingPoll(true)
    axiosInstance
      .patch(`/api/polls/${pollId}`, { action: 'addComment', commenterId: auth.user._id, text })
      .then(res => {
        setPoll(res.data.poll)
        setUpdatingPoll(false)
      })
      .catch(err => {
      });
  };

  const deleteComment = commentId => {
    console.log(commentId)
    setUpdatingPoll(true)
    axiosInstance
      .patch(`/api/polls/${pollId}`, { action: 'deleteComment', commentId })
      .then(res => {
        setPoll(res.data.poll)
        setUpdatingPoll(false)
      })
      .catch(err => {
      });
  };

  const deletePoll = pollId => {
    setUpdatingPoll(true)
    axiosInstance
      .delete(`/api/polls/${pollId}`)
      .then(res => {
        setUpdatingPoll(false)
        if (res.data.deletedPoll._id === poll._id)
          history.push('/home?tab=poll')
      })
      .catch(err => {
      });
  };

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  const calculateVote = (poll) => {
    let total = 0;
    poll.options.forEach((option) => {
      total += option.voters.length;
    });
    return total;
  }

  const checkVoted = (poll) => {
    let voted = false
    poll.options.forEach((option) => {
      if (option.voters.includes(auth.user._id)) {
        voted = true;
      }
    });
    return voted;
  };

  return (
    <div className="feeds_dropdown_bg">
      <div onClick={() => history.goBack()} style={{ margin: "5px" }}>
        <ArrowLeftOutlined />
      </div>
      {pollLoading ? <Spinner size="large" /> :
        <>
          {transition((style, item) =>
            item && <animated.div style={style}>
              {poll ? (
                <>
                  <List.Item
                    actions={[
                      <IconText
                        style={{ cursor: 'pointer', color: '#ff889c' }}
                        onClick={() => !poll.likers.includes(auth.user._id) ?
                          updatePoll({ action: "like" }) :
                          updatePoll({ action: "unlike" })
                        }
                        text={`${poll.likers.length}`} disabled={updatingPoll}
                        icon={!poll.likers.includes(auth.user._id) ? HeartOutlined : HeartFilled}
                      />
                    ]}
                  >
                    <Dropdown.Button className="feeds_dropdown" overlay={
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            auth.user.saves.find((save) => save.link === `/poll/${poll._id}`) ?
                              dispatch(
                                saveItem({ type: 'poll', link: `/poll/${poll._id}`, title: poll.question })
                                  (() => toastInstance('Poll unsaved'))
                              ) :
                              dispatch(
                                saveItem({ type: 'poll', link: `/poll/${poll._id}`, title: poll.question, action: 'save' })
                                  (() => toastInstance('Poll saved'))
                              )
                          }
                          key="4"
                          icon={<TagOutlined />}>
                          {auth.user.saves.find((save) => save.link === `/poll/${poll._id}`) ? 'Unsave' : 'Save'}
                        </Menu.Item>
                        <Menu.Item onClick={() => navigator.clipboard.writeText(`${window.location.origin}/poll/${poll._id}`)} key="2" icon={<LinkOutlined />}>
                          Copy link
                        </Menu.Item>
                        {auth.user._id === poll.surveyor._id &&
                          <Menu.Item style={{ color: "red" }} key="3"
                            icon={<DeleteTwoTone twoToneColor="red" />}>
                            <Popconfirm
                              onConfirm={() => deletePoll(poll._id)}
                              placement="left"
                              title="Are you sure you want to delete this Poll"
                              okText="Yes"
                              cancelText="No">
                              Delete Poll
                            </Popconfirm>
                          </Menu.Item>}
                      </Menu>
                    } trigger={["click"]} />
                    <List.Item.Meta
                      avatar={<Avatar icon={!poll.surveyor.image && <UserOutlined />} src={poll.surveyor.image} />}
                      title={<Link to={`/profile/${poll.surveyor._id}`}>{`${poll.surveyor.firstName} ${poll.surveyor.lastName}`}</Link>}
                      description={
                        <div className="poll-in-list">
                          <h4>{poll.question}</h4>
                          {poll.options.map((option) => {
                            const percentage = (option.voters.length / calculateVote(poll)) * 100;
                            return (
                              <div key={Math.random()} className="poll_names_con">
                                {checkVoted(poll) ?
                                  <div className="poll_names_voted_con">
                                    <div style={{ width: `${percentage}%` }} className="poll_names_voted" />
                                    <h4>{option.optionName}</h4>
                                    <h5 style={{ textAlign: "center" }}>{percentage}%</h5>
                                  </div> :
                                  <div className="poll_names_not_voted"
                                    onClick={() => updatePoll({
                                      optionName: option.optionName,
                                      action: 'vote'
                                    })}>
                                    <h4>{option.optionName}</h4>
                                  </div>}
                              </div>
                            )
                          })}
                          <p className="time_ago">{timeAgo.format(poll.postedTime, 'twitter-now')}</p>
                        </div>
                      } />
                    <div>
                    </div>
                  </List.Item>
                  <Comments poll={poll} deleteComment={deleteComment} />
                  <CommentInput poll={poll} addComment={addComment} />
                </>
              ) : (
                <div className="loader">
                  No post to show
                </div>
              )}
            </animated.div>)}</>}
      <ToastComponent />
    </div >
  );
};

export default Poll;
