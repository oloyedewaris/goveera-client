import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Skeleton, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom"
import axios from "axios";
import { UsergroupDeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons"
import { tokenConfig } from '../../redux/actions/authActions'

const Colleagues = () => {
  const { Meta } = Card;
  const auth = useSelector((state) => state.auth);
  const [colleagues, setColleagues] = useState([])
  const [colleaguesLoading, setColleaguesLoading] = useState(false)

  const getColleagues = useCallback(() => {
    axios.get(`https://goveera-server.herokuapp.com/api/users/colleagues/limit`, tokenConfig())
      .then(res => {
        setColleagues(res.data)
        setColleaguesLoading(false)
      })
      .catch(err => {
        alert("Can't get colleagues")
        setColleaguesLoading(false)
      })
  }, [])

  useEffect(() => {
    setColleaguesLoading(true)
    getColleagues()
  }, [getColleagues]);

  const handleRemove = (userId) => {
    axios.delete(`https://goveera-server.herokuapp.com/api/users?userId=${userId}`, tokenConfig())
      .then(res => {
        if (res.data.deleted)
          getColleagues();
        alert("User removed")
      })
      .catch(err => alert("Can't remove user"));
  }

  return (
    <div style={{ margin: "0 10px" }}>
      <h3 style={{ textAlign: "center" }}>Recent Colleagues</h3>
      {colleaguesLoading ? (
        <Skeleton avatar paragraph={{ row: 3 }} active />
      ) : (
        <div style={{ margin: "10 0" }} >
          {colleagues.length > 0 ? (
            colleagues.map((user, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <Card className="center_card_discover feeds_dropdown_bg" hoverable>
                  <Dropdown.Button className="feeds_dropdown" overlay={
                    <Menu>
                      <Menu.Item key="2" icon={<EyeOutlined />}>
                        <Link to={`/profile/${user._id}`}>
                          User's profile
                        </Link>
                      </Menu.Item>
                      {auth.user.role === 1 &&
                        <Menu.Item style={{ color: "red" }} onClick={() => handleRemove(user._id)} key="1" icon={<UsergroupDeleteOutlined />}>
                          Remove from company
                        </Menu.Item>}
                    </Menu>
                  } trigger={["click"]} />
                  <p><Avatar icon={!user.image && <UserOutlined />} className="center-avatar" size={70} src={user.image} /></p>
                  <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
                </Card>
              </div>
            ))
          ) : (
            <h4 style={{ textAlign: "center" }}>No User yet</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Colleagues;
