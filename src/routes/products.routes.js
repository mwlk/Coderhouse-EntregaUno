const express = require("express");
const router = express.Router();
const config = require("../../configs/config.js");

const ProductManager = require("../managers/productManager.js");

const productFilePath = config.getFilePath("products.json");
const productManager = new ProductManager(productFilePath);

router.get("/", async (_, res) => {
  try {
    let products = await productManager.getProducts();

    if (products) {
      return res.status(200).json(products);
    }

    return res.status(404).json({ message: "No products found" });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/:pid", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const productData = req.body;

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

router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const updatedProduct = await productManager.updateProduct(pid, req.body);

    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    }

    res.status(404).json({ message: `Product with id ${pid} not found` });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/:pid", async (req, res) => {
  console.log("DELETE /:pid called");
  try {
    const pid = req.params.pid;

    const deleted = await productManager.deleteProduct(pid);

    if (deleted) {
      return res
        .status(200)
        .json({ message: `Product with id ${pid} deleted successfully` });
    }

    res.status(404).json({ message: `Product with id ${pid} not found` });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
