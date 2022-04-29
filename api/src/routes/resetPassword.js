const { Router } = require("express");
const { ResetPassword } = require("../controllers/resetPassword");
const resetPasswordRouter = Router();
const authentication = require("../middlewares/authentication");

resetPasswordRouter.put("/:email",/* authentication, */ResetPassword);

module.exports = resetPasswordRouter;
