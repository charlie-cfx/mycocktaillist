/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import "./CocktailDetails.scss";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";

import AuthContext from "../../contexts/AuthContext";

export default function CocktailDetails() {
  const { userInfos, userToken } = useContext(AuthContext);
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
  }, [userInfos, favoriteCocktailStateHasChanged, userToken]);
  const [cocktail, setCocktail] = useState({});

  const { cocktail_id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/cocktails/${cocktail_id}`)
      .then((response) => {
        setCocktail(response.data);

        document.title = `${response.data.strDrink} | MyCocktailsList`;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [cocktail_id]);

  let instructions = [];
  if (cocktail.strInstructions) {
    instructions = cocktail.strInstructions
      .split(/\d+\./)
      .filter((instruction) => instruction.trim() !== "");
  }

  const ingredients = [];
  for (let i = 1; i <= 15; i += 1) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="cocktail-details">
      <main>
        <div className="container">
          {cocktail.strDrink ? (
            <>
              <div className="content">
                <h1>
                  {cocktail.strDrink}
                  {userInfos.id && userToken && cocktail.idDrink && (
                    <FavoriteButton
                      cocktailId={cocktail.idDrink}
                      setFavoriteCocktailStateHasChanged={
                        setFavoriteCocktailStateHasChanged
                      }
                      userFavoritesCocktails={userFavoritesCocktails}
                    />
                  )}
                </h1>
                {ingredients && (
                  <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                      {ingredients.map((ingredient) => (
                        <li key={ingredient.ingredient}>
                          {ingredient.measure} of {ingredient.ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {cocktail.strInstructions && (
                  <div className="instructions">
                    <h2>Instuctions</h2>
                    <ol>
                      {instructions.map((instruction) => (
                        <li key={instruction}>{instruction.trim()}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div className="image-container">
                <div className="image">
                  <div className="shape" />
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}
