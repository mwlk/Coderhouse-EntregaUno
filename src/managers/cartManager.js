const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async #readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async #writeFile(carts) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error("Error writing to file:", error);
      throw error;
    }
  }

  async addCart() {
    try {
      const carts = await this.#readFile();

      const newCart = {
        id: crypto.randomUUID(),
        products: [],
      };

      carts.push(newCart);
      await this.#writeFile(carts);
      return newCart;
    } catch (error) {
      console.error(`Error al agregar carrito: ${error.message}`);
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.#readFile();
      return carts;
    } catch (error) {
      console.error("Error al obtener cartos:", error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.#readFile();
      const cart = carts.find((p) => p.id === id);
      if (!cart) {
        throw new Error(`cart with id ${id} not found`);
      }
      return cart;
    } catch (error) {
      console.error(`Error al obtener carto por ID: ${error.message}`);
      throw error;
    }
  }

  async updateCart(id, updatedcart) {
    try {
      const carts = await this.#readFile();
      const index = carts.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`cart with id ${id} not found`);
      }

      carts[index] = { ...carts[index], ...updatedcart };
      await this.#writeFile(carts);
      return carts[index];
    } catch (error) {
      console.error(`Error al actualizar carto: ${error.message}`);
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const carts = await this.#readFile();
      const index = carts.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`cart with id ${id} not found`);
      }

      carts.splice(index, 1);
      await this.#writeFile(carts);
      return { message: `cart with id ${id} deleted successfully` };
    } catch (error) {
      console.error(`Error al eliminar carto: ${error.message}`);
      throw error;
    }
  }

  async getProductsByCartId(cid) {
    try {
      const cart = await this.getCartById(cid);

      return cart.products;
    } catch (error) {
      console.error(
        `Error al obtener productos por ID de carrito: ${error.message}`
      );
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.#readFile();
      const cartIndex = carts.findIndex((c) => c.id === cid);
      if (cartIndex === -1) {
        throw new Error(`Cart with id ${cid} not found`);
      }

      const productInCartIndex = carts[cartIndex].products.findIndex(
        (p) => p.product === pid
      );

      if (productInCartIndex !== -1) {
        carts[cartIndex].products[productInCartIndex].quantity += 1;
      } else {
        carts[cartIndex].products.push({ product: pid, quantity: 1 });
      }

      await this.#writeFile(carts);
      return carts[cartIndex];
    } catch (error) {
      console.error(`Error al agregar producto al carrito: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CartManager;
