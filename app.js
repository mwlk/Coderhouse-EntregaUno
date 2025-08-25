const express = require("express");
const config = require("./configs/config.js");

const productsRoutes = require("./src/routes/products.routes.js");
const cartsRoutes = require("./src/routes/carts.routes.js");

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! default route for check
app.get("/", (_, res) => {
  res.status(200).send("Welcome to the Product API");
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
