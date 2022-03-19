import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, Alert, DatePicker } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { createProject, resetCreated } from "../../../redux/actions/projectActions";
import Spinner from "../../Spinner/Spinner";

const { RangePicker } = DatePicker;

const CreateProject = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const projectCreating = useSelector(state => state.project.projectCreating);
  const projectCreated = useSelector(state => state.project.projectCreated);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    if (projectCreated) {
      setDescription("");
      setBudget("");
      setTimeFrame("");
      setTitle("");
      setTasks([]);
      setTask();
      setError(null);
      onClose();
    }
    return () => {
      dispatch(resetCreated())
      // history.push('/home?tab=project')
    }
  }, [projectCreated, onClose, dispatch, history])

  const onTitleChange = e => {
    setError(null)
    setTitle(e.target.value);
  };

  const onDescriptionChange = e => {
    setError(null)
    setDescription(e.target.value);
  };

  const onBudgetChange = e => {
    setError(null)
    setBudget(e.target.value);
  };

  const onTimeFrameChange = (dateString, dateArray) => {
    setError(null);
    setTimeFrame(dateArray);
  };

  const onTaskChange = (e) => {
    setError(null)
    setTask(e.target.value);
  };

  const addTasks = () => {
    if (!task) {
      setError("Please enter task name");
    } else if (tasks.includes(task)) {
      setError("Enter a different task name");
    } else {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = i => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  const onFormSubmit = e => {
    e.preventDefault();
    if (!title || !description || tasks.length === 0 || !budget || timeFrame.length === 0) {
      setError("Please complete the form")
    } else {
      const newProject = {
        title,
        description,
        tasks,
        timeFrame,
        budget,
      };
      dispatch(createProject(newProject));
    }
  };

  return (
    <div className="create_post">
      <h3>Create A New Project</h3>
      {projectCreating && <Spinner />}
      <Form className="project_form">
        <Form.Item label="Title">
          <Input
            type="title"
            value={title}
            placeholder="Title"
            required
            onChange={onTitleChange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            type="text"
            value={description}
            placeholder="Description"
            required
            onChange={onDescriptionChange} />
        </Form.Item>
        <Form.Item label="Budget">
          <Input
            type="number"
            value={budget}
            placeholder="Project Budget (N)"
            required
            onChange={onBudgetChange} />
        </Form.Item>
        <Form.Item label="Time Frame">
          <RangePicker size="small" onChange={onTimeFrameChange} />
        </Form.Item>
        <Form.Item
          label={<Button size="small" type="dashed" onClick={addTasks}>Add Task</Button>} >
          <Input
            type="text"
            value={task}
            placeholder="Enter a task"
            onChange={onTaskChange}
            onKeyPress={e => e.key === 'Enter' && addTasks()}
          />
        </Form.Item>
        {tasks.map((task, i) =>
          <h3 className="map_list" key={Math.random()}>
            {task}<DeleteTwoTone twoToneColor="red" onClick={() => removeTask(i)} className="delete_from_list" />
          </h3>
        )}
        {error && <Alert type="error" message={error} />}
        <Button type="primary" onClick={onFormSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

export default CreateProject;
