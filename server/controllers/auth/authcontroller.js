const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');







const registeruser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Log the request body
        console.log('Request body:', req.body);

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });

        await user.save();
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Registration error:', error);  // Better error logging
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }   
};







const loginuser = async (req, res) => {
    const {email, password } = req.body;
    

    try {
        // Log the request body
        console.log('Request body:', req.body);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user exists
        const checkUser = await User.findOne({ email });
        
        if (!checkUser) {
            return res.json({
                success: false,
                message: 'User doesnt exists'
            });
        }
        const checkPassword=await bcrypt.compare(password, checkUser.password);
        if(!checkPassword){
            return res.json({
                success: false,
                message: 'Password is incorrect'
            });
        }
        const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email, role: checkUser.role ,name:checkUser.name},
            'client_secret_key',
            { expiresIn: '2h' }
            
        );

        res.cookie('token', token, { httpOnly: true,secure:false }).json({
            success: true,
            message: 'User logged in successfully',
            token: token,
            user: {
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                role:checkUser.role,
            }
        })
        
      
    } catch (error) {
        console.error('Registration error:', error);  // Better error logging
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }   
};



const logout=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:'User logged out successfully'
    }); 
}



const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  try {
    const decoded = jwt.verify(token, "client_secret_key");

    /*
      decoded contains:
      {
        id,
        email,
        role,
        name,
        iat,
        exp
      }
    */

    // ✅ normalize user object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};



module.exports = { registeruser,loginuser,logout,authMiddleware};