const express = require("express");
const config = require("./configs/config.js");

const productsRoutes = require("./src/routes/products.routes.js");

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Product API");
});

app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
