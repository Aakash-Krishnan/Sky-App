/* eslint-disable no-unused-vars */
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { useState } from "react";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Scss/LoginComponent.scss";
//for google signin button
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  // 3:23:51

  const login = () => {
    LoginAPI(credentails.email, credentails.password).then(
      (res) => {
        toast.success("Signed In to linkedIn");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      },
      (err) => toast.error("Please check your credentials")
    );
  };

  const googleSignIn = () => {
    GoogleSignInAPI().then(
      (res) => {
        toast.success("Signed In to linkedIn with google");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      },
      (err) => toast.error("Please check your credentials")
    );
  };

  return (
    <div className="login-wrapper">
      <img className="linkedinLogo" src={LinkedinLogo} alt="" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            className="common-input"
            type="email"
            placeholder="Enter your Email"
            onChange={(e) =>
              setCredentials({ ...credentails, email: e.target.value })
            }
          />
          <input
            className="common-input"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setCredentials({ ...credentails, password: e.target.value })
            }
          />
          <button onClick={login} className="login-btn">
            Sign in
          </button>
        </div>
        <hr className="hr-text" data-content="Or" />
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={googleSignIn} />
          <p className="go-to-signup">
            New to LinkedIn?{" "}
            <span className="join-now" onClick={() => navigate("/register")}>
              Join now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;