const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

//require routes
const restaurants = require("./routes/restaurants");
const menu = require("./routes/menu");
const checkout = require("./routes/checkout");

app.use(cors());
app.use(express.json());
// app.use("/static", express.static("public"));
app.use("/restaurants", restaurants);
app.use("/menu", menu);
app.use("/checkout", checkout);


// Start the server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
