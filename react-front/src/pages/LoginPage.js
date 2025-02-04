import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function LoginPage() {
  const [useWebcam, setUseWebcam] = useState(false); // Toggles webcam view
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here (e.g., call API endpoint)
    // On success, navigate to the dashboard
    navigate('/');
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('Captured Image:', imageSrc);
    // You can add webcam-based login authentication logic here
  };

  return (
    <>
      <Helmet>
        <title>Login | LearnXa</title>
      </Helmet>

      <div className="form-wrapper">
        <div className="container">
          <div className="form-header mx-auto d-flex justify-content-between align-items-center mb-3">
            <a className="navbar-brand" href="/">Learn<span style={{ color: '#007bff' }}>X</span>a</a>
            <h5>LOGIN</h5>
          </div>
          <div className="learnxa-login-container box-shadow p-4">
            <div className="row">
              {/* Left side: Webcam or Image */}
              <div className="col-lg-6 col-md-6">
                <div className="learnxa-login-side text-center">
                  {useWebcam ? (
                    <>
                      {/* Display webcam when 'useWebcam' is true */}
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        className="img-fluid"
                      />
                      <button onClick={captureImage} className="btn btn-primary mt-3">
                        Capture Image for Login
                      </button>
                    </>
                  ) : (
                    <img src="/assets/img/login.jpg" alt="LearnXa" className="img-fluid" width={200}/>
                  )}
                  <h5 className="mt-3">LearnXa</h5>
                  <p>Log in to your Portal Account to access the LearnXa e-Learning Platform</p>
                  <button
                    onClick={() => setUseWebcam(!useWebcam)}
                    className="btn btn-outline-secondary mt-2"
                  >
                    {useWebcam ? 'Use Credentials to Login' : 'Use Webcam to Login'}
                  </button>
                </div>
              </div>

              {/* Right side: Login Form */}
              <div className="col-lg-6 col-md-6">
                {/* Only show the form when 'useWebcam' is false */}
                {!useWebcam && (
                  <form onSubmit={handleLogin} className="login-form text-left row g-3">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <span
                          className="input-group-text"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="material-icons">
                            {passwordVisible ? 'visibility_off' : 'visibility'}
                          </i>
                        </span>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3 w-100">Login</button>
                    <div>
                      Don't have an account yet? <a href="/register" style={{ color: '#007bff' }}>Register</a>
                    </div>
                    <div>
                      Forgot Password? <a href="/forgot-password" style={{ color: '#007bff' }}>Reset</a>
                    </div>
                  </form>
                )}
                {/* Display 'Use Credentials to Login' button when webcam is active */}
                {useWebcam && (
                  <button
                    onClick={() => setUseWebcam(false)} // Hide webcam and show credentials form
                    className="btn btn-outline-secondary mt-3"
                  >
                    Use Credentials to Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
