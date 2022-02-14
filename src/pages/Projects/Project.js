import React, { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Modal, List, Avatar, Space } from "antd";
import { useTransition, animated } from 'react-spring';
import { getProjects, updateProject } from "../../redux/actions/projectActions";
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
  UserOutlined
} from "@ant-design/icons";
import Spinner from "../../components/Spinner/Spinner";

const Post = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [projectStage, setProjectStage] = useState(null);
  const [project, setProject] = useState(null);
  const [isVisible, setVisible] = useState(false);

  const updatingProject = useSelector((state) => state.project.updatingProject);
  const projects = useSelector((state) => state.project.projects);
  const auth = useSelector((state) => state.auth);
  const projectId = useParams().id;

  const transition = useTransition(isVisible, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
  })

  useEffect(() => {
    dispatch(getProjects())
    setVisible(true)
    return () => setVisible(false)
  }, [dispatch]);

  useEffect(() => {
    if (projects) {
      const project = projects.find(project => project._id === projectId)
      setProject(project)
    }
  }, [projects, projectId]);

  const onSupportClick = ({ projectId }) =>
    dispatch(updateProject({ projectId, action: "support" }));

  const onUnsupportClick = ({ projectId }) =>
    dispatch(updateProject({ projectId, action: "unsupport" }));

  const onOpposeClick = ({ projectId }) =>
    dispatch(updateProject({ projectId, action: "oppose" }));

  const onUnopposeClick = ({ projectId }) =>
    dispatch(updateProject({ projectId, action: "unoppose" }));

  const onModalOpen = () => setIsOpen(true);

  const onUpdateStage = ({ projectId }) => {
    if (projectStage) {
      setIsOpen(false);
      dispatch(updateProject({ projectId, action: "updateStage", stage: projectStage }));
    }
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
    <>
      <div>
        <div style={{ margin: "5px 10px" }}><Link to="/home?tab=project"><ArrowLeftOutlined /></Link></div>
        {transition((style, item) =>
          item && <animated.div style={style}>
            {project ? (
              <div className="posts-comment">
                <List.Item
                  actions={[
                    <IconText
                      disabled={updatingProject}
                      onClick={() => project.supporters.includes(auth.user._id) ?
                        onUnsupportClick({ projectId: project._id }) :
                        onSupportClick({ projectId: project._id })}
                      style={{ color: "green" }}
                      icon={project.supporters.includes(auth.user._id) ? LikeFilled : LikeOutlined}
                      text={`${project.supporters.length} `}
                    />,
                    <IconText
                      style={{ color: "red" }}
                      disabled={updatingProject}
                      onClick={() => project.opposers.includes(auth.user._id) ?
                        onUnopposeClick({ projectId: project._id }) :
                        onOpposeClick({ projectId: project._id })}
                      icon={project.opposers.includes(auth.user._id) ? DislikeFilled : DislikeOutlined}
                      text={`${project.opposers.length} `}
                    />,
                    <>
                      {auth.user._id === project.initiator._id && <IconText
                        onClick={onModalOpen}
                        icon={EditOutlined}
                      />}
                    </>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={!project.initiator.image && <UserOutlined />} src={project.initiator.image} />}
                    title={<Link to={`/profile/${project.initiator._id}`}>{`${project.initiator.firstName} ${project.initiator.lastName}`}</Link>}
                    description={timeAgo.format(project.postedTime)}
                  />
                </List.Item>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Statistics project={project} />
                <TaskTable project={project} />
                <Comments project={project} />
                <CommentInput projectData={{ commentId: project._id, userId: auth.user._id }} />
              </div>
            ) : (
              <div className="loader">
                <Spinner size="large" />
              </div>)}
          </animated.div>)}

      </div >
      <Modal
        title="Edit Project Stage"
        visible={isOpen}
        onCancel={handleCancel}>
        <StageForm
          onUpdateStage={() => onUpdateStage({ projectId: project._id })}
          setProjectStage={setProjectStage} />
      </Modal>
    </>
  );
};

export default Post;
