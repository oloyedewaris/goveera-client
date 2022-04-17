import React, { useState } from "react";
import { Alert, Button, Input, Form } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Spinner from "../../Spinner/Spinner";
import axiosInstance from "../../../util/axiosInstance";
import toastInstance from "../../../util/toastInstance";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";

const CreatePoll = ({ onClose, setRefreshFeeds }) => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [question, setQuestion] = useState("");

  const onQuestionChange = e => {
    setError(null);
    setQuestion(e.target.value);
  }

  const onOptionChange = e => {
    setError(null);
    setOptionName(e.target.value);
  };

  const addOptions = () => {
    setError(null);
    if (optionName) {
      if (options.includes(optionName)) {
        setError("Enter a different option");
      } else {
        setOptions([...options, optionName]);
        setOptionName("");
      }
    } else {
      setError("Please enter option");
    }
  };

  const removePoll = i => {
    const newOptions = [...options];
    newOptions.splice(i, 1);
    setOptions(newOptions);
  }

  const onCreatePoll = () => {
    if (question === "") {
      setError("Please enter a question");
    } else if (options?.length < 0) {
      setError("Please add at least one option");
    } else {
      const newPoll = {
        question,
        options
      };
      setCreating(true)
      axiosInstance
        .post("/api/polls", newPoll)
        .then(res => {
          setCreating(false)
          if (res.data.success) {
            setQuestion("");
            setOptions([]);
            setOptionName('');
            setError(null);
            setRefreshFeeds(true);
            onClose();
          }
        })
        .catch(err => {
          setCreating(false)
          toastInstance("Couldn't create poll, try again", true)
        });
    }
  };

  return (
    <div className="create_post">
      <h3>Create A New Poll</h3>
      {error && <Alert type="error" message={error} />}
      {creating && <Spinner />}
      <Form className="poll_input_container">
        <Input
          value={question}
          placeholder="Enter question"
          onChange={onQuestionChange}
        />
        <Input
          value={optionName}
          placeholder="Enter option name"
          onChange={onOptionChange}
          onKeyPress={e => e.key === 'Enter' && addOptions()}
        />
        {options.map((option, i) => (
          <h3 className="map_list" key={Math.random()}>
            {option} <DeleteTwoTone twoToneColor="red" onClick={() => removePoll(i)} className="delete_from_list" />
          </h3>
        ))}
        <div className="poll_button_container">
          <Button onClick={addOptions}>Add Poll Option</Button>
          <Button type="primary" onClick={onCreatePoll}>Create</Button>
        </div>
      </Form>
      <ToastComponent />
    </div>
  );
};
export default CreatePoll;
