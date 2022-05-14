const knex = require('knex')(require('../knexfile').development);

exports.myOrders = (req, res) => {
    console.log(req.query.user_id);

    knex('orders').select('*').where({user_id: req.query.user_id}).whereNot({status: 'checkout'}).then(data => res.status(200).json(data));
}
//   knex('orders')

//     .join('restaurants', 'orders.restaurant_id', '=', 'restaurants.id')
//     .select('orders.id', 'orders.user_id', 'orders.time', 'orders.status', 'restaurants.name')
//     .then((data) => {
        
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving orders: ${err}`)
//     );
// };

exports.returnDishes = (req, res) => {
    console.log(req);

  knex('menu')
    .select('*')
    .where({restaurant_id: req.query.restaurant_id})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving menu: ${err}`)
    );
};