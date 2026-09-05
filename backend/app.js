const express = require("express");
const connectDB = require("./config/db.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const AppError = require("./utils/AppError.js");

const authRoutes = require("./routes/authRoute.js");
const complaintRoutes = require("./routes/complaintRoute.js");
const adminRoutes = require("./routes/adminRoute.js");

const authMiddleware = require("./middlewares/authMiddleware.js");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================

app.use(express.json());

app.use(cookieParser());

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/admin", adminRoutes);

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.send("Campus Care Backend is running");
});

// ================= PROTECTED PROFILE ROUTE =================

app.get("/api/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to your Profile",
        user: req.user,
    });
});

// ================= 404 ROUTE =================

app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// ================= ERROR MIDDLEWARE =================

app.use(errorMiddleware);

// ================= START SERVER =================

const startServer = async () => {
    await connectDB();

    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
};

startServer();