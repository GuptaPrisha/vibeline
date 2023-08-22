import "./Login.scss";

import { useState } from "react";
import logo from "../../assets/logo.svg";

export default function Login(props) {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("Hello@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="LoginComponent Route">
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="main">
          <div className="input">
            <i className="fi fi-rr-at"></i>
            <input
              autoFocus
              type="text"
              value={username}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  document.getElementById("login-button")?.click();
              }}
              placeholder="Username"
              autoComplete="bingsights-email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="divider"></div>
          <div className="input">
            <i className="fi fi-rr-key"></i>
            <input
              type="password"
              value={password}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  document.getElementById("login-button")?.click();
              }}
              placeholder="Password"
              autoComplete="vibeline-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="sub">
            <div className="error">{error}</div>
            <div className="forgot">SignUp</div>
          </div>
          <div
            id="login-button"
            className="button"
            onClick={() => {
              fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              }).then(async (res) => {
                const body = await res.json();
                if (res.status !== 200) {
                  setError(body.message);
                } else {
                  setError("");
                  props.setUserID(body.user._id);

                  localStorage.setItem("token", body.token);
                  localStorage.setItem("userID", body.user._id);
                }
              });
            }}
          ></div>
        </div>
        <div className="divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>
        <div className="alternatives">
          <div
            className="alternative"
            onClick={() => {
              console.log("Logging with gOOgle");
            }}
          >
            {/* <img src={GoogleLogo} alt="Logo" /> */}
            <span>Continue with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}
