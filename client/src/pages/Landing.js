import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/buttons/Button';
import 'react-toastify/dist/ReactToastify.css';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToLogin = () => {
    navigate('/login');
  };
    
  return (
    <div className="landing-container">
      <Row className="landing-row">
        <Col md={6} className="left-glass-card">
          <div className="text-container">
            <h1>Welcome to LitCritique!</h1>
            <body>Get started by signing up or logging in</body>
            <div className="button-container">
              <Button
                onClickHandler={goToSignup}
                labelText={"Sign Up"}
                color={"gradient"}
                size={"large-login"}
              />
              <Button
                onClickHandler={goToLogin}
                labelText={"Login"}
                color={"gradient"}
                size={"large-login"}
              />
            </div>
          </div>
        </Col>

        <Col md={6} className="right-glass-card">
        <div className="text-container">
        <h1>Welcome to LitCritique!</h1>
        </div>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;