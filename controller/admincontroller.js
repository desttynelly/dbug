const mongoose = require('mongoose');
const Signup = require("../model/signup");
// const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require('jsonwebtoken');





const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
        }

        let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

        // If an image file is provided, upload it to Cloudinary
        if (req.file) {
            try {
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    });
                    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
                });

                imageURL = result.secure_url; 
            } catch (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
        }

        // Call createUser function after processing the image
        await createUser(email, password, imageURL, req, res);

    } catch (error) {
        console.error("Error during signup:", error);

        if (!res.headersSent) {
            res.status(500).json({ status: "Failed", message: error.message });
        }
    }
};

async function createUser(email, password, imageURL, req, res) {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Signup({
            email,
            password: hashedPassword,
            profileImage: imageURL, // Assuming you have this field in your schema
        });

        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'Adain', { expiresIn: '1h' });

        req.session.user = {
            id: user._id,
            email: user.email,
            profileImage: user.profileImage,
        };

        res.render("users/user", { user: req.session.user });

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
}



module.exports =
{

    signup,
    createUser
 
};