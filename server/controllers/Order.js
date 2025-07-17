import { OrderModel } from '../models/Order.js';
import { SupplierModel } from '../models/Supplier.js';


const OrderController = {
    // returns orders by supplier
    getSuppliersOrders: async (req, res) => {
        console.log("getSuppliersOrders called!")
        const id = req.user.supplierId;

        try {
           
            const orders = await OrderModel.find({ supplierId: id });
            if (!orders)
                return res.status(404).json({
                    success: false,
                    message: "Orders not found!"
                })

            return res.status(200).json({
                success: true,
                message: "Orders retrieved successfully",
                data: orders
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }

    },
    // returns all orders 
    getAllOrders: async (req, res) => {
        console.log("getAllOrders called!")

        try {

            const orders = await OrderModel.find({});
            if (!orders)
                return res.status(404).json({
                    success: false,
                    message: "Orders not found!"
                })

            return res.status(200).json({
                success: true,
                message: "Orders retrieved successfully",
                data: orders
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }

    },
    // Add new order
    addOrder: async (req, res) => {
        console.log('addOrder called');

        const { products, totalPrice, supplierId, companyName } = req.body;

        if (
            !products || !Array.isArray(products) ||
            !totalPrice || !supplierId || !companyName
        ) {
            return res.status(400).json({ error: "missing details" });
        }

        // בדיקת כל מוצר במערך
        for (const product of products) {
            if (
                !product.productId ||
                typeof product.productName !== 'string' ||
                !product.productName.trim() ||
                typeof product.quantity !== 'number'
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product data"
                });
            }
        }

        try {
            const supplier = await SupplierModel.findById(supplierId);
            if (!supplier) {
                return res.status(404).json({
                    success: false,
                    message: "Supplier not found"
                });
            }

            const newOrder = await OrderModel.create({
                supplierId,
                companyName,
                products,
                totalPrice,
                Orderdate: Date.now(),
                status: "pending"
            });

            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                data: newOrder
            });

        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },


    // confirm order by suppliers
    confirmOrder: async (req, res) => {
        const id = req.params.id;
        const supplierId = req.user.supplierId;
       
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing order ID"
            });
        }

        try {

            const order = await OrderModel.findById(id);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }
            // if supplier trying to confirm an order that is not his
            if (supplierId !== order.supplierId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have permission to confirm this order"
                });
            }

            order.status = "in process";
            await order.save();
            return res.status(200).json({
                success: true,
                message: "Order completed successfully",
                data: order
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // complate order by stor owner
    complateOrder: async (req, res) => {

        const id = req.params.id;
       
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing order ID"
            });
        }
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                id,
                { status: "completed" },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Order completed successfully",
                data: updatedOrder
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default OrderController;







// אם יישאר זמן - לעשות כתיב אחיד