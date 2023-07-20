/* eslint-disable camelcase */
import { sanitize } from "isomorphic-dompurify";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./NewPassword.scss";

import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

import Alert from "../../components/Alert/Alert";

export default function Connection() {
  const { setUser, setUserInfos, userInfos, userToken } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [hasConnectionFailed, setHasConnectionFailed] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (hasConnectionFailed) {
      navigate("/");
      setHasConnectionFailed(false);
    }
  }, [hasConnectionFailed]);

  useEffect(() => {
    const email = sanitize(searchParams.get("email"));
    const tempPassword = sanitize(searchParams.get("temporary_code"));

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        email,
        password: tempPassword,
      })
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfos(response.data.user);
          setHasConnectionFailed(false);
        } else {
          setHasConnectionFailed(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setHasConnectionFailed(true);
      });
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    delete dataFromForm["password-confirmation"];

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userInfos.id}`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUserInfos(response.data);
        setAlertMessage({
          type: "success",
          message: `Le mot de passe a bien été mis à jour ! Vous pouvez vous connecter à votre compte.`,
          icon: "check-circle",
        });
      })
      .catch(() => {
        setAlertMessage({
          type: "error",
          message:
            "Impossible de modifier votre mot de passe. Veuillez réessayer.",
          icon: "cross-circle",
        });
      });
  };

  return (
    <div id="new-password">
      <main>
        <div className="content">
          <header>
            <h1>Nouveau mot de passe</h1>
            <p>Renseignez votre nouveau mot de passe.</p>
          </header>
          <form className="new-password-form" onSubmit={handleFormSubmit}>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password">Mot de passe (obligatoire)</label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(sanitize(event.target.value));
                    }}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label htmlFor="password-confirmation">
                  Confirmation (obligatoire)
                </label>
                <div className="input">
                  <i className="fi fi-rr-lock" />
                  <input
                    type="password"
                    name="password-confirmation"
                    placeholder="•••••••••••"
                    id="password-confirmation"
                    value={passwordConfirmation}
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                    }}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="button-lg-black-solid">
              Enregistrer
            </button>
          </form>
          {alertMessage && (
            <Alert
              type={alertMessage.type}
              text={alertMessage.message}
              icon={alertMessage.icon}
            >
              {alertMessage.children ? alertMessage.children : null}
            </Alert>
          )}
        </div>
      </main>
    </div>
  );
}
