const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

class ProductManager {
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

  async #writeFile(products) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }

  async addpProduct(product) {
    try {
      if (!(product instanceof Product)) {
        throw new Error("Invalid product instance");
      }

      const products = await this.#readFile();
      const newProduct = {
        ...product,
        id: crypto.randomUUID(),
      };

      products.push(newProduct);
      await this.#writeFile(products);
      return newProduct;
    } catch (error) {
      console.error($`Error al agregar producto: ${error.message}`);
    }
  }

  async GetProducts() {
    try {
      const products = await this.#readFile();
      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.#readFile();
      const product = products.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error(`Error al obtener producto por ID: ${error.message}`);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.#readFile();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }

      products[index] = { ...products[index], ...updatedProduct };
      await this.#writeFile(products);
      return products[index];
    } catch (error) {
      console.error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.#readFile();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }

      products.splice(index, 1);
      await this.#writeFile(products);
      return { message: `Product with id ${id} deleted successfully` };
    } catch (error) {
      console.error(`Error al eliminar producto: ${error.message}`);
    }
  }
}

module.exports = ProductManager;
