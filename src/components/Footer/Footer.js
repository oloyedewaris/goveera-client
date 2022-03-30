import React from "react";
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import './footer.less';

const iconStyle = {
  fontSize: 25,
  margin: 5
}

function Footer() {
  return (
    <div className="footer">
      <Row >
        <Col xs={24} sm={24} lg={9} className='left_menu'>
          <div style={{ flexDirection: 'row' }}>
            <img className='footer_logo' src={logo} alt='logo' /> <h2 style={{ marginLeft: 10 }} >Goveera</h2>
          </div>
          <div style={{ flexDirection: 'row', marginTop: 15 }}>
            <a href='https://facebook.com/waris_oloyede.5'><FacebookOutlined style={iconStyle} /></a>
            <a href='https://instagram.com/waris_oloyede'><InstagramOutlined style={iconStyle} /></a>
            <a href='https://twitter.com/waris_oloyede'><TwitterOutlined style={iconStyle} /></a>
            <a href='https://youtube.com/oloyedewaris'> <YoutubeOutlined style={iconStyle} /></a>
          </div>
          <div style={{ marginTop: 30 }}>
            <p>oloyedewaris@@gmail.com</p>
            <p>+234 810 8745 769</p>
            <p>Isawo road, Ikorodu, Lagos, Nigeria</p>
          </div>
        </Col>
        <Col xs={24} sm={24} lg={15} className='right_menu' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div>
            <h3>Features</h3>
            <p>Community Interaction</p>
            <p>Project Handling</p>
            <p>Easy to use</p>
          </div>
          <div>
            <h3>Company</h3>
            <Link to='/about_app'>FAQ</Link>
            <Link to='/about_app'>About</Link>
            <Link to='/about_app'>Blog</Link>
          </div>
        </Col>
      </Row>
      <p style={{ marginTop: 20 }}>
        Developed and designed by{" "}
        <a target="_blank" rel="noopener noreferrer" style={{ color: "#80bdff" }}
          href="https://waris-portfolio.herokuapp.com">
          Waris
        </a>
        . Copyright © {new Date().getFullYear()}
      </p>
    </ div>
  );
}

export default Footer;
