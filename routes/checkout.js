const router = require("express").Router();
const checkoutController = require("../controllers/checkoutController");

router
  .route("/")
  .get(checkoutController.index)
  .post(checkoutController.initializeOrder)
  .put(checkoutController.submitOrder);

module.exports = router;
