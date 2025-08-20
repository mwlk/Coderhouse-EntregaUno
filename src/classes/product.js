class Product {
  constructor({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = [],
  }) {
    if (!title) {
      throw new Error("El campo 'title' es requerido");
    }
    if (!description) {
      throw new Error("El campo 'description' es requerido");
    }
    if (!code) {
      throw new Error("El campo 'code' es requerido");
    }
    if (price === undefined || price === null || isNaN(price)) {
      throw new Error("El campo 'price' es requerido y debe ser un número");
    }
    if (stock === undefined || stock === null || isNaN(stock)) {
      throw new Error("El campo 'stock' es requerido y debe ser un número");
    }
    if (!category) {
      throw new Error("El campo 'category' es requerido");
    }

    this.title = title.trim();
    this.description = description.trim();
    this.code = code.trim().toUpperCase();
    this.price = Number(price);
    this.status = Boolean(status);
    this.stock = Number(stock);
    this.category = category.trim();
    this.thumbnails = Array.isArray(thumbnails) ? thumbnails : [];
  }

  validatePrice() {
    if (this.price <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }
  }

  validateStock() {
    if (this.stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }
  }

  validate() {
    this.validatePrice();
    this.validateStock();
    return true;
  }
}

module.exports = Product;
