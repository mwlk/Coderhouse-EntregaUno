# API E-commerce - Entrega 1
*Coderhouse*

**Autor:** Wlk Mirko Ivo

## Descripción

API REST para gestionar productos y carritos de compra desarrollada con Node.js y Express. Los datos se almacenan en archivos JSON.

## Instalación

```bash
npm install
npm start
```

Servidor en: `http://localhost:8080`

## Endpoints Implementados

### Productos `/api/products`
- `GET /` - Listar productos
- `GET /:pid` - Obtener producto por ID
- `POST /` - Crear producto
- `PUT /:pid` - Actualizar producto 
- `DELETE /:pid` - Eliminar producto

### Carritos `/api/carts`
- `POST /` - Crear carrito vacío
- `GET /:cid` - Listar productos del carrito
- `POST /:cid/product/:pid` - Agregar producto al carrito

## Características

- IDs autogenerados con UUID
- Validación de campos requeridos
- Persistencia en archivos JSON (`products.json`, `carts.json`)
- Manejo de errores apropiado
- Incremento automático de quantity en carritos

## Estructura de Datos

**Producto:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string", 
  "code": "string",
  "price": "number",
  "status": "boolean",
  "stock": "number",
  "category": "string",
  "thumbnails": ["array"]
}
```

**Carrito:**
```json
{
  "id": "uuid",
  "products": [
    {
      "product": "product-id",
      "quantity": "number"
    }
  ]
}
```

## Cómo Probar los Endpoints

### Productos

**Crear un producto:**
```bash
POST http://localhost:8080/api/products/


{
  "title": "iPhone 15 Pro",
  "description": "Smartphone Apple",
  "code": "IPHONE15PRO",
  "price": 999.99,
  "stock": 25,
  "category": "Smartphones"
}
```

**Obtener todos los productos:**
```bash
GET http://localhost:8080/api/products/
```

**Obtener producto por ID:**
```bash
GET http://localhost:8080/api/products/{PID}
```

**Actualizar producto:**
```bash
PUT http://localhost:8080/api/products/{PID}
Content-Type: application/json

{
  "price": 899.99,
  "stock": 30
}
```

**Eliminar producto:**
```bash
DELETE http://localhost:8080/api/products/{PID}
```

### Carritos

**Crear carrito:**
```bash
POST http://localhost:8080/api/carts/
Content-Type: application/json

{}
```

**Agregar producto al carrito:**
```bash
POST http://localhost:8080/api/carts/{CID}/product/{PID}
Content-Type: application/json

{}
```

**Ver productos del carrito:**
```bash
GET http://localhost:8080/api/carts/{CID}
```

### Flujo de Prueba Completo

1. Crear algunos productos con POST `/api/products/`
2. Crear un carrito con POST `/api/carts/`
3. Agregar productos al carrito con POST `/api/carts/{cid}/product/{pid}`
4. Verificar el carrito con GET `/api/carts/{cid}`

## Tecnologías

- Node.js
- Express.js
- File System (JSON)
- Crypto (UUID)

## Cómo Probar los Endpoints

### Productos

**Crear un producto:**
```bash
POST http://localhost:8080/api/products/
Content-Type: application/json

{
  "title": "iPhone 15 Pro",
  "description": "Smartphone Apple con chip A17 Pro",
  "code": "IPHONE15PRO",
  "price": 999.99,
  "stock": 25,
  "category": "Smartphones",
  "thumbnails": ["iphone15_1.jpg", "iphone15_2.jpg"]
}
```

**Obtener todos los productos:**
```bash
GET http://localhost:8080/api/products/
```

**Obtener producto por ID:**
```bash
GET http://localhost:8080/api/products/{PRODUCT_ID}
```

**Actualizar producto:**
```bash
PUT http://localhost:8080/api/products/{PRODUCT_ID}
Content-Type: application/json

{
  "title": "iPhone 15 Pro Max",
  "price": 1199.99,
  "stock": 30
}
```

**Eliminar producto:**
```bash
DELETE http://localhost:8080/api/products/{PRODUCT_ID}
```

### Carritos

**Crear carrito:**
```bash
POST http://localhost:8080/api/carts/
Content-Type: application/json

{}
```

**Agregar producto al carrito:**
```bash
POST http://localhost:8080/api/carts/{CART_ID}/product/{PRODUCT_ID}
Content-Type: application/json

{}
```

**Ver productos del carrito:**
```bash
GET http://localhost:8080/api/carts/{CART_ID}
```
Para desarrollo con auto-restart:
```bash
npm install -g nodemon
nodemon app.js
```
