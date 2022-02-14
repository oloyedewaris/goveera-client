import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons'

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const { Meta } = Card;

  return (
    <div style={{ margin: "0 10px" }}>
      {user ? (
        <Card className="center_card" hoverable>
          <p><Avatar icon={!user.image && <UserOutlined />} className="center-avatar" size={80} src={user.image} /></p>
          <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
        </Card>
      ) : null}
      <Card style={{ marginTop: 10 }} className="center_card" title="Profile" size="default">
        <p>Name: {`${user.firstName} ${user.lastName}`}</p>
        <p>Position: {user.position}</p>
        <p>Company: {user.company.name}</p>
      </Card>
    </div>
  );
};

export default Profile;
