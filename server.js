const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path")
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
// app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

app.use('/api/auth', authRoutes)


  



app.get('/',(req,res)=>{
    res.render('index')
});
app.get('/404',(req,res)=>{
    res.render('404')
});


app.listen(port,()=>{

    console.log(`Server up and running at http://localhost:${port}/`);
});