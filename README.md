# API E-commerce - Entrega 1

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

## Tecnologías

- Node.js
- Express.js
- File System (JSON)
- Crypto (UUID)
