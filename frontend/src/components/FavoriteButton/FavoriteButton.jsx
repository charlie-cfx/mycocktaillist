/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./FavoriteButton.scss";
import AuthContext from "../../contexts/AuthContext";

export default function FavoriteButton({
  cocktailId,
  setFavoriteCocktailStateHasChanged,
  userFavoritesCocktails,
}) {
  const { userInfos, userToken } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);
  useEffect(() => {
    if (userFavoritesCocktails) {
      const isCocktailInFavorites = userFavoritesCocktails.some(
        (cocktail) => cocktail.cocktail_id === parseInt(cocktailId, 10)
      );
      setIsAddedToFavorite(isCocktailInFavorites);
    }
  }, [userFavoritesCocktails, cocktailId]);

  const handleLike = () => {
    if (isAddedToFavorite) {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/favorites/${
            userInfos.id
          }/${cocktailId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(() => {
          setIsAddedToFavorite(false);
          setFavoriteCocktailStateHasChanged(true);
        })
        .catch((error) => {
          console.error("Error removing favorite:", error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/favorites/${
            userInfos.id
          }/${cocktailId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        .then(() => {
          setIsAddedToFavorite(true);
          setFavoriteCocktailStateHasChanged(true);
        })
        .catch((error) => {
          console.error("Error adding favorite:", error);
        });
    }
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  let likeIcon = "fi fi-rs-heart";
  if (isAddedToFavorite) {
    likeIcon = "fi fi-ss-heart";
    if (isHovered) {
      likeIcon = "fi fi-ss-heart-crack";
    }
  }

  return (
    <button
      className="cocktail-favorite"
      type="button"
      onClick={handleLike}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <i className={likeIcon} />
    </button>
  );
}

FavoriteButton.propTypes = {
  cocktailId: PropTypes.string.isRequired,
};
