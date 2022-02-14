import React, { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import './Login.less';

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [submiting, setSubmiting] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const history = useHistory();

  useEffect(() => {
    if (auth.isAuthenticated) {
      setRedirect(true);
    }
  }, [auth]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      setMsg(error.msg);
      setSubmiting(false);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onFormSubmit = e => {
    e && e.preventDefault();
    const newUser = { email, password };
    dispatch(login(newUser));
  };

  const isSubmiting = e => {
    setMsg(null);
    setSubmiting(true);
    onFormSubmit(e);
  };

  return (
    <div>
      {!redirect ? (
        <div className="container">
          <h2>Login here</h2>
          <Form className="form" onKeyPress={e => e.key === 'Enter' && isSubmiting()} >
            {msg && <Alert className="alert" message={msg} type="error" showIcon closable />}
            <Form.Item label="Email" name="email">
              <Input type="email" value={email} placeholder="Your Email" onChange={onEmailChange} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
            </Form.Item>
            <Button type="primary" onClick={isSubmiting} disabled={submiting} loading={submiting} danger={msg}>
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
      ) : <div>{history.push("/home")}</div>}
    </div>
  );
};

export default LoginUser;
