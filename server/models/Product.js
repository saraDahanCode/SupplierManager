import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    minQuantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    price: {
        type: Number,
        required: true
    }
}, { versionKey: false })
export const ProductModel = mongoose.model("Product", ProductSchema,"Products"); 

// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   description: { type: String }, // אופציונלי, אפשר להוסיף בעתיד
// }, { versionKey: false });

// export const ProductModel = mongoose.model("Product", ProductSchema, "Products");
