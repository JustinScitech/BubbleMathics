import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth, useRedirectFunctions } from "@propelauth/react";
import "../App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { redirectToLoginPage } = useRedirectFunctions();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isMsgOpen, setMsgOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await redirectToLoginPage({ email });
      setMessage("Successfully logged in!");
      setMsgOpen(true);
      navigate("/lesson");
    } catch (error) {
      setMessage(`Login error: ${error.message}`);
      setMsgOpen(true);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login to ReadRight</h1>
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
      </div>
      <p>
        Don't have an account?{" "}
        <RouterLink to="/register" className="register-link">
          Sign up
        </RouterLink>
      </p>
      {isMsgOpen && (
        <div className="alert-dialog">
          <div className="alert-dialog-content">
            <div className="alert-dialog-header">ERROR</div>
            <div className="alert-dialog-body">{message}</div>
            <div className="alert-dialog-footer">
              <button onClick={() => setMsgOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
