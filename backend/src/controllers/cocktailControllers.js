/* eslint-disable camelcase */

require("dotenv").config();

const { API_URL } = process.env;

const axios = require("axios");

const getCocktailsTypes = (req, res) => {
  axios
    .get(`${API_URL}/list.php?c=list`)
    .then((response) => {
      res.send(response.data.drinks);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getCocktailsByCategory = (req, res) => {
  const { category } = req.params;

  axios
    .get(`${API_URL}filter.php?c=${category}`)
    .then((response) => {
      res.send(response.data.drinks);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCocktailById = (req, res) => {
  const { id } = req.params;
  axios
    .get(`${API_URL}lookup.php?i=${id}`)
    .then((response) => {
      res.send(response.data.drinks[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCocktailByName = (req, res) => {
  const { name } = req.params;

  axios
    .get(`${API_URL}search.php?s=${name}`)
    .then((response) => {
      res.send(response.data.drinks);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getCocktailsTypes,
  getCocktailsByCategory,
  getCocktailById,
  getCocktailByName,
};
