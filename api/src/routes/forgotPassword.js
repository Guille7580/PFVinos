const { Router } = require("express");
const { forgotPassword } = require("../controllers/forgotPassword");
const forgotPasswordRouter = Router();
const authentication = require("../middlewares/authentication");

forgotPasswordRouter.post("/", forgotPassword);

module.exports = forgotPasswordRouter;
