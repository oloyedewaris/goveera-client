import React from "react";
import { Row, Col } from "antd";
import Search from '../components/Search/Search'
import Profile from "../pages/Profile/LSProfile";
import Colleagues from "../pages/Discover/RecentColleagues";

function Large(Component) {
  const LargeCheck = () => {
    return (
      <div className='body'>
        <Row className="large_comp_con">
          <Col md={6} lg={5}><Profile /></Col>
          <Col md={12} lg={14}><Component /></Col>
          <Col md={6} lg={5}><Colleagues /></Col>
        </Row>
        <div className="small_comp_con"><Search /><Component /></div>
      </div>
    );
  };
  return LargeCheck;
}

export default Large;
