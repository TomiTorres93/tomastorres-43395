import express from 'express';
import cartController from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/', cartController.newCart);
cartRouter.get('/:cid', cartController.getCartProducts);
cartRouter.post('/:cid/product/:pid', cartController.addNewProduct);

export default cartRouter;