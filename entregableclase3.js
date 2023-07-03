class ProductManager {
    constructor() {
      this.products = []
      this.id = 0
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("All field are required");
        return
      }
  
      const existingProduct = this.products.find((product) => product.code === code)
      if (existingProduct) {
        console.log("This product already exists");
        return
      } else {
        console.log("Not Found")
      }
  
      const newProduct = {
        id: ++this.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products
    }
  
    getProductById(id) {
      return this.products.find((product) => product.id === id)
    }
  }
  


  const newProduct = new ProductManager()

  newProduct.addProduct("Product1", "Description", 35, "thumbnail1.png", "1", 10)
  newProduct.addProduct("Product2", "Description", 45, "thumbnail2.png", "2", 10)
  newProduct.addProduct("Product3", "Description", 55, "thumbnail3.png", "3", 10)
  newProduct.addProduct("Product4", "Description", 65, "thumbnail4.png", "4", 10)

console.log(newProduct.getProducts());
console.log(newProduct.getProductById(1));
