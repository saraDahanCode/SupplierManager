import express from 'express';
import OrderController from '../controllers/Order.js'
import { authorizeAdmin,authorizeSupplier } from '../middlewares.js';



const OrderRouter=express.Router();
// עובד ב"ה
OrderRouter.get('/mine',authorizeSupplier,OrderController.getSuppliersOrders);
// עובד ב"ה
OrderRouter.get('/',authorizeAdmin,OrderController.getAllOrders)
// עובד ב"ה
OrderRouter.patch('/confirm/:id',authorizeSupplier, OrderController.confirmOrder);
// עובד ב"ה
OrderRouter.post('/',authorizeAdmin,OrderController.addOrder);
// עובד ב"ה
OrderRouter.patch('/complete/:id', authorizeAdmin,OrderController.complateOrder);

export default OrderRouter;
