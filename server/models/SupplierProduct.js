import mongoose from "mongoose";

const SupplierProductSchema = new mongoose.Schema({
    supplierId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier", required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", required: true
    },
    price: {
        type: Number,
        required: true
    },
    minQuantity: {
        type: Number,
        required: true,
        default: 1
    },
}, { versionKey: false });

export const SupplierProductModel = mongoose.model("SupplierProduct", SupplierProductSchema, "SupplierProducts");
