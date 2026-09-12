require("dotenv").config();

const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        await connectDB();

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        // Check if credentials are available
        if (!email || !password) {
            throw new Error(
                "ADMIN_EMAIL and ADMIN_PASSWORD are required in .env"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            existingAdmin.role = "admin";

            await existingAdmin.save();

            console.log("Admin password reset successfully.");
        } else {
            await Admin.create({
                name: "CampusCare Admin",
                email,
                password: hashedPassword,
                role: "admin",
            });

            console.log("Admin created successfully.");
        }

        console.log("Admin email:", email);
        console.log("Admin password: [hidden]");

        process.exit(0);

    } catch (error) {
        console.error("Admin creation failed:", error);
        process.exit(1);
    }
};

createAdmin();