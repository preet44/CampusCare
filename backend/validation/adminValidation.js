// const adminLoginValidation=(req,res)=>{
//     const {email,password}=req.body;
//     if(!email || !password){
//         return res.status(400).json({
//             success:false,
//             message:"Email and password are required"
//         });
//     }
//     next();

// }                                 

const Joi = require("joi");

const adminLoginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});

module.exports = {
  adminLoginValidation,
};