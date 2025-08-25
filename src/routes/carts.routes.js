const express = require("express");
const router = express.Router();

const config = require("../../configs/config.js");

const CartManager = require("../managers/cartManager.js");

const cartFilePath = config.getFilePath("carts.json");
const cartManager = new CartManager(cartFilePath);

const ProductManager = require("../managers/productManager.js");
const productFilePath = config.getFilePath("products.json");
const productManager = new ProductManager(productFilePath);

//! crea el carrito con productos vacíos y id autogenerado
router.post("/", async (_, res) => {
  try {
    const newCart = await cartManager.addCart();

    if (newCart) {
      return res.status(201).json(newCart);
    }

    return res.status(400).json({ message: "Invalid cart data" });
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

//! Debe listar los productos que pertenecen al carrito con el cid proporcionado.
router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const result = await cartManager.getProductsByCartId(cid);

    if (result) {
      return res.status(200).json({
        cartId: cid,
        products: result,
      });
    }

    return res.status(404).json({ message: `Cart with id ${cid} not found` });
  } catch (error) {
    console.error("Error fetching carts:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

//! Debe agregar el producto al arreglo products del carrito seleccionado,
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const existProduct = await productManager.getProductById(pid);
    if (!existProduct) {
      return res
        .status(404)
        .json({ message: `Product with id ${pid} not found` });
    }
    const result = await cartManager.addProductToCart(cid, pid);

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).json({ message: `Cart with id ${cid} not found` });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
