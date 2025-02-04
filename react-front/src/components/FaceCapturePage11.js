import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as faceapi from 'face-api.js';

const FaceCapturePage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null); // State to hold the captured face image URL

  // Initialize face-api.js models
  const loadModels = async () => {
    const MODEL_URL = '/models'; // Path where the models will be served
    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setLoading(false);
    } catch (err) {
      setError('Failed to load face-api models');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    // Start video feed from webcam
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      } catch (err) {
        setError('Error accessing webcam');
      }
    };

    startVideo();
  }, [loading, error]);

  // Detect faces from the video feed and draw landmarks
  const detectFaces = async () => {
    if (videoRef.current && canvasRef.current) {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.SsdMobilenetv1Options()
      ).withFaceLandmarks().withFaceDescriptors();

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.matchDimensions(canvas, videoRef.current);
      const resizedDetections = faceapi.resizeResults(detections, videoRef.current);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }
  };

  // Capture face image when button is clicked
  const captureFace = async () => {
    if (videoRef.current && canvasRef.current) {
      // Draw the current video frame onto the canvas
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert the canvas image to a data URL and set it as capturedImage
      const imgUrl = canvas.toDataURL('image/png');
      setCapturedImage(imgUrl);

      // Send image data to backend
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imgUrl }), // Send as JSON
        });

        const data = await response.json();
        if (data.status === 'success') {
          alert('Image uploaded successfully');
        } else {
          setError('Failed to upload image');
        }
      } catch (error) {
        setError('Error uploading image');
      }
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Capture your Face</h1>
      <p>Here you will scan your face for attendance.</p>
      {loading && <Alert variant="info">Loading face recognition models...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="position-relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="520"
          height="360"
          style={{ transform: 'scaleX(-1)' }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </div>
      <Button variant="primary" className="mt-3" onClick={() => { detectFaces(); captureFace(); }}>
        Capture Face
      </Button>
      <div className="mt-3">
        <Link to="/">
          <Button variant="secondary">
            Back to Home
          </Button>
        </Link>
      </div>
      {capturedImage && (
        <div className="mt-3">
          <h4>Captured Face</h4>
          <Image src={capturedImage} fluid />
        </div>
      )}
    </Container>
  );
};

export default FaceCapturePage;
