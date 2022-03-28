import React from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import Image from "../../assets/Ipimage.jpg";
import Image1 from "../../assets/lpimage1.jpg";
import Image2 from "../../assets/lpimage2.jpg";
import Image3 from "../../assets/lpimage3.jpg";
import './LandingPage.less'

const LandingPage = () => {
  return (
    <div className="main_con">
      <Row className='row_con' gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={16}>
          <div className='center_container'>
            <h2>Governance problems in organizations</h2>
            <p className='paragraphs'>
              It's no doubt that Greater use of information and
              communications technology can increase
              business transparency. This, in turn, may invite employee's
              participation, foster e-governance, and facilitate efficient business systems.
            </p>
            <Button size='large' style={{ color: '#ff889c' }} className='my_button'>
              <Link to='/register'>Create a free account now</Link>
            </Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={8}>
          <div className='center_container'>
            <img src={Image1} alt='project management' className='landing_image' />
          </div>
        </Col>
      </Row>
      <Row style={{ backgroundColor: '#ff889c' }} className='row_con' gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={8}>
          <div className='center_container'>
            <img style={{ height: '230px' }} src={Image} alt='analysis' className='landing_image' />
          </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={16}>
          <div className='center_container'>
            <h3>Management made easy</h3>
            <p className='paragraphs'>
              Many managers are challenged by the need to perform a balancing act between the
              pursuit of greater openness and better efficiency within private and public sectors.
              Here at Goveera, we conclude that there is a need to develop theories, models, and
              facilities to assist managers/CEOs in addressing this balancing challenge
            </p>
            <Button className='my_button' type='link'>
              <Link to='/about_app'>Learn more about the workflow</Link>
            </Button>
          </div>
        </Col>
      </Row>
      <Row className='row_con'>
        <Col xs={24} sm={24} md={20} lg={12}>
          <div className='center_container'>
            <img src={Image3} alt='functions' className='landing_image middle_image' />
          </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={12}>
          <div className='landing_list_con' >
            <div className='landing_list_subcon'>
              <div className='landing_list_dot' />
              <div className='landing_list_item'>Communicate and make announcements without stress</div>
            </div>
            <div className='landing_list_subcon'>
              <div className='landing_list_dot' />
              <div className='landing_list_item'>Record projects to get feedbacks and opinions</div>
            </div>
            <div className='landing_list_subcon'>
              <div className='landing_list_dot' />
              <div className='landing_list_item'>Conduct polls for quick survey</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className='row_con' gutter={[16, 16]}>
        <Col xs={24} sm={24} md={20} lg={16}>
          <div>
            <h2 className='paragraphs'>Goveera leads to a transformation in work processes</h2>
            <Button size='large' className='my_button' type='primary'><Link to='/register'>Get your account now</Link></Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={8}>
          <div className='center_container'>
            <img src={Image2} alt='process' className='landing_image' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
