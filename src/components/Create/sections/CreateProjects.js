import React, { useState } from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Spinner from "../../Spinner/Spinner";
import axiosInstance from '../../../util/axiosInstance'
import toastInstance from '../../../util/toastInstance'
import ToastComponent from '../../../components/ToastComponent/ToastComponent'

const { RangePicker } = DatePicker;

const CreateProject = ({ onClose, setRefreshFeeds }) => {
  const [creating, setCreating] = useState(false);
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    title: { body: '', error: null },
    description: { body: '', error: null },
    budget: { body: '', error: null },
    timeFrame: { body: '', error: null },
    task: { body: '', error: null },
  });
  const { title, description, budget, timeFrame, task } = form

  const addTasks = () => {
    if (!task.body) {
      setForm(form => ({ ...form, task: { body: '', error: 'Please enter task name' } }))
    } else if (tasks.includes(task.body)) {
      setForm(form => ({ ...form, task: { body: '', error: 'Enter a different task' } }))
    } else {
      setTasks([...tasks, task.body])
      setForm(form => ({ ...form, task: { body: '', error: null } }))
    }
  };

  const removeTask = i => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks)
  }

  const onFormSubmit = e => {
    e.preventDefault();
    if (!title.body || !description.body || tasks.length === 0 || !budget.body || timeFrame.body.length === 0) {
      if (!title.body) setForm(form => ({ ...form, title: { body: '', error: 'Title is required' } }))
      if (!budget.body) setForm(form => ({ ...form, budget: { body: '', error: 'Budget is required' } }))
      if (!description.body) setForm(form => ({ ...form, description: { body: '', error: 'description is required' } }))
      if (tasks.length === 0) setForm(form => ({ ...form, task: { body: '', error: 'Add at least one task' } }))
      if (timeFrame.body.length === 0) setForm(form => ({ ...form, timeFrame: { body: '', error: 'time frame is required' } }))
    } else {
      const newProject = {
        title: title.body,
        description: description.body,
        tasks,
        timeFrame: timeFrame.body,
        budget: budget.body,
      };
      setCreating(true)
      axiosInstance
        .post("/api/projects", newProject)
        .then(res => {
          setCreating(false)
          if (res.data.success) {
            setRefreshFeeds(true)
            onClose()
          }
        })
        .catch(err => {
          setCreating(false)
          toastInstance("Couldn't create project, try again", true)
        });
    }
  };

  return (
    <div className="create_post">
      <h3>Create A New Project</h3>
      {creating && <Spinner />}
      <Form className="project_form">
        <Form.Item label="Title">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{title.error}</span>
          <Input style={title.error && ({ border: '1px solid red' })}
            type="title" value={title.body} placeholder="Title"
            onChange={e => setForm({ ...form, title: { body: e.target.value, error: null } })} />
        </Form.Item>
        <Form.Item label="Description">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{description.error}</span>
          <Input.TextArea style={description.error && ({ border: '1px solid red' })}
            type="text" value={description.body} placeholder="Description"
            onChange={e => setForm({ ...form, description: { body: e.target.value, error: null } })} />
        </Form.Item>
        <Form.Item label="Budget">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{budget.error}</span>
          <Input style={budget.error && ({ border: '1px solid red' })}
            type="number" value={budget.body} placeholder="Project Budget (N)"
            onChange={e => setForm({ ...form, budget: { body: e.target.value, error: null } })} />
        </Form.Item>
        <Form.Item label="Time Frame">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{timeFrame.error}</span>
          <RangePicker size="small" style={timeFrame.error && ({ border: '1px solid red' })}
            onChange={(moment, array) => setForm({ ...form, timeFrame: { body: moment, error: null } })} />
        </Form.Item>
        <Form.Item label={<Button size="small" type="dashed" onClick={addTasks}>Add Task</Button>} >
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{task.error}</span>
          <Input style={task.error && ({ border: '1px solid red' })}
            type="text" value={task.body} placeholder="Enter a task"
            onChange={e => setForm({ ...form, task: { body: e.target.value, error: null } })}
            onKeyPress={e => e.key === 'Enter' && addTasks()} />
        </Form.Item>
        {tasks.map((task, i) =>
          <h3 className="map_list" key={Math.random()}>
            {task}<DeleteTwoTone twoToneColor="red" onClick={() => removeTask(i)} className="delete_from_list" />
          </h3>
        )}
        <Button type="primary" onClick={onFormSubmit}>Submit</Button>
      </Form>
      <ToastComponent />
    </div>
  );
};

export default CreateProject;
