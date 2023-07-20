/* eslint-disable camelcase */
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import "./Cocktails.scss";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import AuthContext from "../../contexts/AuthContext";

export default function Cocktails() {
  const { userToken, userInfos } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const cocktailsCategorie = searchParams.get("category");
  const [cocktailsList, setCocktailsList] = useState([]);
  const [userFavoritesCocktails, setUserFavoritesCocktails] = useState([]);
  const [favoriteCocktailStateHasChanged, setFavoriteCocktailStateHasChanged] =
    useState(false);

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
  }, [userInfos, favoriteCocktailStateHasChanged]);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/cocktails/categories/${cocktailsCategorie}`
      )
      .then((response) => {
        setCocktailsList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="cocktails">
      <main>
        <header>
          <h1>{cocktailsCategorie}</h1>
        </header>
        {setCocktailsList.length > 0 && (
          <ul className="cocktails-list">
            {cocktailsList.map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                setFavoriteCocktailStateHasChanged={
                  setFavoriteCocktailStateHasChanged
                }
                userFavoritesCocktails={userFavoritesCocktails}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
