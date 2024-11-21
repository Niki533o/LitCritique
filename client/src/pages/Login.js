import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';  
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"; 
import Button from '../components/buttons/Button';
import 'react-toastify/dist/ReactToastify.css';
import "./Landing.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in");
             navigate('/home'); 

        } catch (error) {
            console.error("Error signing in:", error);
            setError("Incorrect email or password. Please try again.");
        }
    };

    return (
      <div className="landing-container">
        <Row className="landing-row">
            <Col md={6} className="left-glass-card">
            <div className="text-container">
              <h2>Welcome Back!</h2>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                {error && <div className="error-message">{error}</div>}
                <Button
                  onClickHandler={handleLogin}
                  labelText={"Log in"}
                  color={"gradient"}
                  size={"large-login"}
                />
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

export default Login;