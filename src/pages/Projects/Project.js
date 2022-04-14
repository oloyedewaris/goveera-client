import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { Modal, List, Avatar, Space, Dropdown, Menu, Popconfirm } from "antd";
import { useTransition, animated } from 'react-spring';
import StageForm from "./sections/StageForm";
import Statistics from "./sections/Statistics";
import Comments from "./sections/Comments";
import CommentInput from "./sections/CommentInput";
import TaskTable from "./sections/TaskTable"
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  ArrowLeftOutlined,
  EditOutlined,
  UserOutlined,
  TagOutlined,
  DeleteTwoTone,
  LinkOutlined
} from "@ant-design/icons";
import Spinner from "../../components/Spinner/Spinner";
import axiosInstance from '../../util/axiosInstance'
import toastInstance from '../../util/toastInstance'
import ToastComponent from '../../components/ToastComponent/ToastComponent'
import { saveItem } from '../../redux/actions/authActions'

const Post = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const history = useHistory()
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [projectStage, setProjectStage] = useState(null);
  const [project, setProject] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [updatingProject, setUpdatingProject] = useState(false);
  const auth = useSelector((state) => state.auth);
  const projectId = useParams().id;

  const transition = useTransition(isVisible, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
  })

  useEffect(() => {
    setProjectLoading(true)
    axiosInstance
      .get(`/api/projects/${projectId}`)
      .then(res => {
        setProject(res.data.project)
        setVisible(true)
        setProjectLoading(false)
      })
      .catch(err => {
        toastInstance("Couldn't get project", true)
        setProjectLoading(false)
      });
  }, [projectId]);

  const onUpdateStage = () => {
    if (projectStage) {
      updateProject({ action: "updateStage", stage: projectStage })
      setIsOpen(false);
    }
  };

  const updateProject = ({ action, stage, taskName }) => {
    setUpdatingProject(true)
    axiosInstance
      .patch(`/api/projects/${projectId}`, { action, stage, taskName })
      .then(res => {
        setProject(res.data.project)
        setUpdatingProject(false)
      })
      .catch(err => {
        setUpdatingProject(false)
        toastInstance("Couldn't update project", true)
      });
  };

  const addComment = text => {
    setUpdatingProject(true)
    axiosInstance
      .patch(`/api/projects/${projectId}`, { action: 'addComment', commenterId: auth.user._id, text })
      .then(res => {
        setProject(res.data.project)
        setUpdatingProject(false)
      })
      .catch(err => {
        setUpdatingProject(false)
        toastInstance("Couldn't add comment", true)
      });
  };

  const deleteComment = commentId => {
    setUpdatingProject(true)
    axiosInstance
      .patch(`/api/projects/${projectId}`, { action: 'deleteComment', commentId })
      .then(res => {
        setProject(res.data.project)
        setUpdatingProject(false)
      })
      .catch(err => {
        setUpdatingProject(false)
        toastInstance("Couldn't delete comment", true)
      });
  };

  const deleteProject = () => {
    setUpdatingProject(true)
    axiosInstance
      .delete(`/api/projects/${projectId}`)
      .then(res => {
        if (res.data.deletedProject === project._id)
          history.push('/project?tab=project')
        setUpdatingProject(false)
      })
      .catch(err => {
        setUpdatingProject(false)
        toastInstance("Couldn't delete project", true)
      });
  };


  const handleCancel = () => {
    setIsOpen(false);
    setProjectStage("");
  };

  const IconText = ({ icon, text, ...props }) => (
    <Space {...props}>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <div className="feeds_dropdown_bg">
      <div onClick={() => history.goBack()} style={{ margin: "5px" }}>
        <ArrowLeftOutlined />
      </div>
      <>{projectLoading ? <Spinner /> :
        <>
          {transition((style, item) =>
            item && <animated.div style={style}>
              {project ? (
                <div className="posts-comment">
                  <List.Item
                    actions={[
                      <IconText
                        disabled={updatingProject}
                        onClick={() => project.supporters.includes(auth.user._id) ?
                          updateProject({ projectId: project._id, action: "unsupport" }) :
                          updateProject({ projectId: project._id, action: "support" })}
                        style={{ color: "green" }}
                        icon={project.supporters.includes(auth.user._id) ? LikeFilled : LikeOutlined}
                        text={`${project.supporters.length} `}
                      />,
                      <IconText
                        style={{ color: "red" }}
                        disabled={updatingProject}
                        onClick={() => project.opposers.includes(auth.user._id) ?
                          updateProject({ projectId: project._id, action: "unoppose" }) :
                          updateProject({ projectId: project._id, action: "oppose" })}
                        icon={project.opposers.includes(auth.user._id) ? DislikeFilled : DislikeOutlined}
                        text={`${project.opposers.length} `}
                      />,
                      <>
                        {auth.user._id === project.initiator._id && <IconText
                          onClick={() => setIsOpen(true)}
                          icon={EditOutlined}
                        />}
                      </>
                    ]}
                  >
                    <Dropdown.Button className="feeds_dropdown" overlay={
                      <Menu>
                        <Menu.Item
                          onClick={() =>
                            auth.user.saves.find((save) => save.link === `/project/${project._id}`) ?
                              dispatch(
                                saveItem({ type: 'project', link: `/project/${project._id}`, title: project.question })
                                  (() => toastInstance('Project unsaved'))
                              ) :
                              dispatch(
                                saveItem({ type: 'project', link: `/project/${project._id}`, title: project.question, action: 'save' })
                                  (() => toastInstance('Project saved'))
                              )
                          }
                          key="4"
                          icon={<TagOutlined />}>
                          {auth.user.saves.find((save) => save.link === `/project/${project._id}`) ? 'Unsave' : 'Save'}
                        </Menu.Item>
                        <Menu.Item onClick={() => navigator.clipboard.writeText(`${window.location.origin}/project/${project._id}`)} key="2" icon={<LinkOutlined />}>
                          Copy link
                        </Menu.Item>
                        {auth.user._id === project.initiator._id &&
                          <Menu.Item style={{ color: "red" }} key="3"
                            icon={<DeleteTwoTone twoToneColor="red" />}>
                            <Popconfirm
                              onConfirm={() => deleteProject(project._id)}
                              placement="left"
                              title="Are you sure you want to delete this Project"
                              okText="Yes"
                              cancelText="No">
                              Delete Project
                            </Popconfirm>
                          </Menu.Item>}
                      </Menu>
                    } trigger={["click"]} />
                    <List.Item.Meta
                      avatar={<Avatar icon={!project.initiator.image && <UserOutlined />} src={project.initiator.image} />}
                      title={<Link to={`/profile/${project.initiator._id}`}>{`${project.initiator.firstName} ${project.initiator.lastName}`}</Link>}
                      description={timeAgo.format(project.postedTime, 'twitter-now')}
                    />
                  </List.Item>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <Statistics project={project} />
                  <TaskTable project={project} updateProject={updateProject} />
                  <Comments project={project} deleteComment={deleteComment} />
                  <CommentInput project={project} addComment={addComment} />
                </div>
              ) : (
                <div className="loader">
                  No project to show
                </div>)}
            </animated.div>)}
        </>
      }</>
      <Modal
        title="Edit Project Stage"
        visible={isOpen}
        onCancel={handleCancel}>
        <StageForm
          onUpdateStage={onUpdateStage}
          setProjectStage={setProjectStage} />
      </Modal>
      <ToastComponent />
    </div>
  );
};

export default Post;
