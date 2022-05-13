const knex = require('knex')(require('../knexfile').development);

exports.index = (req, res) => {
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