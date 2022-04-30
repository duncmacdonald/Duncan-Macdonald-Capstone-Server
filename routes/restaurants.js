const router = require('express').Router();
const restaurantController = require('../controllers/restaurantsController');

router.route('/').get(restaurantController.index);

module.exports = router;