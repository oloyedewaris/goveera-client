import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import axiosInstance from '../../util/axiosInstance';
import { useHistory } from "react-router-dom";
import toastInstance from '../../util/toastInstance';
import ToastComponent from '../ToastComponent/ToastComponent';

const Search = () => {
  const history = useHistory()
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);

  const onSelect = (selected) => {
    const selectedUser = users.find(user => `${user.firstName} ${user.lastName}` === selected)
    history.push(`/profile/${selectedUser._id}`)
    setValue('');
    setOptions([]);
    setUsers([]);
  };

  const onSearch = (data) => {
    setValue(data);
    axiosInstance.get(`/api/users/search?text=${data}`)
      .then(res => {
        const users = res.data.map(user => ({ value: `${user.firstName} ${user.lastName}` }))
        setUsers(res.data)
        setOptions(users)
      })
      .catch(err => {
        toastInstance("Can't search user", true)
      })
  };

  return (
    <div className="search_con">
      <AutoComplete
        className="search_bar"
        value={value}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search size="large" placeholder="Search user..." />
      </AutoComplete>
      <ToastComponent />
    </div>
  );
};
export default Search;