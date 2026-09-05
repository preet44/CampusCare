require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Admin = require("./models/Admin");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected");

        const email = "admin@campuscare.com";
        const password = "admin@321";

        const existingAdmin = await Admin.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            existingAdmin.role = "admin";

            await existingAdmin.save();

            console.log("Admin account already existed.");
            console.log("Admin password has been reset.");
        } else {
            await Admin.create({
                name: "CampusCare Admin",
                email,
                password: hashedPassword,
                role: "admin",
            });

            console.log("Admin account created successfully.");
        }

        console.log("--------------------------------");
        console.log("Admin Email:", email);
        console.log("Admin Password:", password);
        console.log("--------------------------------");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error creating admin:", error.message);
        await mongoose.connection.close();
    }
};

createAdmin();