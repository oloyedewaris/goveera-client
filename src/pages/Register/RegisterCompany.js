import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerCompany } from "../../redux/actions/authActions";

const RegisterCompany = () => {
  const [form, setForm] = useState({
    name: { error: null, body: '' },
    about: { error: null, body: '' },
    address: { error: null, body: '' },
  });
  const { address, name, about } = form
  const [msg, setMsg] = useState(null);
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.error);

  const history = useHistory();

  useEffect(() => {
    if (user && user.company) history.push('/home')
  }, [user, history]);

  useEffect(() => {
    if (error.id === "REGISTER_SUCCESS_FAILED") {
      setMsg(error.msg);
      setSubmit(false);
    }
  }, [error]);

  const onFormSubmit = (e) => {
    setSubmit(true);
    e.preventDefault();
    if (!address.body || !name.body || !about.body) {
      if (!name.body) setForm(form => ({ ...form, name: { error: 'name is required', body: '' } }))
      if (!address.body) setForm(form => ({ ...form, address: { error: 'address is required', body: '' } }))
      if (!about.body) setForm(form => ({ ...form, about: { error: 'about is required', body: '' } }))
      setSubmit(false);
    } else {
      const newCompany = {
        userId: auth.user._id,
        name: name.body,
        about: about.body,
        address: address.body
      };
      dispatch(registerCompany(newCompany));
    }
  };

  return (
    <div className="container">
      <Form className="form">
        <h2>Register Your Company</h2>
        {msg && <Alert className="alert" message={msg} type="error" showIcon closable />}
        <Form.Item label="Name" name="name">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{name.error}</span>
          <Input type="text" style={name.error && ({ border: '1px solid red' })}
            value={name.body} placeholder="Company's Name"
            onChange={(e) => setForm({ ...form, name: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{address.error}</span>
          <Input type="text" style={address.error && ({ border: '1px solid red' })}
            value={address.body} placeholder="Company's Address"
            onChange={(e) => setForm({ ...form, address: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Form.Item label="About Company" name='about company'>
          <span style={{ fontSize: 12, color: 'red', marginBottom: 0 }}>{about.error}</span>
          <Input type="text" style={about.error && ({ border: '1px solid red' })}
            value={about.body} placeholder="About Company"
            onChange={(e) => setForm({ ...form, about: { error: null, body: e.target.value } })} />
        </Form.Item>
        <Button style={{ margin: "5px" }} type="primary" onClick={onFormSubmit} disabled={submit} loading={submit} >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterCompany;
