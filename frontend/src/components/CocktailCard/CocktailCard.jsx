/* eslint-disable react/prop-types */
import "./CocktailCard.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

import AuthContext from "../../contexts/AuthContext";

export default function CocktailCard({
  cocktail,
  setFavoriteCocktailStateHasChanged,
  userFavoritesCocktails,
}) {
  const { userInfos, userToken } = useContext(AuthContext);
  return (
    <li key={cocktail.idDrink} className="cocktail-card">
      <div className="cocktail-image">
        <Link to={`/cocktails/${cocktail.idDrink}`}>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </Link>{" "}
        {userInfos.id && userToken && (
          <FavoriteButton
            cocktailId={cocktail.idDrink}
            setFavoriteCocktailStateHasChanged={
              setFavoriteCocktailStateHasChanged
            }
            userFavoritesCocktails={userFavoritesCocktails}
          />
        )}
      </div>
      <Link to={`/cocktails/${cocktail.idDrink}`}>
        <h2 className="cocktail-name">{cocktail.strDrink}</h2>
      </Link>
    </li>
  );
}
