const express = require("express");
require('dotenv').config();
const app = express();
const Just = require("./model/usermodel");
const Signup = require("./model/signup");
const path = require("path")
const cors = require("cors");
const authRoutes = require("./routes/userroutes")
const mongoose = require("mongoose");
const session = require("express-session")
const bodyparser = require("body-parser");
const { signup } = require("./controller/usercontroller");
// const User = require('./model/usermodel'); // Adjust the path to your model file
const router = express.Router();
const port = process.env.PORT||4000;


mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});

mongoose.set('debug', true);




// middle ware
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.set("views", path.join(__dirname, 'views'))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
  }));

app.use('/api/auth', authRoutes)


  
// app.use((req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     res.set('Pragma', 'no-cache');
//     res.set('Expires', '0');
//     next();
// });



// app.get('/', async (req, res) => {
//     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     try {
//         if (req.session?.user?.id) {
//             const userId = req.session.user.id;

//             // Update the user's IP in the database
//             const updatedUser = await User.findByIdAndUpdate(
//                 userId,
//                 { ip: ipAddress },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 console.log('User not found; IP logged only:', ipAddress);
//             } else {
//                 console.log('IP captured and saved for user:', updatedUser);
//             }
//         } else {
//             console.log('No logged-in user; IP logged only:', ipAddress);
//         }

//         // Render the index page
//         res.render('index', { ipAddress }); // No redirection should happen here
//     } catch (error) {
//         console.error('Error capturing IP:', error);
//         res.status(500).render('404'); // Render the 404 page or any fallback page
//     }
// });


app.get("/api/location", async (req, res) => {
    const ip = req.query.ip;
    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`); // Must be HTTP
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch location data" });
    }
});


app.get('/',(req,res)=>{
    res.render('index')
});
app.get('/404',(req,res)=>{
    res.render('404')
});
app.get('/form',(req,res)=>{
    res.render('form')
});



app.get('/login', (req, res) => {
    res.render('admin/html/adminsignin'); // Render investment.ejs
});

app.get('/signup', (req, res) => {
    res.render('404'); // Render investment.ejs
});

app.get('/api/auth/admin/signup', (req, res) => {

     // Check if session exists
     if (!req.session.user) {
        return res.redirect("/login"); // Redirect to login page
    }
    
    res.render('admin/html/adminsignin'); // Render investment.ejs
});

app.get('/api/auth/admin/login', (req, res) => {

     // Check if session exists
     if (!req.session.user) {
        return res.redirect("/login"); // Redirect to login page
    }

    res.render('admin/html/adminsignin'); // Render investment.ejs
});


app.get("/users/user", async (req, res) => {
    try {
        // Check if session exists
        if (!req.session.user) {
            return res.redirect("/login"); // Redirect to login page
        }

        // Fetch user data
        const signup = await Just.find(); 
        res.render("users/user", { signup });
    } catch (error) {
        console.error("Error fetching pictures:", error);
        res.render("err0r", { Pic: [] });
    }
});


app.listen(port,()=>{

    console.log(`Server up and running at http://localhost:${port}/`);
});