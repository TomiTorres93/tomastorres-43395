

const fs = require('fs')

class ProductManager {
    constructor(){
      this.path = "./productos.txt";
      this.id = 0
      this.products = []
    }


    addProduct = async (title, description, price, thumbnail, code, stock) => {
      
        const newProduct = {
            id: ++this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          };
      
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }    

    
    getProducts = async () => {
       const file = await fs.promises.readFile(this.path, "utf-8")
        console.log(JSON.parse(file))
    }    

    getProductById = async (id) => {
        const file = await fs.promises.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)
        if(!filesArr.find((product) => product.id === id)) {
            console.log("ID NOT FOUND.")
        } else {
            let fileByID =  filesArr.find((product) => product.id === id)
            console.log(fileByID) 
        }
      }

    deleteProduct = async (id) => {
        const file = await fs.promises.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)
        let deleteFilter = filesArr.filter(product => product.id !== id)          
        await fs.promises.writeFile(this.path, JSON.stringify(deleteFilter))  
        console.log("Deleted") 

    
    }

    updateProduct = async ( { id, ...product } ) => {
        await this.deleteProduct(id)
        const file = await fs.promises.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)

        let updatedProduct = [
            {id, ...product}, ...filesArr
        ]
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProduct))  
        console.log(updatedProduct)
        
    }

  }
  

  const manager = new ProductManager()



//   manager.addProduct("Title1", "Description1", 1, "thumbnail1.jpg", 111, 10)
//   manager.addProduct("Title2", "Description2", 2, "thumbnail2.jpg", 222, 20)
//   manager.addProduct("Title3", "Description3", 3, "thumbnail3.jpg", 333, 30)
//   manager.getProducts()
//   manager.getProductById(1)
//   manager.deleteProduct(2)
   manager.updateProduct({
  id: 1,
  title: 'Title1',
  description: 'Description1',
  price: 590,
  thumbnail: 'thumbnail1.jpg',
  code: 111,
  stock: 20
})