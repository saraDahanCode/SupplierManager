import { Router } from "express";
import  OwnerController  from '../controllers/Owner.js'



const OwnerRouter = Router();

// עובד ב"ה
OwnerRouter.post("/login", OwnerController.ownerLogin);


export default OwnerRouter;