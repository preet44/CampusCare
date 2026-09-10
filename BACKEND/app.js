require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");

const authRoutes = require("./routes/authRoute.js");
const complaintRoutes = require("./routes/complaintRoute.js");
const adminRoutes = require("./routes/adminRoute.js");

const authMiddleware = require("./middlewares/authMiddleware.js");

const app = express();

/* =========================================================
   CORS
========================================================= */

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


/* =========================================================
   GENERAL MIDDLEWARE
========================================================= */

app.use(express.json());

app.use(cookieParser());


/* =========================================================
   ROUTES
========================================================= */

app.use("/api/auth", authRoutes);

app.use("/api/complaint", complaintRoutes);

app.use("/api/admin", adminRoutes);


/* =========================================================
   HOME ROUTE
========================================================= */

app.get("/", (req, res) => {
    res.send("Campus Care Backend is running");
});


/* =========================================================
   PROFILE ROUTE
========================================================= */

app.get(
    "/api/profile",
    authMiddleware,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome to your Profile",
            user: req.user,
        });
    }
);


/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(errorMiddleware);


/* =========================================================
   START SERVER
========================================================= */

const startServer = async () => {
    try {
        await connectDB();

        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        });

    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();