import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const productsFilePath = './src/data/products.json';

const readFilesProduct = async () => {
  try {
    const data = await fs.promises.readFile(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeFileProduct = async (data) => {
  try {
    await fs.promises.writeFile(productsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Error al escribir en el archivo');
  }
};

const productsController = {
  getAllProducts: async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await readFilesProduct();
    res.json(limit ? products.slice(0, limit) : products);
  },

  getProductById: async (req, res) => {
    const products = await readFilesProduct();
    const Product = products.find((item) => item.id === req.params.pid);
    if (Product) {
      res.json(Product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  },

  addProduct: async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const newProduct = {
      id: uuidv4(),
      title,
      description,
      code,
      price,
      stock,
      category
    };
    const products = await readFilesProduct();
    products.push(newProduct);
    await writeFileProduct(products);
    res.status(201).json(newProduct);
  },

  updateProduct: async (req, res) => {
    const { title, description, code, price, stock, category  } = req.body;
    const products = await readFilesProduct();
    const indexProduct = products.findIndex((item) => item.id === req.params.pid);
    if (indexProduct !== -1) {
      products[indexProduct] = {
        ...products[indexProduct],
        title,
        description,
        code,
        price,
        stock,
        category
      };
      await writeFileProduct(products);
      res.json(products[indexProduct]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  },

  deleteProduct: async (req, res) => {
    const products = await readFilesProduct();
    const productsFilter = products.filter((item) => item.id !== req.params.pid);
    if (productsFilter.length !== products.length) {
      await writeFileProduct(productsFilter);
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  },
};

export default productsController;