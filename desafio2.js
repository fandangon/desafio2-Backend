const fs = require('fs');

class product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    let dato;
    let productos;
    if (fs.existsSync(this.path)) {
      dato = await fs.promises.readFile(this.path, 'utf-8');
      productos = JSON.parse(dato);
    } else {
      productos = [];
    }
    let productExists = productos.findIndex((producto) => producto.code === code) !== -1;
    let aFieldIsEmpty = !(title && description && price && thumbnail && code && stock);
    if (productExists || aFieldIsEmpty) {
      console.log(`Producto no añadido.\nErrors:\n${productExists ? "El producto existe.\n" : ""} ${aFieldIsEmpty ? "Se deben completar todos los campos" : ""}`);
    } else {
      let id = productos.length + 1;
      let newProduct = new Product(id, title, description, price, thumbnail, code, stock);
      productos.push(newProduct);
      dato = JSON.stringify(productos);
      await fs.promises.writeFile(this.path, dato);
      console.log(`Producto ${title} añadido con ID ${id}`);
    }
  }

  async getProducts() {
    let dato;
    let productos;
    if (fs.existsSync(this.path)) {
      dato = await fs.promises.readFile(this.path, 'utf-8');
      productos = JSON.parse(dato);
    } else {
      productos = [];
    }
    return productos;
  }
  async getProductById(id) {
    let dato;
    let productos;
    if (fs.existsSync(this.path)) {
      dato = await fs.promises.readFile(this.path, 'utf-8');
      productos = JSON.parse(dato);
      let productIndex = productos.findIndex((productos) => productos.id === id);
      if (productIndex === -1) {
        console.log("Producto no encontrado");
      } else {
        return productos[productIndex];
      }
    } else {
      console.log("Archivo no encontrado");
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    let dato;
    let productos;
    if (fs.existsSync(this.path)) {
      dato = await fs.promises.readFile(this.path, 'utf-8');
      productos = JSON.parse(dato);
      let productoIndex = productos.findIndex((productos) => productos.id === id);
      if (productoIndex === -1) {
        console.log("Producto no encontrado");
      } else {
        productos[productoIndex].title = title;
        productos[productoIndex].description = description;
        productos[productoIndex].price = price;
        productos[productoIndex].thumbnail = thumbnail;
        productos[productoIndex].code = code;
        productos[productoIndex].stock = stock;
        dato = JSON.stringify(productos);
        await fs.promises.writeFile(this.path, dato);
        console.log(`El Producto ${title} con ID ${id} se actualizo satisfactoriamente`);
      }
    } else {
      console.log("Archivo no encontrado");
    }
  }
  async deleteProduct(id) {
    let dato;
    let productos;
    if (fs.existsSync(this.path)) {
      dato = await fs.promises.readFile(this.path, 'utf-8');
      productos = JSON.parse(dato);
      let productoIndex = productos.findIndex((productos) => productos.it === id);
      if (productoIndex === -1) {
        console.log("Producto no encontrado");
      } else {
        productos[productoIndex] = {};
        dato = JSON.stringify(productos);
        await fs.promises.writeFile(this.path, dato);
        console.log(`El producto con ID ${id} se elimino`);
      }
    } else {
      console.log("Archivo no encontrado");
    }
  }
}
let pm = new ProductManager('./files/productos.txt');

/* Llamada a métodos */
//pm.getProducts().then(productos => console.log(productos));
pm.addProduct("Detergente", "Detergente elimina todo", 123, "", "det555", 40);
//pm.getProducts().then(productos => console.log(productos));
//pm.getProductById(1).then(productos => console.log(productos));
//pm.updateProduct("Detergente", "Se modifica description del producto", 456, "", "det556", 40);
//pm.deleteProduct(1);