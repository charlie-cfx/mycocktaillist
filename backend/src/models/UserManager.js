/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  createUser(user) {
    const { email, hashed_password } = user;
    return this.database.query(
      `insert into ${this.table} (email, password) values (?, ?);`,
      [email, hashed_password]
    );
  }

  // récupérer tous les utilisateurs
  getAllUsers(company_id) {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url, uhc.function FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=? AND ${this.table}.has_accepted_invitation = 1`,
      [company_id]
    );
  }

  // récupérer un utilisateur
  getOneUser(company_id, user_id) {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} JOIN user_has_company AS uhc ON uhc.user_id=${this.table}.id JOIN company AS c ON c.id=uhc.company_id WHERE c.id=? AND ${this.table}.id =?`,
      [company_id, user_id]
    );
  }

  // ajouter un utilisateur à une entreprise
  addUser(userId, companyId) {
    return this.database.query(
      `INSERT INTO user_has_company (user_id, company_id) VALUES (?, ?);`,
      [userId, companyId]
    );
  }

  modifyUserProfile(userId, user) {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, userId]
    );
  }

  // supprimer un utilisateur
  deleteUserProfile(userId, companyId) {
    return this.database.query(
      `DELETE FROM user_has_company WHERE user_id = ? AND company_id= ?`,
      [userId, companyId]
    );
  }

  getUserInCompanyById(companyId, userId) {
    return this.database.query(
      `SELECT
      ${this.table}.id,
      ${this.table}.firstname,
      ${this.table}.lastname,
      ${this.table}.email,
      ${this.table}.picture_url,
      ${this.table}.has_accepted_invitation
    FROM
      ${this.table}
      JOIN user_has_company AS uhc ON uhc.user_id = ${this.table}.id
      AND uhc.company_id = ?
    WHERE
      ${this.table}.id = ? AND uhc.company_id = ?;`,
      [companyId, userId, companyId]
    );
  }

  getUserByMail(email) {
    return this.database.query(
      `SELECT ${this.table}.id, ${this.table}.firstname, ${this.table}.lastname, ${this.table}.email, ${this.table}.password, ${this.table}.picture_url FROM ${this.table} WHERE ${this.table}.email = ?;`,
      [email]
    );
  }

  modifyUserCompanyProfile(companyId, userId, user) {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const valueQuery = keys.map((key) => `\`${key}\` = ?`).join(", ");

    return this.database.query(
      `UPDATE user_has_company SET ${valueQuery} WHERE user_id = ? AND company_id= ?;`,
      [...values, userId, companyId]
    );
  }
}

module.exports = UserManager;
