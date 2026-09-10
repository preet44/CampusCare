const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const signup=async (req,res)=>{
    try{
        const{ name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exists",
            })
        }
       const hashPassword=await bcrypt.hash(password,10);
    //The number 10 in bcrypt.hash(password, 10) is the salt rounds (cost factor). 
    // It tells bcrypt How many times should I process the password before creating the final hash. A value of 10 is commonly used because it gives a good balance between security and performance
      
      const user=await User.create({
        name,
        email,
        password:hashPassword,
      });
      res.status(201).json({
        success:true,
        message:"Signup Successful",
        user,
      });

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    
}};

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({ email });
         
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password",
            });

        }
        const token=jwt.sign({
            id:user._id,
            email:user.email,
        },
       process.env.JWT_SECRET,
        {
            expiresIn:"1d",
        }
    );
    //jwt.sign() creates a JWT token. The first argument is the payload (the data we want inside the token, such as the user's ID and email).
    //  The second argument is the secret key used to sign and When a user sends the token back later, the server uses the same secret to verify that the token hasn't been modified.
    //  The third argument contains options like expiresIn, which specifies how long the token remains valid.
    
    res.cookie("token", token,{
       httpOnly:true,
       maxAge:24*60*60*1000, 
    });
    //res.cookie() stores the JWT token in the browser. "token" is the cookie name, token is the JWT value,
    //httpOnly: true makes the cookie accessible only to the server. Browser JavaScript cannot read or modify it, which helps protect the JWT token from being stolen by client-side scripts.
    // and maxAge specifies how long the cookie remains valid (here, 1 day).

    res.status(200).json({
        success:true,
        message:"Login Successful",
        user,
    })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });

    }
};
    const logout=async (req,res)=>{
        try{
            res.clearCookie("token"); //res.clearCookie("token") → Deletes the token cookie (JWT) from the browser.
            res.status(200).json({
                success:true,
                message:"Logout Successful"
            });
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }

module.exports={
    signup,
    login,
    logout,
};