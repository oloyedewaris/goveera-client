import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenConfig } from '../../redux/actions/authActions'

const Search = () => {
  const history = useHistory()
  const auth = useSelector(state => state.auth)
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
    axios.get(`/api/users/search?text=${data}`, tokenConfig())
      .then(res => {
        const users = res.data.map(user => ({ value: `${user.firstName} ${user.lastName}` }))
        setUsers(res.data)
        setOptions(users)
      })
      .catch(e => alert("Can't search user"))
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
    </div>
  );
};
export default Search;