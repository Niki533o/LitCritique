import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"; 
import Button from '../components/buttons/Button';
import 'react-toastify/dist/ReactToastify.css';
import "./Landing.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passError, setPassError] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setPassError("");
        setEmailError("");

        // Email validation 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please provide a valid email.");
            return;
        }

        // Password validation (minimum length of 6 characters)
        if (password.length < 6) {
            setPassError("Password should be at least 6 characters.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            console.log("Account created successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Error during signup:", error.message); 
        }
    };

    return (
        <div className="landing-container">
          <Row className="landing-row">
                <Col md={6} className="left-glass-card">
              <div className="text-container">
                <h2>Create an account</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                  {emailError && <div className="error-message">{emailError}</div>}
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                  />
                  {passError && <div className="error-message">{passError}</div>}
                  <Button
                    onClickHandler={handleSignup}
                    labelText={"Sign Up"}
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

export default Signup;