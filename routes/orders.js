const router = require("express").Router();
const checkoutController = require("../controllers/ordersController");

router
  .route("/")
  .get(checkoutController.myOrders)
  .put(checkoutController.returnDishes);

module.exports = router;
