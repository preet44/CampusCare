const express=require("express");
const connectDB=require("./config/db.js");
const errorMiddleware=require("./middlewares/errorMiddleware.js");
const AppError=require("./utils/AppError.js");


const authRoutes=require("./routes/authRoute.js");
const complaintRoutes=require("./routes/complaintRoute.js");
const adminRoutes=require("./routes/adminRoute.js");

const authMiddleware=require("./middlewares/authMiddleware.js")
require("dotenv").config();
/*require("dotenv")  => Imports the dotenv package.
dotenv loads environment variables from a .env file.
.config() => Reads the .env file.
Makes all variables available in process.env.*/

const cookieParser=require("cookie-parser");

const app=express();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());// res.cookie() puts the cookie into the browser. cookie-parser is a middleware. reads that cookie when the browser sends it back to the server.

app.use("/api/auth",authRoutes);  //I don't understand this line anymore
app.use("/api/complaint",complaintRoutes);
app.use("/api/admin", adminRoutes);

//HOME ROUTE
app.get("/",(req,res)=>{
    res.send("Campus Care Backend is running");
});

//PROTECTED PROFILE ROUTE 
app.get("/api/profile",authMiddleware,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to your Profile",
        user:req.user,
    })
});
/*This is the Profile API.When the user visits:GET /api/profile
the server first checks: "Is this user logged in?"
That's why we write: authMiddleware
If the user is not logged in → stop the request.
If the user is logged in → go to the next function.
That is done by:next();
user:req.user  =>Contains the logged-in user's information.
 then Returns the profile details.*/


//start the server
const startServer=async()=>{
    await connectDB();
    
    app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
});

}
startServer();
app.get("/api/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to your Profile",
    user: req.user,
  });
});
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorMiddleware);

