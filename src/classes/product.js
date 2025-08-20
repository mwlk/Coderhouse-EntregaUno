class Product {
  constructor({ id, title, description, code, price, status, stock }) {
    this.id = id; // Autogenerado
    this.title = title; // Requerido
    this.description = description; // Requerido
    this.code = code; // Requerido
    this.price = price; // Requerido
    this.status = status; // Requerido
    this.stock = stock; // Requerido
  }
}

module.exports = Product;
