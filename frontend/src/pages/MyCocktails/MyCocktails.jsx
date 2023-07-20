/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./MyCocktails.scss";
import FavoriteCocktailCard from "../../components/FavoriteCocktailCard/FavoriteCocktailCard";
import AuthContext from "../../contexts/AuthContext";

export default function MyCocktails() {
  const { userInfos, userToken } = useContext(AuthContext);
  const [userFavoritesCocktails, setUserFavoritesCocktails] = useState([]);
  const [favoriteCocktailStateHasChanged, setFavoriteCocktailStateHasChanged] =
    useState(false);

  const navigate = useNavigate();

  document.title = "My Favorites Cocktails | MyCocktailsList";

  useEffect(() => {
    if (!userToken || !userInfos.id) {
      navigate("/");
    }
  }, [userToken, userInfos.id]);

  useEffect(() => {
    if (userInfos.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/favorites/${userInfos.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setUserFavoritesCocktails(response.data);
          setFavoriteCocktailStateHasChanged(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userInfos, favoriteCocktailStateHasChanged, userToken]);

  return (
    <div className="cocktails">
      {userToken && userInfos.id ? (
        <main>
          <header>
            <h1>My Favorites Cocktails</h1>
          </header>
          {userFavoritesCocktails.length > 0 ? (
            <ul className="cocktails-list">
              {userFavoritesCocktails.map((cocktail) => (
                <FavoriteCocktailCard
                  key={cocktail.cocktail_id}
                  cocktailId={cocktail.cocktail_id}
                  setFavoriteCocktailStateHasChanged={
                    setFavoriteCocktailStateHasChanged
                  }
                  userFavoritesCocktails={userFavoritesCocktails}
                />
              ))}
            </ul>
          ) : (
            <div className="no-favorites">
              <p>
                You currently don't have any favorites. Search for a cocktail
                and add it to your favorites to see it appear here.
              </p>
            </div>
          )}
        </main>
      ) : null}
    </div>
  );
}
