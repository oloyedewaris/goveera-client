import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Skeleton, Dropdown, Menu, Button, Row, Col } from "antd";
import { UsergroupDeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import axios from "axios";
import { tokenConfig } from '../../redux/actions/authActions'

const MyColleagues = () => {
  const { Meta } = Card;
  const auth = useSelector((state) => state.auth);
  const [colleagues, setColleagues] = useState([])
  const [limit, setLimit] = useState(8);
  const [count, setCount] = useState(null);
  const [colleaguesLoading, setColleaguesLoading] = useState(false)

  const getColleagues = (limit) => {
    axios.get(`/api/users/colleagues?limit=${limit}`, tokenConfig())
      .then(res => {
        setColleagues(res.data.users)
        setCount(res.data.count)
        setColleaguesLoading(false)
      })
      .catch(err => {
        alert("Can't get colleagues")
        setColleaguesLoading(false)
      })
  }

  useEffect(() => {
    setColleaguesLoading(true)
    getColleagues(limit)
  }, [limit]);

  const handleRemove = (userId) => {
    axios.delete(`/api/users?userId=${userId}`, tokenConfig())
      .then(res => {
        if (res.data.deleted)
          getColleagues();
        alert("User removed")
      })
      .catch(err => alert("Can't remove user"));
  }

  const onLoadMore = () => {
    getColleagues(limit + 8);
    setLimit(limit + 8);
  }

  return (
    <div className="large_user_card">
      <h3 style={{ textAlign: "center" }}>Colleagues</h3>
      {colleaguesLoading ? (
        <Skeleton avatar paragraph={{ row: 7 }} active />
      ) : (
        <div style={{ margin: 10 }} >
          {colleagues.length > 0 ? (
            <Row gutter={[16, 16]} justify='center' align='stretch'>
              {colleagues.map((user, i) => {
                const introMessage = user.position
                const truncMessage = user.position.substring(0, 23).concat('...')
                return (
                  <Col key={i} xs={12} sm={8} md={12} lg={8}>
                    <Card className="center_card_discover feeds_dropdown_bg" hoverable>
                      <Dropdown.Button className="feeds_dropdown" overlay={
                        <Menu>
                          <Menu.Item key="1" icon={<EyeOutlined />}>
                            <Link to={`/profile/${user._id}`}>
                              View user
                            </Link>
                          </Menu.Item>
                          {auth.user.role === 1 &&
                            <Menu.Item key="3" style={{ color: "red" }}
                              onClick={() => handleRemove(user._id)}
                              icon={<UsergroupDeleteOutlined />}>
                              Remove from company
                            </Menu.Item>}
                        </Menu>
                      } trigger={["click"]} />
                      <p><Avatar icon={!user.image && <UserOutlined />} src={user.image} className="center-avatar" size={70} /></p>
                      <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
                      <p style={{ marginTop: '5px auto' }}>{
                        introMessage.length < 25 ? introMessage : truncMessage
                      }</p>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          ) : (
            <h4 style={{ textAlign: "center" }}>No User yet</h4>
          )}
        </div>
      )}
      {colleagues.length > 0 && Number(count) > colleagues.length && <Button className="load_more" onClick={onLoadMore}>Load More</Button>}
    </div>
  );
};

export default MyColleagues;
