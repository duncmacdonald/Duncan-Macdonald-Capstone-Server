const knex = require("knex")(require("../knexfile").development);

exports.index = (req, res) => {
  console.log(req.query.items);
  const order = JSON.parse(req.query.items);
  const items = order.map((food) => food.itemId);

  console.log(items);

  knex("menu")
    .join("restaurants", "menu.restaurant_id", "=", "restaurants.id")
    .select("*")
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => res.status(400).send(`Error retrieving menu: ${err}`));
};

exports.initializeOrder = (req, res) => {
  //console.log(req.body);
  // const orderItemIds = req.body.cart.map((item) => item.itemId);
  const orderItemQuantities = {};
  req.body.cart.forEach((item) => {
    orderItemQuantities[item.itemId] = item.quantity;
  });
  const orderItemIds = Object.keys(orderItemQuantities);
  //Find the user information
  knex("users")
    .select("id", "first_name", "last_name", "phone")
    .where({ id: req.body.userId })
    .then((customer) => {
      knex("menu") //find the item prices server side for security
        .select("id", "restaurant_id", "name", "price")
        .whereIn("id", orderItemIds)
        .then((result) => {
          //Calculate subtotals so we can get a total
          const subtotals = result.map((item) => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              subtotal: item.price * orderItemQuantities[item.id],
            };
          });
          //Calculate an order total
          const total = subtotals
            .map((item) => item.subtotal)
            .reduce((a, b) => a + b);

          return {
            user: Object.values(JSON.parse(JSON.stringify(customer))),
            bill: subtotals,
            total: total,
            restaurant_id: result[0].restaurant_id,
          };
        })
        .then((result) => {
          const newOrder = {
            user_id: result.user[0].id,
            restaurant_id: result.restaurant_id,
            order_time: `${Date.now()}`,
            status: "checkout",
            total: result.total,
          };

          knex("orders") //add order to table
            .insert(newOrder)
            .then((result) => {
              console.log("new order added to db");
              return result; //returns the order_id
            })
            .then((id) => {
              const newItems = result.bill.map((item) => {
                return {
                  quantity: orderItemQuantities[item.id],
                  item_id: item.id,
                  order_id: id[0],
                };
              });
              // console.log(new_items);

              knex("order_items")
                .insert(newItems)
                .then((result) => {
                  console.log("new tasty items assigned to order");
                })
                .then(() => res.status(200).json([newOrder, result.bill]));
            })
            .catch((err) => {
              console.log(err);
              throw err;
            });
        });
    });
};

exports.submitOrder = (req, res) => {
  knex("orders")
    .where({ user_id: req.body.user_id, order_time: req.body.order_time })
    .update(
      {
        status: "complete",
        order_time: `${Date.now()}`,
      }
    ) //mark food as cooked and update time to reflect time order was submitted to restaurant. This kitchen is really fast...
    .then(() => {
      res.status(200).send("Your food is ready");
    })
    .catch((err) => res.status(400).send(err));
};
