
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDB from './database.js';
import SupplierRouter from './routers/Supplier.js';
import OrderRouter from './routers/Order.js';
import OwnerRouter from './routers/Owner.js';
import ProductRouter from './routers/Product.js';
import { authenticateToken } from './middlewares.js'



const app = express()
const port = 5000;
connectDB();
app.use(cors());
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (
    (req.method === 'POST' && req.path.startsWith('/suppliers')) ||
    (req.method === 'POST' && req.path.startsWith('/owner')))
  {
    return next();
  }

  authenticateToken(req, res, next);
});



app.use('/suppliers', SupplierRouter)
app.use('/orders', OrderRouter)
app.use('/owner', OwnerRouter)
app.use('/products',ProductRouter)



app.listen(port, () =>
  console.log(`app listening on http://localhost:${port}`)
)
