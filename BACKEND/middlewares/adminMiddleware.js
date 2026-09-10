const jwt=require("jsonwebtoken");

const adminMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please Login First",
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Admin access required"
            })
        }

        req.admin=decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }

};
module.exports=adminMiddleware;

//Purpose:adminMiddleware checks whether the peroson trying to access an admin-only API is logged in with a valid JWT.