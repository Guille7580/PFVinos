const { Router } = require("express");
const { forgotPassword } = require("../controllers/forgotPassword");
const forgotPasswordRouter = Router();
const authentication = require("../middlewares/authentication");

forgotPasswordRouter.post("/:email", forgotPassword);

module.exports = forgotPasswordRouter;
