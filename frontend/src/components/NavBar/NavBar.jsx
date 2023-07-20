import "./NavBar.scss";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Connection from "../Connection/Connection";
import PasswordReset from "../PasswordReset/PasswordReset";

import AuthContext from "../../contexts/AuthContext";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const { userToken, userInfos, setUser } = useContext(AuthContext);
  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img
            src="https://res.cloudinary.com/dmmifezda/image/upload/v1689756684/my-coocktails-list_gojnhd.svg"
            alt=""
          />
        </Link>
        <SearchBar />
        <div className="links">
          {userToken && Object.keys(userInfos).length ? (
            <>
              <Link to="/my-cocktails">
                <i className="fi fi-rs-heart" />
              </Link>
              <button type="button" onClick={() => setUser("")}>
                <i className="fi fi-rs-exit" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
              type="button"
            >
              <i className="fi fi-rs-circle-user" />
            </button>
          )}
        </div>
      </nav>
      {isLoginModalOpen && (
        <Connection
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsPasswordResetModalOpen={setIsPasswordResetModalOpen}
        />
      )}
      {isPasswordResetModalOpen && (
        <PasswordReset
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsPasswordResetModalOpen={setIsPasswordResetModalOpen}
        />
      )}
    </>
  );
}
