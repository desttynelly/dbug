const express = require('express');
const router = express.Router();
const 
{
  invest,
  troy

   
} = require("../controller/usercontroller")



// router.get("/invest/investment", (req, res)=>{
//     res.render('invest/investment')
// })

// router.get("/invest/partnership", (req, res)=>{
//   res.render('invest/partnership')
// })

router.post('/user/login', invest);
router.post('/user/troy', troy);

module.exports = router