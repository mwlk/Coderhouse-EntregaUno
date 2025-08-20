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
    }
  }

  async addCart(cart) {
    try {
      if (!(cart instanceof cart)) {
        throw new Error("Invalid cart instance");
      }

      const carts = await this.#readFile();
      const newcart = {
        ...cart,
        id: crypto.randomUUID(),
      };

      carts.push(newcart);
      await this.#writeFile(carts);
      return newcart;
    } catch (error) {
      console.error($`Error al agregar carto: ${error.message}`);
    }
  }

  async GetCarts() {
    try {
      const carts = await this.#readFile();
      return carts;
    } catch (error) {
      console.error("Error al obtener cartos:", error);
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
    }
  }
}

module.exports = CartManager;
