const express = require('express');
const router = express.Router();
const 
{
  signup,
  // troy

   
} = require("../controller/admincontroller")



// router.get("/invest/investment", (req, res)=>{
//     res.render('invest/investment')
// })

// router.get("/invest/partnership", (req, res)=>{
//   res.render('invest/partnership')
// })

router.post('/suser/signup', signup);
// router.post('/user/troy', troy);

module.exports = router