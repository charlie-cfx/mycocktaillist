/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PasswordReset.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

import Alert from "../Alert/Alert";

export default function PasswordReset({
  setIsPasswordResetModalOpen,
  setIsLoginModalOpen,
}) {
  const { userToken } = useContext(AuthContext);

  const [alertMessage, setAlertMessage] = useState("");

  const [email, setEmail] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const style = getComputedStyle(document.body);
    const primary600 = style.getPropertyValue("--grey-900");
    const grey50 = style.getPropertyValue("--primary-100");

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    dataFromForm.primary600 = primary600;
    dataFromForm.grey50 = grey50;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/password-reset`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(() => {
        setAlertMessage({
          type: "success",
          message: "L'email a bien été envoyé",
          icon: "envelope-open-text",
        });
        setEmail("");
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      })
      .catch((error) => {
        setAlertMessage({
          type: "error",
          message: "Impossible d'envoyer l'email à cette adresse",
          icon: "envelope-ban",
        });
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        console.error(error.message);
      });
  };

  return (
    <div id="password-reset">
      <div
        className="filter"
        onClick={() => setIsPasswordResetModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <form className="password-reset-form" onSubmit={handleFormSubmit}>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="email">Adresse email</label>
              <div className="input">
                <i className="fi fi-rr-envelope" />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre adresse email"
                  id="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAlertMessage("");
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="button-md-primary-link forgotten-password"
            type="button"
            onClick={() => {
              setIsPasswordResetModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          >
            Déjà un compte ? Me connecter
          </button>
          <button type="submit" className="button-lg-black-solid">
            Envoyer
          </button>
        </form>
        {alertMessage && (
          <Alert
            type={alertMessage.type}
            text={alertMessage.message}
            icon={alertMessage.icon}
          />
        )}
      </div>
    </div>
  );
}
