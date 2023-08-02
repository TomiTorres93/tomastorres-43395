import express from 'express';
import productsRouter from './routes/products.routes.js';
import handlebars from 'express-handlebars'
import cartRouter from './routes/cart.routes.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsController from './controllers/productsController.js';

const app = express();
const PORT = 8090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de .hbs
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);



app.use(express.static(__dirname + '/public'))


app.get("/", async (req, res) => {
  try {
    const productsResult = await productsRouter(req, res);
    res.render("home", { products: productsResult });
  } catch (error) {
    res.status(500).send("Error al renderizar");
  }
});

// Ruta para productos en tiempo real
app.get('/realtimeproducts', async (req, res) => {
  try {
    res.render('realTimeProducts');
  } catch (error) {
    res.status(500).send('Error al renderizar');
  }
});


const httpServer = app.listen(PORT, () => {
  console.log(`server run on port: ${PORT}`);
})



const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  try {
    const productsResult = await productsController.getAllProducts();
    socket.emit('realtimeproducts', productsResult);
  } catch (error) {
    console.error('Error', error);
  }
});


