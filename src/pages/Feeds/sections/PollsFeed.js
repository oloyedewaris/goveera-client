import React, { useEffect } from "react";
import { List, Avatar, Skeleton, Popconfirm, Dropdown, Menu, Space } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { DeleteTwoTone, LinkOutlined, EyeOutlined, UserOutlined, HeartOutlined, HeartFilled, CommentOutlined, TagOutlined } from "@ant-design/icons";
import { getPolls, deletePoll, updatePoll } from "../../../redux/actions/pollActions";
import { saveItem } from "../../../redux/actions/authActions";

const PollsFeed = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const polls = useSelector((state) => state.poll.polls);
  const pollLoading = useSelector((state) => state.poll.pollLoading);
  const updatingPoll = useSelector((state) => state.poll.updatingPoll);

  useEffect(() => {
    dispatch(getPolls());
  }, [dispatch]);

  const onDeletePoll = (pollId) => {
    dispatch(deletePoll(pollId));
  };

  const onUpdatePoll = ({ pollId, optionName }) => {
    dispatch(updatePoll({ pollId, optionName, action: 'vote' }));
  };

  const onLikeClick = ({ pollId }) => {
    dispatch(updatePoll({ pollId, action: "like" }));
  };

  const onUnlikeClick = ({ pollId }) => {
    dispatch(updatePoll({ pollId, action: "unlike" }));
  };

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

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div>
      {pollLoading ? (
        <Skeleton active paragraph={{ row: 10 }} />
      ) : (
        <div className="posts-list">
          {polls ? (
            polls.length === 0 ? (
              <h3>No poll to show, make a poll to appear here</h3>
            ) : (
              <List
                itemLayout="vertical"
                pagination={{ pageSize: 8 }}
                dataSource={polls}
                renderItem={(poll, i) => {
                  return (
                    <List.Item key={i} className="feeds_dropdown_bg"
                      actions={[
                        <IconText
                          style={{ cursor: 'pointer', color: "#ff889c" }}
                          onClick={() => !poll.likers.includes(auth.user._id) ?
                            onLikeClick({ pollId: poll._id }) :
                            onUnlikeClick({ pollId: poll._id })}
                          disabled={updatingPoll} text={`${poll.likers.length}`}
                          icon={!poll.likers.includes(auth.user._id) ? HeartOutlined : HeartFilled}
                        />,
                        <Link to={`/poll/${poll._id}`}>
                          <IconText icon={CommentOutlined} text={`${poll.comments.length}`} />
                        </Link>,
                      ]}
                    >
                      <Dropdown.Button className="feeds_dropdown" overlay={
                        <Menu>
                          <Menu.Item key="3" icon={<EyeOutlined />}>
                            <Link to={`/poll/${poll._id}`}>
                              View Poll
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            onClick={() =>
                              auth.user.saves.find((save) => save.link === `/poll/${poll._id}`) ?
                                dispatch(saveItem({ type: 'poll', link: `/poll/${poll._id}`, title: poll.question })) :
                                dispatch(saveItem({ type: 'poll', link: `/poll/${poll._id}`, title: poll.question, action: 'save' }))
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
                                onConfirm={() => onDeletePoll(poll._id)}
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
                          <div className="post-in-list">
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
                                    <button className="poll_names_not_voted"
                                      disabled={updatingPoll}
                                      onClick={() => onUpdatePoll({
                                        pollId: poll._id,
                                        optionName: option.optionName
                                      })}>
                                      <h4>{option.optionName}</h4>
                                    </button>}
                                </div>
                              )
                            })}
                            <p className="time_ago">{timeAgo.format(poll.postedTime)}</p>
                          </div>
                        } />
                      <div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PollsFeed;
