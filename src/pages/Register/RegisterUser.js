import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Alert } from "antd";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { BACKEND_URL } from '../../util/constants'
import toastInstance from "../../util/toastInstance";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
const { Option } = Select;

const RegisterUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formHook] = Form.useForm();

  const [form, setForm] = useState({
    firstName: { error: null, body: '' },
    lastName: { error: null, body: '' },
    email: { error: null, body: '' },
    password: { error: null, body: '' },
    confirmPassword: { error: null, body: '' },
    position: { error: null, body: '' },
    role: { error: null, body: '' },
    company: { error: null, body: '' },
  })
  const [msg, setMsg] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [companies, setCompanies] = useState([]);

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const { role, company, position, firstName, lastName, email, password, confirmPassword } = form

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/company/get_all_companies`)
      .then(res => setCompanies(res.data))
      .catch(err => toastInstance("Can't get companies", true))
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (role.body === "1") {
        history.push("/register/company")
      } else {
        history.push("/home")
      }
    }
  }, [auth, history, role.body]);

  useEffect(() => {
    if (error.id === "REGISTER_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    }
    return () => {
      setSubmit(false)
    }
  }, [error]);

  const handleCompany = (key) => {
    const company = companies.find(comp => comp._id === key)
    setForm({ ...form, company: { error: null, body: company._id } })
  }

  const onFormSubmit = (e) => {
    setSubmit(true);
    setMsg(null)
    e.preventDefault();
    if (!role.body || !firstName.body || !lastName.body || !email.body || !password.body || password.body !== confirmPassword.body) {
      if (!role.body) setForm(form => ({ ...form, role: { error: 'role is required', body: '' } }))
      if (!firstName.body) setForm(form => ({ ...form, firstName: { error: 'first name is required', body: '' } }))
      if (!lastName.body) setForm(form => ({ ...form, lastName: { error: 'last name is required', body: '' } }))
      if (!email.body) setForm(form => ({ ...form, email: { error: 'email is required', body: '' } }))
      if (!password.body) setForm(form => ({ ...form, password: { error: 'password is required', body: '' } }))
      if (!confirmPassword.body) setForm(form => ({ ...form, confirmPassword: { error: 'confirm your password', body: '' } }))
      if (!role.body) setForm(form => ({ ...form, role: { error: 'role is required', body: '' } }))
      if (password.body !== confirmPassword.body) setForm(form => ({ ...form, confirmPassword: { error: 'password does not match', body: '' } }))
      return setSubmit(false);
    }
    if (role.body === "0" && (!company.body || !position.body)) {
      if (!company.body) setForm(form => ({ ...form, company: { error: 'company is required', body: '' } }))
      if (!position.body) setForm(form => ({ ...form, position: { error: 'position is requires', body: '' } }))
      return setSubmit(false)
    }
    const newUser = {
      role: role.body,
      firstName: firstName.body,
      lastName: lastName.body,
      email: email.body,
      password: password.body
    };
    if (role.body === '0' && company.body) newUser.company = company.body
    if (role.body === '0' && position.body) newUser.position = position.body
    dispatch(register(newUser));
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return (
    <div className="container">
      <Form {...layout} className="form" form={formHook}>
        <h2>Create a Free Account</h2>
        <Form.Item label="First Name" name="first name">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{firstName.error}</span>
          <Input type="text" style={firstName.error && ({ border: '1px solid red' })}
            value={firstName.body} placeholder="Your first name"
            onChange={(e) => setForm({ ...form, firstName: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Last Name" name="last name">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{lastName.error}</span>
          <Input type="text" style={lastName.error && ({ border: '1px solid red' })}
            value={lastName.body} placeholder="Your last name"
            onChange={(e) => setForm({ ...form, lastName: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{email.error}</span>
          <Input type="email" style={email.error && ({ border: '1px solid red' })}
            value={email.body} placeholder="Your email"
            onChange={(e) => setForm({ ...form, email: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{password.error}</span>
          <Input.Password type="password" style={password.error && ({ border: '1px solid red' })}
            value={password.body} placeholder="Choose Password"
            onChange={(e) => setForm({ ...form, password: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Confirm" name='confirm password'>
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{confirmPassword.error}</span>
          <Input.Password type="password" style={confirmPassword.error && ({ border: '1px solid red' })}
            value={confirmPassword.body} placeholder="Confirm Password"
            onChange={(e) => setForm({ ...form, confirmPassword: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Role" name='role'>
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{role.error}</span>
          <Select style={role.error && ({ border: '1px solid red' })} placeholder="Are you a CEO or Employee"
            onChange={(key) => setForm({ ...form, role: { error: null, body: key } })}>
            <Option key="1">Register as CEO</Option>
            <Option key="0">Register as Employee</Option>
          </Select>
        </Form.Item>
        {role.body === "0" && (
          <>
            <Form.Item label="Company" name="company">
              <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{company.error}</span>
              <Select style={company.error && ({ border: '1px solid red' })} placeholder="Choose your company" onChange={handleCompany}>
                {companies.map(comp => <Option key={comp._id}>{comp.name}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Position" name="position">
              <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{position.error}</span>
              <Input type="text" style={position.error && ({ border: '1px solid red' })}
                value={position.body} placeholder="eg. Business analyst"
                onChange={(e) => setForm({ ...form, position: { error: null, body: e.target.value } })} />
            </Form.Item>
          </>
        )}
        {msg && <Alert className="alert" message={msg} type="error" showIcon closable />}
        <Button style={{ margin: "5px" }} type="primary" onClick={onFormSubmit} disabled={submit} loading={submit}>
          Submit
        </Button>
        <Button onClick={() => formHook.resetFields()}>Reset</Button>
        <p>
          Already have an account, Log in{" "}
          <Link style={{ color: "#ff889c" }} to="/login">
            here
          </Link>
        </p>
      </Form>
      <ToastComponent />
    </div>
  );
};

export default RegisterUser;
