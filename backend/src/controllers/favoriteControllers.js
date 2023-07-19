/* eslint-disable camelcase */
const models = require("../models");

const newFavorite = (req, res) => {
  const { user_id, cocktail_id } = req.params;
  models.favorite
    .createFavorite(cocktail_id, user_id)
    .then(([rows]) => {
      if (rows.affectedRows) {
        res.status(201).send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getFavoritesByUserId = (req, res) => {
  const { user_id } = req.params;
  models.favorite
    .getAllUserFavoriteCocktails(user_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

const deleteFavorite = (req, res) => {
  const { user_id, cocktail_id } = req.params;
  models.favorite
    .removeFavorite(cocktail_id, user_id)
    .then(([rows]) => {
      if (rows) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  newFavorite,
  getFavoritesByUserId,
  deleteFavorite,
};
