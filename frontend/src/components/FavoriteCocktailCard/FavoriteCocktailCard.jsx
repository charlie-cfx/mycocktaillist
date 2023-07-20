/* eslint-disable react/prop-types */
import "./FavoriteCocktailCard.scss";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import AuthContext from "../../contexts/AuthContext";

export default function FavoriteCocktailCard({
  cocktailId,
  setFavoriteCocktailStateHasChanged,
  userFavoritesCocktails,
}) {
  const [cocktail, setCocktail] = useState({});
  const { userToken, userInfos } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cocktails/${cocktailId}`)
      .then((response) => {
        setCocktail(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <li className="cocktail-card">
      <div className="cocktail-image">
        <Link to={`/cocktails/${cocktailId}`}>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </Link>
        {userInfos.id && userToken && (
          <FavoriteButton
            cocktailId={cocktailId.toString()}
            setFavoriteCocktailStateHasChanged={
              setFavoriteCocktailStateHasChanged
            }
            userFavoritesCocktails={userFavoritesCocktails}
          />
        )}
      </div>
      <Link to={`/cocktails/${cocktailId}`}>
        <h2 className="cocktail-name">{cocktail.strDrink}</h2>
      </Link>
    </li>
  );
}
