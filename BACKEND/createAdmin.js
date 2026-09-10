require("dotenv").config();

const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        await connectDB();

        const email = "admin@campuscare.com";
        const password = "admin@876";

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

        console.log("Email:", email);
        console.log("Password:", password);

        process.exit(0);

    } catch (error) {
        console.error("Admin creation failed:", error);
        process.exit(1);
    }
};

createAdmin();