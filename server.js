const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path")
const cors = require("cors");
const authRoutes = require("./routes/userroutes")
const mongoose = require("mongoose");
const session = require("express-session")
const bodyparser = require("body-parser")
// const User = require('./model/usermodel'); // Adjust the path to your model file
const router = express.Router();
const port = process.env.PORT||4000;


mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});






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


  



app.get('/', async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        if (req.session?.user?.id) {
            const userId = req.session.user.id;

            // Update the user's IP in the database
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { ip: ipAddress },
                { new: true }
            );

            if (!updatedUser) {
                console.log('User not found; IP logged only:', ipAddress);
            } else {
                console.log('IP captured and saved for user:', updatedUser);
            }
        } else {
            console.log('No logged-in user; IP logged only:', ipAddress);
        }

        // Render the index page
        res.render('index', { ipAddress }); // No redirection should happen here
    } catch (error) {
        console.error('Error capturing IP:', error);
        res.status(500).render('404'); // Render the 404 page or any fallback page
    }
});

app.get('/form',(req,res)=>{
    res.render('form')
});
app.get('/404',(req,res)=>{
    res.render('404')
});


app.listen(port,()=>{

    console.log(`Server up and running at http://localhost:${port}/`);
});