import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Input, Form } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { createPoll } from "../../../redux/actions/pollActions";
import Spinner from "../../Spinner/Spinner";

const CreatePoll = ({ onClose }) => {
  const dispatch = useDispatch();
  const pollCreating = useSelector(state => state.poll.pollCreating);
  const pollCreated = useSelector(state => state.poll.pollCreated);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (pollCreated) {
      setQuestion("");
      setOptions([]);
      onClose();
    }
  }, [pollCreated, onClose])

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
    if (optionName !== "") {
      const newOption = {
        optionName,
        voters: []
      };
      setOptions([...options, newOption]);
      setOptionName("");
    } else {
      setError("Please enter option name");
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
    } else if (options && options.length === 0) {
      setError("Please add at least one option");
    } else {
      const newPoll = {
        question,
        options
      };
      dispatch(createPoll(newPoll));
    }
  };

  return (
    <div className="create_post">
      <h3>Create A New Poll</h3>
      {error && <Alert type="error" message={error} />}
      {pollCreating && <Spinner />}
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
            {option.optionName} <DeleteTwoTone twoToneColor="red" onClick={() => removePoll(i)} className="delete_from_list" />
          </h3>
        ))}
        <div className="poll_button_container">
          <Button onClick={addOptions}>Add Poll Option</Button>
          <Button type="primary" onClick={onCreatePoll}>Create</Button>
        </div>
      </Form>

    </div>
  );
};
export default CreatePoll;
