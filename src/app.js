// app.js
const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = "../productos.json";
const productManager = new ProductManager(filePath);

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    console.log("ID del producto:", productId);
    console.log("Lista de productos:", productManager.getProducts());
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: `Product with ID ${productId} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (_req, res) => {
  res.send("Bienvenido a la aplicación de venta de autos");
});
