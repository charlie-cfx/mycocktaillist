import { sanitize } from "isomorphic-dompurify";
import { useState, useContext } from "react";
import "./Connection.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

import Alert from "../Alert/Alert";

export default function Connection({
  setIsLoginModalOpen,
  setIsPasswordResetModalOpen,
}) {
  const { setUser, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);
  const [failedConnectionInfos, setFailedConnectionInfos] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, dataFromForm)
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(response.data.user);
          setIsLoginModalOpen(false);
          navigate("/my-cocktails");
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setFailedConnectionInfos({
            message:
              "The credentials you have entered appear to be incorrect. Please try again.",
            icon: "diamond-exclamation",
          });
        } else if (error.response.status === 403) {
          setFailedConnectionInfos({
            message: "You do not have the necessary rights to connect.",
            icon: "lock",
          });
        } else if (error.response.status === 500) {
          setFailedConnectionInfos({
            message: "An error has occurred. Please try again.",
            icon: "cross-circle",
          });
        } else {
          console.error(error);
        }
        setHasConnectionFailed(true);
      });
  };

  // handler for change in input mail
  const handleEmailChange = (event) => {
    setEmail(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  // handler for change in password input
  const handlePasswordChange = (event) => {
    setPassword(sanitize(event.target.value));
    setHasConnectionFailed(false);
  };

  return (
    <div id="sign-in">
      <div
        className="filter"
        onClick={() => setIsLoginModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <form className="sign-in-form" onSubmit={handleFormSubmit}>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <div className="input">
                <i className="fi fi-rr-envelope" />
                <input
                  type="email"
                  name="email"
                  placeholder="pierre.dupont@your-mail.com"
                  id="email"
                  value={email}
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <div className="input">
                <i className="fi fi-rr-lock" />
                <input
                  type="password"
                  name="password"
                  placeholder="•••••••••••"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>
          <button
            className="button-md-black-link forgotten-password"
            onClick={() => {
              setIsLoginModalOpen(false);
              setIsPasswordResetModalOpen(true);
            }}
            type="button"
          >
            Forgotten your password?
          </button>
          <button type="submit" className="button-lg-black-solid">
            Sign In
          </button>
        </form>
        {hasConnectionFailed && (
          <Alert
            type="error"
            text={failedConnectionInfos.message}
            icon={failedConnectionInfos.icon}
          />
        )}
      </div>
    </div>
  );
}
