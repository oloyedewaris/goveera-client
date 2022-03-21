import React, { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import './Login.less';

const LoginUser = () => {
  const [form, setForm] = useState({
    email: { error: null, body: '' },
    password: { error: null, body: '' }
  });
  const { email, password } = form
  const [msg, setMsg] = useState(null);
  const [submiting, setSubmiting] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/home")
    }
  }, [auth, history]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      setMsg(error.msg);
      setSubmiting(false);
    }
    return () => setSubmiting(false)
  }, [error]);

  const onFormSubmit = e => {
    e && e.preventDefault();
    setMsg(null)
    setSubmiting(true)
    if (!email.body || !password.body) {
      if (!email.body) setForm(form => ({ ...form, email: { error: 'email is required', body: '' } }))
      if (!password.body) setForm(form => ({ ...form, password: { error: 'password is required', body: '' } }))
      return setSubmiting(false);
    }
    const newUser = {
      email: email.body,
      password: password.body
    };
    dispatch(login(newUser));
  };

  return (
    <div className="container">
      <Form className="form" onKeyPress={e => e.key === 'Enter' && onFormSubmit(e)} >
        <h2>Login here</h2>
        {msg && <Alert className="alert" message={msg} type="error" showIcon closable />}
        <Form.Item label="Email" name="email">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{email.error}</span>
          <Input type="email" style={email.error && ({ border: '1px solid red' })}
            value={email.body} placeholder="Your Email"
            onChange={(e) => setForm({ ...form, email: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{password.error}</span>
          <Input.Password type="password" style={password.error && ({ border: '1px solid red' })}
            value={password.body} placeholder="Password"
            onChange={(e) => setForm({ ...form, password: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Button type="primary" onClick={onFormSubmit} disabled={submiting} loading={submiting} danger={msg}>
          Submit
        </Button>
        <p>
          Don't have an account, Register{" "}
          <Link style={{ color: "#ff889c" }} to="/register">
            here
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginUser;
