import express from 'express';
import SupplierController from '../controllers/Supplier.js'
import { authorizeSupplier,authorizeAdmin } from '../middlewares.js';



const SupplierRouter=express.Router();


SupplierRouter.get('/',authorizeAdmin,SupplierController.getSuppliers)
SupplierRouter.post('/',SupplierController.addSupplier);
SupplierRouter.post('/login', SupplierController.supplierLogin);

export default SupplierRouter;
