const express = require("express");
const fs = require("fs");
const config = require("./configs/config.js");

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const defaultProducts = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Product API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
