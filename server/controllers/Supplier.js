import { SupplierModel } from '../models/Supplier.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SupplierController = {
    addSupplier: async (req, res) => {
        const saltRounds = 10;
        console.log('addSupplier');

        const { companyName, email, password, contactPerson, address, phone } = req.body;

        if (!companyName || !email || !password || !address || !phone || !contactPerson)
            return res.status(400).json({
                success: false,
                message: "missing detail!"
            })


        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const existingPhone = await SupplierModel.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number already exists"
            });
        }


        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newSupplier = await SupplierModel.create({
                companyName,
                email,
                password: hashedPassword,
                contactPerson,
                address,
                phone
            });

            // להמיר לאובייקט רגיל ולהסיר את הסיסמה
            const supplierSafe = newSupplier.toObject();
            delete supplierSafe.password;

            res.status(200).json({
                success: true,
                message: "Supplier created successfully",
                data: supplierSafe,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    supplierLogin: async (req, res) => {
        console.log('login called from server');
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing phone or password"
            });
        }

        const supplier = await SupplierModel.findOne({ phone });

        // Check if supplier exists
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        //Check password 
        const isMatch = await bcrypt.compare(password, supplier.password);
        if (!isMatch || supplier.phone != phone) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone or password"
            });
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
            {
                supplierId: supplier._id,
                role: supplier.role,
                companyName: supplier.companyName
            },
            secret,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            data: {
                supplier: {
                    supplierId: supplier._id,
                    companyName: supplier.companyName,
                    email: supplier.email,
                    phone: supplier.phoneNumber,
                    role: supplier.role,
                    address: supplier.address
                },
                accessToken: token
            }
        });
    },
    getSuppliers: async (req, res) => {

        console.log("getSuppliers called!");

        try {

            const suppliers = await SupplierModel.find();

        
            return res.status(200).json({
                success: true,
                message: "suppliers retrieved successfully",
                data: suppliers
            });
        }
        catch (err) {

            return res.status(500).json({
                success: false,
                message: err.message,

            });
        }
    }

}



export default SupplierController;