import mongoose from "mongoose";
import { Route } from "react-router-dom";

const StoreOwnerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phoneNumber:
    {
        type: String

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["storeOwner", "admin"],
        default: "storeOwner",
        required: true,
    },
}, { versionKey: false })
export const SupplierModel = mongoose.model("StoreOwner", StoreOwnerSchema); 