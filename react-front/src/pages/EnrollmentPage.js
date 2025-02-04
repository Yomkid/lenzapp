import React, { useState, useRef } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const EnrollmentPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    othername: '',
    email: '',
    phone: '',
    department: '',
    level: '',
    academicSection: '',
    image: null,
  });

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);

  // Ref for camera video and canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle next button click
  const nextStep = (e) => {
    e.preventDefault(); // Prevent form submission
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle back button click
  const prevStep = (e) => {
    e.preventDefault(); // Prevent form submission
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can submit the data to your server here
  };

  // Start camera
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    }
  };

  // Capture image from camera feed
  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageUrl = canvasRef.current.toDataURL('image/png');
    setFormData((prevData) => ({ ...prevData, image: imageUrl }));
  };

  return (
    <div className="form-wrapper">
      <div className="container">
        <div className="form-header mb-3 text-center mx-auto p-2">
          <h4 className="form-head-text text-light">Enrollment Form</h4>
          <p>To complete your registration, fill out the information below.</p>
        </div>
        <div className="learnxa-login-container box-shadow">
          <form onSubmit={handleSubmit}>
            <div className="pagination">
              <span className={`step ${currentStep === 1 ? 'active' : ''}`}>1</span>
              <span className={`step ${currentStep === 2 ? 'active' : ''}`}>2</span>
              <span className={`step ${currentStep === 3 ? 'active' : ''}`}>3</span>
              <span className={`step ${currentStep === 4 ? 'active' : ''}`}>4</span>
            </div>

            {currentStep === 1 && (
              <div className="step-content">
                <Row>
                  <Col md={6}>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Label>Othername</Form.Label>
                    <Form.Control
                      type="text"
                      name="othername"
                      value={formData.othername}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <Row>
                  <Col md={6}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      as="select"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Engineering">Engineering</option>
                    </Form.Control>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <Row>
                  <Col md={6}>
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      as="select"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="ND1">ND1</option>
                      <option value="HND1">HND1</option>
                      <option value="HND2">HND2</option>
                    </Form.Control>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Academic Section</Form.Label>
                    <Form.Control
                      as="select"
                      name="academicSection"
                      value={formData.academicSection}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Academic Section</option>
                      <option value="2023/2024">2023/2024</option>
                    </Form.Control>
                  </Col>
                </Row>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content">
                <Form.Label>Capture your image</Form.Label>
                <div>
                  <video ref={videoRef} width="50%" height="50%" autoPlay></video>
                  <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }}></canvas>
                </div>
                <Button onClick={startCamera}>Start Camera</Button>
                <Button onClick={captureImage}>Capture Image</Button>
                {formData.image && (
                  <div>
                    <img src={formData.image} alt="Captured" width="100" height="auto" />
                  </div>
                )}
              </div>
            )}

            <div className="form-navigation">
              <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1}>
                Back
              </Button>
              <Button variant="primary" onClick={currentStep === 4 ? handleSubmit : nextStep}>
                {currentStep === 4 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
