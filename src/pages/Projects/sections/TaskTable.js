import React from "react";
import { useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";

const TaskTable = ({ project, updateProject }) => {
  const user = useSelector(state => state.auth.user);

  const completeTask = taskName => {
    const body = {
      taskName,
      action: "updateTask",
    }
    updateProject(body);
  }

  const dataSource = project.tasks.map((task, i) => ({
    key: i,
    taskName: task.taskName,
    completed: task.completed,
    action: task
  }))

  const columns = [
    {
      title: "Task",
      dataIndex: "taskName",
      key: "taskName"
    },
    {
      title: "Task Status",
      dataIndex: "completed",
      key: "completed",
      render: completed => (
        <Tag color={completed ? "green" : "red"} key={Math.random()}>
          {completed ? "Completed" : "Not completed yet"}
        </Tag>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (task) => (<div>{user._id === project.initiator._id &&
        <Button disabled={task.completed} onClick={() => completeTask(task.taskName)}>Done</Button>
      }</div>)
    }
  ]
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default TaskTable;