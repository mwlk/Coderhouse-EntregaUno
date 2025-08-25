const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");
const Product = require("../classes/product.js");

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

  async addProduct(productData) {
    try {
      const product = new Product(productData);
      product.validate();

      const products = await this.#readFile();

      const existingProduct = products.find((p) => p.code === product.code);
      if (existingProduct) {
        throw new Error(`Ya existe un producto con el código: ${product.code}`);
      }

      const newProduct = {
        id: crypto.randomUUID(),
        ...product,
      };

      products.push(newProduct);
      await this.#writeFile(products);

      console.log(
        `Producto agregado exitosamente: ${newProduct.title} (ID: ${newProduct.id})`
      );
      return newProduct;
    } catch (error) {
      console.error(`Error al agregar producto: ${error.message}`);
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await this.#readFile();
      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
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
      throw error;
    }
  }

  async updateProduct(id, updatedProduct) {
  try {
    const products = await this.#readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Usar underscore para descartar el id
    const { id: _, ...updateData } = updatedProduct;

    if (updateData.code) {
      const existingProduct = products.find(
        (p) => p.code === updateData.code && p.id !== id
      );
      if (existingProduct) {
        throw new Error(
          `Ya existe un producto con el código: ${updateData.code}`
        );
      }
    }

    products[index] = { ...products[index], ...updateData };
    await this.#writeFile(products);
    return products[index];
  } catch (error) {
    console.error(`Error al actualizar producto: ${error.message}`);
    throw error;
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
      throw error;
    }
  }
}

module.exports = ProductManager;
