import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { LOGIN_EMAIL, signIn } from "../auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(LOGIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!signIn(email, password)) {
      setError("Invalid email or password");
      return;
    }

    onLogin();
  };

  return (
    <main className="k-login-page">
      <section className="k-login-panel" aria-label="Dashboard sign in">
        <img className="k-login-logo" src="logo.png" alt="Zerodha" />
        <h1>Sign in to dashboard</h1>

        <form className="k-login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email</label>
          <div className="k-login-field">
            <PersonOutlineIcon />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <label htmlFor="login-password">Password</label>
          <div className="k-login-field">
            <LockOutlinedIcon />
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Enter password"
            />
            <VisibilityOffOutlinedIcon />
          </div>

          {error && <p className="k-login-error">{error}</p>}

          <button type="submit" className="k-login-submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
