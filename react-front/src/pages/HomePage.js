import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className="hero"
      style={{
        background: "url('./assets/img/ilarobg.webp') no-repeat center center/cover",
        minHeight: '100vh',
      }}
    >
      <div className="hero-content d-flex align-items-center" style={{ height: '100%' }}>
        <Container className="col-xxl-8 px-4">
          <Row className="flex-lg-row-reverse align-items-center g-5">
            <Col lg={5} sm={8} xs={10}>
              <img
                src="./assets/img/polyilarologo.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Ilaro Logo"
                width="700"
                height="500"
                loading="lazy"
              />
            </Col>
            <Col lg={7}>
              <h1 className="display-5 fwt-bold text-body-emphasis lh-1 mb-3 text-responsive">
                Face-Based Attendance System for Federal Polytechnic Ilaro
              </h1>
              <p className="lead text-responsive">
                Revolutionizing attendance tracking with advanced face recognition technology. Say goodbye to
                traditional methods, and welcome a seamless, automated way to manage your classroom or workplace
                attendance! 
                <p>A Project by <strong>ODEWAYE MAYOMI P(H/CTE/22/0674)</strong> in the <strong>DEPARTMENT OF COMPUTER ENGINEERING</strong></p>
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start" style={{ zIndex: 1030 }}>
                <Link to="/enroll">
                  <Button variant="primary" className="btn-lg px-4 me-md-2" style={{ borderRadius: 'none', cursor: 'pointer' }}>
                    Enroll Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-primary" className="btn-lg px-4" style={{ color: '#007bff' }}>
                    Login
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Blinking Camera Effect */}
      <div className="camera-circle"><div className="camera-indicator"></div></div>
    </div>
  );
};

export default HomePage;
