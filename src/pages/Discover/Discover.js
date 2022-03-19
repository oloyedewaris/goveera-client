import React, { useEffect, useState } from "react";
import { Card, Avatar, Skeleton, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons"
import axiosInstance from "../../util/axiosInstance";
import { Link } from "react-router-dom"
import truncString from "../../util/truncString";

const Discover = () => {
  const { Meta } = Card;
  const [users, setUsers] = useState([])
  const [limit, setLimit] = useState(8);
  const [count, setCount] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false)

  useEffect(() => {
    setUsersLoading(true)
    getUsers(limit);
  }, [limit]);

  const getUsers = (limit) => {
    axiosInstance.get(`/api/users?limit=${limit}`)
      .then(res => {
        setUsers(res.data.users)
        setCount(res.data.count)
        setUsersLoading(false)
      })
      .catch(err => {
        alert("Can't get users")
        setUsersLoading(false)
      });
  }

  const onLoadMore = () => {
    getUsers(limit + 8);
    setLimit(limit + 8);
  }

  return (
    <div className="large_user_card">
      <h3 style={{ textAlign: "center" }}>Discover users</h3>
      {usersLoading ? (
        <Skeleton avatar paragraph={{ row: 7 }} active />
      ) : (
        <div>
          {users.length > 0 ? (
            <Row gutter={[16, 16]} justify='center' align='middle'>
              {users.map((user, i) => (
                <Col key={i} xs={12} sm={8} md={12} lg={8}>
                  <Link to={`/profile/${user._id}`}>
                    <Card className="center_card_discover" hoverable>
                      <p><Avatar icon={!user.image && <UserOutlined />} className="center-avatar" size={70} src={user.image} /></p>
                      <Meta title={truncString(`${user.firstName} ${user.lastName}`, 12)} description={truncString(user.email, 12)} />
                      <p style={{ marginTop: '5px auto' }}>{truncString(user.position, 15)}</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <h4 style={{ textAlign: "center" }}>No User yet</h4>
          )}
        </div>
      )}
      {users.length > 0 && Number(count) > users.length && <Button className="load_more" onClick={onLoadMore}>Load More</Button>}
    </div>
  );
};

export default Discover;
