const express = require('express');
const router = express.Router();
const 
{
  enter,
  logIn,
  signup,
  // troy

   
} = require("../controller/usercontroller")



// router.get("/invest/investment", (req, res)=>{
//     res.render('invest/investment')
// })

// router.get("/invest/partnership", (req, res)=>{
//   res.render('invest/partnership')
// })

router.post('/admin/signup', signup);
router.post('/admin/login', logIn);
router.post('/user/login', enter);
// router.post('/user/troy', troy);

module.exports = router