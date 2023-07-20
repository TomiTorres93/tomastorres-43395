import express from 'express'
import ProductManager from './components/ProductManager.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const PORT = 8099;

const manager = new ProductManager(); // Inicialización de ProductManager
const getProducts = manager.getProducts()

app.get('/', (req, res) => {
  res.send('ruta principal')

})

app.get('/products', async (req, res) => {
  let limit = parseInt(req.query.limit)
  if(!limit) return res.send(await getProducts)
  let products = await getProducts
  let productLimit = products.slice(0, limit)

  res.send(await productLimit)

})

app.get('/products/:id', async (req, res) => {
  let id = parseInt(req.params.id)
  let products = await getProducts
  let productById = products.find(e => e.id === id)

  res.send(await productById)

})


// const addProduct = manager.addProduct()

//   manager.addProduct("Title4", "Description4", 4, "thumbnail3.jpg", 333, 30)
//   manager.addProduct("Title5", "Description5", 5, "thumbnail3.jpg", 333, 30)
//   manager.addProduct("Title6", "Description6", 6, "thumbnail3.jpg", 333, 30)
//   manager.addProduct("Title7", "Description7", 7, "thumbnail3.jpg", 333, 30)
//   manager.addProduct("Title8", "Description8", 8, "thumbnail3.jpg", 333, 30)
//   manager.addProduct("Title9", "Description9", 9, "thumbnail3.jpg", 333, 30)
  






// puerto de escucha
app.listen(PORT, () => {
  console.log(`server port on: ${PORT}`)
})