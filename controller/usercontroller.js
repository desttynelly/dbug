const User = require("../model/usermodel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require('jsonwebtoken');






const invest = async (req, res) => {
    try {
      const { fullname, phoneNumber, nickname, email, password} = req.body;
  
      if (!fullname || !phoneNumber || !nickname || !email || !password) {
        res.render("invest/Investment/404", {user: req.session.user})
        // return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      }
  
      let imageURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  
      // If an image file is provided
      if (req.file) {
        // Wrap the Cloudinary upload in a promise
       
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
           imageURL = result.secure_url;

        
             
           createuser()

          });
          
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
      }else{
        createuser()
    
        
      }

      async function createuser(){

         // Create a new user with the provided data and the image URL if available
      const user = new User({
        fullname,
        phoneNumber,
        nickname,
        email,
        password,
      });


        try {
            await user.save();
            // Generate a JWT token
            const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

            req.session.user = {
                id: user._id,
                email: user.email,
                fullname: user.fullname, 
                phoneNumber: user.phoneNumber,
                nickname: user.nickname,
                password: user.password,
               
                
                // Add other fields as needed
            };
            res.render("404", {user: req.session.user})
            // res.status(200).json({
            //     status: "Success",
            //     message: "Login successful",
            //     token,
            //     user: {
            //         id: user._id,
            //         email: user.email,
            //         fullname: user.fullname,
            //         phoneNumber: user.phoneNumber,
            //         country: user.country,
            
            //         notificationsCount: user.notificationsCount,
            //         referralCount: user.referralCount,
            //         referredUsers: user.referredUsers,
            //         points: user.points,
            //         accountName: user.accountName
            //     }
            // });
            
        } catch (error) {
          res.render("404", {user: req.session.user})
            // console.error('Error saving product:', error);
            //     res.status(500).send('Error saving product');
        }
      }
  
     
  
      
  
     
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Handle errors and ensure only one response
      if (!res.headersSent) {
        res.status(500).json({ status: "Failed", message: error.message });
      }
    }

    

 
};





module.exports =
{

  invest,
 
};