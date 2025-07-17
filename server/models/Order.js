import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Supplier"
    },
    companyName:
    {
        type: String,
        required : true
    }
    ,
    products:
        [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                  
                },
                productName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1,
                }
            }
        ],
    totalPrice:
    {
        type: Number,
        required: true
    },
    Orderdate:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    status:
    {
        type: String,
        enum: ["pending", "in process", "completed"],
        default: "pending",
        required: true,
    }
}, { versionKey: false })
export  const OrderModel = mongoose.model("Order", OrderSchema, "Orders"); 