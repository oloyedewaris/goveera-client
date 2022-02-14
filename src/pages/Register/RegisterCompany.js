import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerCompany } from "../../redux/actions/authActions";

const RegisterCompany = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.error);

  const history = useHistory();

  useEffect(() => {
    if (user && user.company) {
      setRedirect(true)
    }
  }, [user]);

  useEffect(() => {
    if (error.id === "REGISTER_SUCCESS_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newCompany = { userId: auth.user._id, name, about, address };
    dispatch(registerCompany(newCompany));
  };

  const isSubmiting = (e) => {
    setSubmit(true);
    onFormSubmit(e);
  };

  return (
    <div>
      {!redirect ? <div className="container">
        <h2>Register Your Company</h2>
        <Form className="form">
          {msg && <Alert className="alert" message={msg} type="error" showIcon closable />}
          <Form.Item label="Name" name="name">
            <Input type="text" value={name} placeholder="Company's Name" onChange={onNameChange} />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input type="text" value={address} placeholder="Company's Address" onChange={onAddressChange} />
          </Form.Item>
          <Form.Item label="About Company">
            <Input type="text" value={about} placeholder="About Company" onChange={onAboutChange} />
          </Form.Item>
          <Button style={{ margin: "5px" }} type="primary" onClick={isSubmiting} disabled={submit} loading={submit} >
            Submit
          </Button>
        </Form>
      </div> :
        <>{history.push("/home")}</>}
    </div>
  );
};

export default RegisterCompany;
