// routes/supplierProductRoutes.js
import express from "express";
import SupplierProductController from "../controllers/SupplierProduct.js";
import {authorizeSupplier} from '../middlewares.js'

const SupplierProductRouter = express.Router();

// הוספת מוצר לספק (הספק מזוהה מתוך הטוקן)
SupplierProductRouter.post("/", authorizeSupplier, SupplierProductController.addSupplierProduct);

// קבלת כל המוצרים של ספק לפי מזהה (למנהל למשל)
SupplierProductRouter.get("/",authorizeSupplier, SupplierProductController.getSupplierProducts);

export default SupplierProductRouter;
