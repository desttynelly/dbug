const User = require("../model/usermodel");
const Troy = require("../model/formmodel");
// const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require('jsonwebtoken');






const invest = async (req, res) => {
    try {
      const { fullname, phoneNumber, nickname, email, password} = req.body;
  
      if (!fullname || !phoneNumber || !nickname || !email || !password) {
        res.render("invest/Investment/404", {user: req.session.user})
        // return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
      
      } else{
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



// const troy = async (req, res) => {
//   try {
//     const { troy,} = req.body;

//     if (!troy) {
//       res.render("invest/Investment/404", {user: req.session.user})
//       // return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
    
//     } else{
//       createuser()
  
      
//     }

//     async function createuser(){

//        // Create a new user with the provided data and the image URL if available
//     const user = new Troy({
//       troy,
//     });


//       try {
//           await user.save();
//           // Generate a JWT token
//           const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

//           req.session.user = {
//               id: user._id,
//               troy: user.troy,
             
              
//           };
//           res.render("404", {user: req.session.user})
          
          
//       } catch (error) {
//         res.render("404", {user: req.session.user})
//       }
//     }

   

    

   
//   } catch (error) {
//     console.error("Error during signup:", error);

//     if (!res.headersSent) {
//       res.status(500).json({ status: "Failed", message: error.message });
//     }
//   }

  


// };





module.exports =
{

  invest,
 
};