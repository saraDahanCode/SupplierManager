// import mongoose from "mongoose";

// const StockSchema = new mongoose.Schema({

//     product:
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     currentQauntity:
//     {
//         type: Number,
//         required: true
//     },
//     minQuantity:
//     {
//         type: Number,
//         required: true
//     }
// }, { versionKey: false })
// export const StockModel = mongoose.model("Stock", StockSchema, "Stocks"); 

import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    currentQuantity: {
        type: Number,
        required: true
    },
    minQuantity: {
        type: Number,
        required: true
    },
}, { versionKey: false });

export const StockModel = mongoose.model("Stock", StockSchema, "Stocks");
