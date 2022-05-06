const { Router } = require("express");
const { emailCheckOut   } = require("../controllers/checkoutEmail");
const checkOutEmail = Router();
const authentication = require("../middlewares/authentication");



checkOutEmail.post("/:email", emailCheckOut  );

module.exports = checkOutEmail ;
