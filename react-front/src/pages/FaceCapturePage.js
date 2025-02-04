// src/components/FaceCapturePage.js
import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
// import '../assets/css/CustomStyles.css';

const FaceCapturePage = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {}; // Retrieve data from EnrollmentPage

  useEffect(() => {
    if (!formData) {
      navigate('/enroll'); // Redirect if form data is missing
    }

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError('Error accessing webcam');
      }
    };

    startVideo();
  }, [formData, navigate]);

  const captureFace = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imgUrl = canvas.toDataURL('image/png');
    setCapturedImage(imgUrl);

    // Send formData and capturedImage to backend
    fetch('http://127.0.0.1:5000/save-face', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, image: imgUrl }),
    })
      .then((response) => response.json())
      .then(() => navigate('/login')) // Navigate to Login page on success
      .catch(() => setError('Failed to save face capture'));
  };

  return (
    <Container className="face-capture-page mt-5 text-center">
      <h2>Face Capture</h2>
      <p>Position your face in front of the camera and click Capture</p>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="video-container">
        <video ref={videoRef} autoPlay muted width="500" height="400" />
      </div>
      <Button variant="primary" className="mt-3" onClick={captureFace}>
        Capture Face
      </Button>
      {capturedImage && (
        <div className="mt-3">
          <h4>Captured Image</h4>
          <img src={capturedImage} alt="Captured Face" width="200" />
        </div>
      )}
    </Container>
  );
};

export default FaceCapturePage;
