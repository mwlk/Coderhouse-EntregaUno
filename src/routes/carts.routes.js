const CartManager = require("./src/managers/cartManager.js");

const cartFilePath = config.getFilePath("carts.json");
const cartManager = new CartManager(cartFilePath);
