const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  randomPasswordGenerator,
  verifyCompanyAdminOrSalesForceAdminRole,
} = require("./services/auth");

/* ---- USERS ROUTES ---- */

const userControllers = require("./controllers/userControllers");

router.post("/user/login", userControllers.authenticationCheck, verifyPassword);

// récupérer les users d'une entreprise
router.get(
  "/companies/:company_id/users",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  userControllers.getUsers
);

// récupérer un user d'une société
router.get("/companies/:company_id/users/:user_id", userControllers.getUser);

// ajouter un utilisateur à une entreprise
router.post(
  "/companies/:company_id/users/:user_id",
  userControllers.insertUser
);

// mettre à jour un profil utilisateur
router.put(
  "/users/:user_id",
  verifyToken,
  hashPassword,
  userControllers.updateUserProfile
);

// effacer un profil utilisateur
router.delete(
  "/companies/:company_id/users/:user_id",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  userControllers.deleteUser
);

const invitationMiddlewares = require("./middlewares/invitationMiddlewares");

// Invite a new user to a company
router.post(
  "/companies/:company_id/users",
  verifyToken,
  verifyCompanyAdminOrSalesForceAdminRole,
  invitationMiddlewares.invitationVerifyUserExists,
  invitationMiddlewares.invitationVerifyUserInCompany,
  randomPasswordGenerator,
  hashPassword,
  invitationMiddlewares.sendInvitationMail,
  invitationMiddlewares.invitationNewUser,
  userControllers.insertUser
);

const passwordResetMiddlewares = require("./middlewares/passwordResetMiddlewares");

// Send password reset mail
router.post(
  "/password-reset",
  passwordResetMiddlewares.passwordResetVerifyUserExists,
  randomPasswordGenerator,
  hashPassword,
  passwordResetMiddlewares.passwordResetUpdateUserProfile,
  passwordResetMiddlewares.sendResetPasswordMail
);

// Update user profile in company

router.put(
  "/companies/:company_id/users/:user_id",
  verifyToken,
  userControllers.updateUserProfileInCompany
);

const cocktailControllers = require("./controllers/cocktailControllers");

router.get("/cocktails/types", cocktailControllers.getCocktailsTypes);
router.get(
  "/cocktails/categories/:category",
  cocktailControllers.getCocktailsByCategory
);

router.get("/cocktails/:id", cocktailControllers.getCocktailById);

const favoriteControllers = require("./controllers/favoriteControllers");

router.post(
  "/favorites/:user_id/:cocktail_id",
  verifyToken,
  favoriteControllers.newFavorite
);
router.delete(
  "/favorites/:user_id/:cocktail_id",
  verifyToken,
  favoriteControllers.deleteFavorite
);

router.get(
  "/favorites/:user_id",
  verifyToken,
  favoriteControllers.getFavoritesByUserId
);

module.exports = router;
