import React, { useEffect } from "react";
import { List, Avatar, Skeleton, Popconfirm, Dropdown, Menu, Space } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LikeOutlined, LikeFilled, DislikeFilled, DislikeOutlined, CommentOutlined, DeleteTwoTone, TagOutlined, EyeOutlined, LinkOutlined, UserOutlined } from "@ant-design/icons";
import { getProjects, updateProject, deleteProject } from "../../../redux/actions/projectActions";
import { saveItem } from "../../../redux/actions/authActions";
import toastInstance from "../../../util/toastInstance";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";

const ProjectsFeed = () => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.project.projects);
  const projectLoading = useSelector((state) => state.project.projectLoading);
  const updatingProject = useSelector((state) => state.project.updatingProject);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      {projectLoading ? (
        <Skeleton active paragraph={{ row: 10 }} />
      ) : (
        <div className="posts-list">
          {projects ? (
            projects.length === 0 ? (
              <h3>No project to show, make a project to appear here</h3>
            ) : (
              <List
                itemLayout="vertical"
                pagination={{ pageSize: 5 }}
                dataSource={projects}
                renderItem={(project, i) => {
                  return (
                    <List.Item
                      className="feeds_dropdown_bg"
                      key={i}
                      actions={[
                        <Space style={{ margin: "5px" }} size="small" disabled={updatingProject}
                          onClick={() => project.supporters.includes(auth.user._id) ?
                            dispatch(updateProject({ projectId: project._id, action: "unsupport" })) :
                            dispatch(updateProject({ projectId: project._id, action: "support" }))} >
                          {`${project.supporters.length} `}
                          {project.supporters.includes(auth.user._id) ?
                            <LikeFilled style={{ color: "green" }} /> : <LikeOutlined style={{ color: "green" }} />}
                        </Space>,
                        <Space style={{ margin: "5px" }} size="small" disabled={updatingProject}
                          onClick={() => project.opposers.includes(auth.user._id) ?
                            dispatch(updateProject({ projectId: project._id, action: "unoppose" })) :
                            dispatch(updateProject({ projectId: project._id, action: "oppose" }))} >
                          {`${project.opposers.length}`}
                          {project.opposers.includes(auth.user._id) ?
                            <DislikeFilled style={{ color: "red" }} /> : <DislikeOutlined style={{ color: "red" }} />}
                        </Space>,
                        <Space size="small">
                          <Link to={`/project/${project._id}`}>
                            {`${project.comments.length} `}<CommentOutlined />
                          </Link>
                        </Space>
                      ]}>
                      <Dropdown.Button className="feeds_dropdown" overlay={
                        <Menu>
                          <Menu.Item key="3" icon={<EyeOutlined />}>
                            <Link to={`/project/${project._id}`}>
                              View Project
                            </Link>
                          </Menu.Item>
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
                            <Menu.Item style={{ color: "red" }} key="1"
                              icon={<DeleteTwoTone twoToneColor="red" />}>
                              <Popconfirm
                                onConfirm={() => dispatch(deleteProject(project._id))}
                                placement="left"
                                title="Are you sure you want to delete this project"
                                okText="Yes"
                                cancelText="No">
                                Delete Project
                              </Popconfirm>
                            </Menu.Item>}
                        </Menu>
                      } trigger={["click"]} />
                      <List.Item.Meta
                        avatar={<Avatar icon={!project.initiator.image && <UserOutlined />} src={project.initiator.image} />}
                        title={project.title}
                        description={
                          <div className="post-in-list">
                            <p>{project.description}</p>
                            <p className="time_ago">{timeAgo.format(project.postedTime)}</p>
                          </div>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            )
          ) : null}
        </div >
      )}
      <ToastComponent />
    </div >
  );
};

export default ProjectsFeed;
