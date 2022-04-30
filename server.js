const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

//require routes
const restaurants = require("./routes/restaurants");
// const inventory = require("./routes/inventory");

app.use(cors());
app.use(express.json());
// app.use("/static", express.static("public"));
 app.use("/restaurants", restaurants);
// app.use("/inventory", inventory);



// Start the server listening
// It's convention to have this at the end of the file
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
