import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Alert } from "antd";
import axiosInstance from "../../util/axiosInstance";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";

const { Option } = Select;

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [role, setRole] = useState(null);
  const [company, setCompany] = useState(null);
  const [position, setPosition] = useState("");
  const [companies, setCompanies] = useState([]);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const history = useHistory();

  const [form] = Form.useForm();

  useEffect(() => {
    axiosInstance.get("/api/company/get_all_companies")
      .then(res => setCompanies(res.data))
      .catch(err => alert("Can't get companies"))
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setRedirect(true)
    }
  }, [auth]);

  useEffect(() => {
    if (error.id === "REGISTER_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onFirstnameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastnameChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCompany = (key) => {
    const company = companies.find(comp => comp._id === key)
    setCompany(company._id)
  }

  const onPositionChange = (e) => {
    setPosition(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const newUser = { role, company, position, firstName, lastName, email, password };
      dispatch(register(newUser));
    } else {
      setMsg("Password did not match");
      setSubmit(false);
    }
  };

  const isSubmiting = (e) => {
    setSubmit(true);
    onFormSubmit(e);
  };

  return (
    <div>
      {!redirect ? <div className="container">
        <h2>Register</h2>
        <Form className="form" form={form}>
          {msg ? (
            <Alert className="alert" message={msg} type="error" showIcon closable />
          ) : null}
          <Form.Item label="First Name" name="first name">
            <Input type="text" value={firstName} placeholder="Your first name" onChange={onFirstnameChange} />
          </Form.Item>
          <Form.Item label="Last Name" name="last name">
            <Input type="text" value={lastName} placeholder="Your last name" onChange={onLastnameChange} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" value={email} placeholder="Your email" onChange={onEmailChange} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password type="password" value={password} placeholder="Choose Password" onChange={onPasswordChange} />
          </Form.Item>
          <Form.Item label="Confirm">
            <Input.Password type="password" value={confirmPassword} placeholder="Confirm Password" onChange={onConfirmPasswordChange} />
          </Form.Item>
          <Form.Item label="Role">
            <Select placeholder="Are you a CEO or Employee" onChange={(key) => setRole(key)}>
              <Option key="1">Register as CEO</Option>
              <Option key="0">Register as Employee</Option>
            </Select>
          </Form.Item>
          {role === "0" ? (
            <>
              <Form.Item label="Company" name="company">
                <Select placeholder="Choose your company" onChange={handleCompany}>
                  {companies.map(comp => <Option key={comp._id}>{comp.name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Position" name="position">
                <Input type="text" value={position} placeholder="eg. Business analyst" onChange={onPositionChange} />
              </Form.Item>
            </>
          ) : null}
          <Button style={{ margin: "5px" }} type="primary" onClick={isSubmiting} disabled={submit} loading={submit}>
            Submit
          </Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
          <p>
            Already have an account, Log in{" "}
            <Link style={{ color: "#ff889c" }} to="/login">
              here
            </Link>
          </p>
        </Form>
      </div>
        : <>{role === "1" ? history.push("/register/company") : history.push("/home")}</>}
    </div>
  );
};

export default RegisterUser;
