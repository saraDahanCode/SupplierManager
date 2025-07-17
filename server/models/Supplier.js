import mongoose from "mongoose";
import { Route } from "react-router-dom";

const SupplierSchema = new mongoose.Schema({

    companyName: {
        type: String
    }
    ,
    phone: {

        type: String

    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
  
    },
    contactPerson: {
        type: String,
        required: true
    },
    role:
    {
        type: String,
        default: "supplier",
        required: true,
    }
    ,address:
    {
        type: String,
        required: true
    },


}, { versionKey: false })
export const SupplierModel = mongoose.model("Supplier", SupplierSchema, "Suppliers"); 