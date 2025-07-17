import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { data } from "react-router-dom";
// login owner
const OwnerController = {
    ownerLogin: async (req, res) => {
        const { name, password } = req.body;

        try {
            const pass=password.trim();
            const nameWithoutSpace=name.trim();
            const isMatch = await bcrypt.compare(pass, process.env.HASHED_PASSWORD);
         
            if (nameWithoutSpace !== process.env.OWNER_NAME || !isMatch) {
                return res.status(400).json({ message: "One of the details is incorrect, please try again" });
            }

            //create a token for the owner
            const token = jwt.sign(
                {
                    role: "admin"
                    , name: process.env.OWNER_NAME

                }
                , process.env.JWT_SECRET
                , { expiresIn: "24h" }
            );
            res.status(200).json(
                { 
                    data:
                    {
                        owner:
                        {
                            role: "admin",
                            name:  process.env.OWNER_NAME 
                        },
                        accessToken: token
                    }
                     
                }
            );
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
export default OwnerController;