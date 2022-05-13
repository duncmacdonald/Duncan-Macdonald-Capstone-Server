const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router
  .route("/")
  .get(checkoutController.index)
  .post(checkoutController.initializeOrder);

module.exports = router;
