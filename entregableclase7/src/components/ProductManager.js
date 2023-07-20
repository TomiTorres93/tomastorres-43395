
import { promises as fs } from "fs"

export default class ProductManager {
    constructor(){
      this.path = "productos.txt";
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
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }    

    
    getProducts = async () => {
       const file = await fs.readFile(this.path, "utf-8")
        return JSON.parse(file)
    }    

    getProductById = async (id) => {
        const file = await fs.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)
        if(!filesArr.find((product) => product.id === id)) {
            console.log("ID NOT FOUND.")
        } else {
            let fileByID =  filesArr.find((product) => product.id === id)
            console.log(fileByID) 
        }
      }

    deleteProduct = async (id) => {
        const file = await fs.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)
        let deleteFilter = filesArr.filter(product => product.id !== id)          
        await fs.writeFile(this.path, JSON.stringify(deleteFilter))  
        console.log("Deleted") 

    
    }

    updateProduct = async ( { id, ...product } ) => {
        await this.deleteProduct(id)
        const file = await fs.readFile(this.path, "utf-8")
        const filesArr = await JSON.parse(file)

        let updatedProduct = [
            {id, ...product}, ...filesArr
        ]
        await fs.writeFile(this.path, JSON.stringify(updatedProduct))  
        console.log(updatedProduct)
        
    }

  }

  //   manager.getProducts()
//   manager.getProductById(1)
//   manager.deleteProduct(2)
//    manager.updateProduct({
//   id: 1,
//   title: 'Title1',
//   description: 'Description1',
//   price: 590,
//   thumbnail: 'thumbnail1.jpg',
//   code: 111,
//   stock: 20
// })