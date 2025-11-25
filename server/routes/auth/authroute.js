const express = require('express');
const router = express.Router();
const { registeruser, loginuser, logout, authMiddleware } = require('../../controllers/auth/authcontroller');

// Registration route
router.post('/register', registeruser);
router.post('/login', loginuser);
router.post('/logout',logout);
router.get('/checkauth',authMiddleware,(req,res)=>{
    // console.log(req.user);
    res.status(200).json({
        success:true,
        message:"User is authenticated",
        user:req.user
    });
});

module.exports = router;  