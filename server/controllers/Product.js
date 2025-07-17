import { ProductModel } from '../models/Product.js';


const ProductController = {

    addProduct: async (req, res) => {
        console.log('addProduct');
        const supplierId = req.user.supplierId;

        const products = Array.isArray(req.body) ? req.body : [req.body];
        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No products provided"
            });
        }

        for (const product of products) {
            if (!product.productName || !product.minQuantity || !product.price) {
                return res.status(400).json({
                    success: false,
                    message: `missing details in product ${product.productName || 'unknown'}`
                });
            }
        }

        try {
            // Add supplierId to each product
            const productsWithSupplier = products.map(product => ({
                ...product,
                supplierId: supplierId
            }));

            const newProduct = await ProductModel.insertMany(productsWithSupplier);

            res.status(200).json({
                success: true,
                message: "Products created successfully",
                data: newProduct,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    getProducts: async (req, res) => {
        const role = req.user.role;
        try {
            let products;
            if (role === 'admin') {
                products = await ProductModel.find({});
            }
            if (role === 'supplier') {
                products = await ProductModel.find({ supplierId: req.user.supplierId });
            }

            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                data: products
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

}
export default ProductController;














// import { ProductModel } from "../models/Product.js";

// const ProductController = {
//     addProduct: async (req, res) => {
//         try {
//             const { name, description } = req.body;
//             if (!name)
//                 return res.status(400).json(
//                     {
//                         success: false,
//                         message: "Missing product name"
//                     });

//             const existing = await ProductModel.findOne({ name });
//             if (existing)
//                 return res.status(400).json({
//                     success: false,
//                     message: "Product already exists"
//                 }
//                 );

//             const product = ProductModel.create({ name, description });
//             return res.status(201).json({
//                 success: true,
//                 data: product,
//                 message: "Product created successfully"
//             }
//             );


//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// };
// export default ProductController;
