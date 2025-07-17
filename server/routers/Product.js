import ProductController from "../controllers/Product.js";
import express from 'express';
import { authorizeSupplier ,authorizeAdmin} from '../middlewares.js';


const ProductRouter=express.Router();
// עובד ב"ה
ProductRouter.post('/',authorizeSupplier,ProductController.addProduct);
// עובד ב"ה
ProductRouter.get('/',ProductController.getProducts)


export default ProductRouter;
