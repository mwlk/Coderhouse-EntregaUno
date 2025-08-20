// import CartManager from "./src/managers/cartManager.js";
// import ProductManager from "./src/managers/productManager.js";

const CartManager = require("./src/managers/cartManager.js");
const ProductManager = require("./src/managers/productManager.js");

const express = require("express");
const fs = require("fs");
const config = require("./configs/config.js");

const productFilePath = config.getFilePath("products.json");
const productManager = new ProductManager(productFilePath);

const cartFilePath = config.getFilePath("carts.json");
const cartManager = new CartManager(cartFilePath);

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Product API");
});

//! Products Endpoints
app.get("/products", async (_, res) => {
  try {
    let products = await productManager.GetProducts();

    if (products) {
      return res.status(200).json(products);
    }

    return res.status(404).json({ message: "No products found" });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    let product = await productManager.getProductById(pid);

    if (product) {
      return res.status(200).json(product);
    }

    return res
      .status(404)
      .json({ message: `Product with id ${pid} not found` });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const productData = req.body;
    console.log("Received product data:", productData);

    const newProduct = await productManager.addProduct(productData);

    if (newProduct) {
      return res.status(201).json(newProduct);
    }

    return res.status(400).json({ message: "Invalid product data" });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
