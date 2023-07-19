/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  createFavorite(cocktailId, UserId) {
    return this.database.query(
      `insert into ${this.table} (cocktail_id, user_id) values (?, ?);`,
      [cocktailId, UserId]
    );
  }

  removeFavorite(cocktailId, UserId) {
    return this.database.query(
      `delete from ${this.table} where cocktail_id = ? AND user_id = ?;`,
      [cocktailId, UserId]
    );
  }

  getAllUserFavoriteCocktails(UserId) {
    return this.database.query(
      `select * from ${this.table} where user_id = ?;`,
      [UserId]
    );
  }
}

module.exports = FavoriteManager;
