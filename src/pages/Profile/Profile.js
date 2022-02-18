import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Button, Modal, Dropdown, Menu } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import { UserOutlined, EditOutlined, LinkOutlined, SettingOutlined } from '@ant-design/icons';
import ProfileFeeds from "./ProfileFeeds";
import Spinner from "../../components/Spinner/Spinner";
import Upload from "./UploadImage";
import './Profile.less';
import { tokenConfig } from '../../redux/actions/authActions'

const { Meta } = Card;
const Profile = () => {
  const userId = useParams().id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://goveera-server.herokuapp.com/api/users/${userId}`, tokenConfig())
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        alert("Can't get user's profile")
      })
  }, [userId]);


  return (
    <div>
      <Modal title="Upload Profile Image" visible={toggle} onCancel={() => setToggle(false)}>
        <Upload onClose={() => setToggle(false)} />
      </Modal>
      {!loading && !user && <h2>User not found</h2>}
      {!user && loading &&
        <div className="loader">
          <Spinner size="large" />
        </div>}
      {user && !loading &&
        <div>
          <Card className="left_card feeds_dropdown_bg">
            <Dropdown.Button className="feeds_dropdown" overlay={
              <Menu>
                <Menu.Item key="1" icon={<LinkOutlined />} onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  Copy profile link
                </Menu.Item>
                {user._id === auth.user._id && <Menu.Item key="2" icon={<SettingOutlined />}>
                  <Link to={"/settings"}>
                    Profile settings
                  </Link>
                </Menu.Item>}
              </Menu>
            } trigger={["click"]} />
            <p style={{ paddingLeft: '15px' }}><Avatar icon={!user.image && <UserOutlined />} className="center-avatar" size={80} src={user.image} /></p>
            <Meta title={`${user.firstName} ${user.lastName}`} description={user.email} />
            <div style={{ marginTop: '25px', marginBottom: '0' }}>
              {user.bio ? <p style={{ marginTop: '5px' }}>Bio: {user.bio}</p> : null}
              <p style={{ marginTop: '5px', marginBottom: 0 }}>Company: {user.company.name}</p>
              <p style={{ marginTop: '5px', marginBottom: 0 }}>Position: {user.position}</p>
              <p style={{ marginTop: '5px', marginBottom: 0 }}>Joined on: {user.registeredAt}</p>
            </div>
            {user._id === auth.user._id &&
              <div>
                <Button type='dashed' style={{ marginRight: '5px' }}><Link to="/settings"><EditOutlined /> Edit Profile</Link></Button>
                <Button style={{ marginLeft: '5px' }} className="profile_pic" onClick={() => setToggle(true)} >Profile picture</Button>
              </div>
            }
          </Card>
          <Card type="inner" extra={<Button><Link to="/discover">Discover More</Link></Button>}>
            {user._id === auth.user._id && <Button style={{ margin: '0 5px' }}><Link to='/saved_items'>Saved Items</Link></Button>}
          </Card>
          <ProfileFeeds user={user} />
        </div>}
    </div>
  );
};

export default Profile;
