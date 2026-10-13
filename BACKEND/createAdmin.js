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

/*Purpose: Creates an admin account in MongoDB or resets the password if the admin already exists.

dotenv → loads admin email/password from the .env file.
bcrypt → securely hashes the admin password.
connectDB() → connects the script to MongoDB.
Gets ADMIN_EMAIL and ADMIN_PASSWORD from .env.
Checks whether email/password are available; otherwise throws an error.
bcrypt.hash(password, 10) → converts the plain password into a hashed password before storing it.
Admin.findOne({ email }) → checks whether an admin with that email already exists.
If admin exists: updates the password and ensures the role is "admin".
If admin doesn't exist: creates a new admin with name, email, hashed password, and admin role.
process.exit(0) → exits successfully after completion.
process.exit(1) → exits with an error if something fails.*/