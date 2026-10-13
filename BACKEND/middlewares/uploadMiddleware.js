const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, PNG, and WEBP images are allowed."
            )
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = upload;
/*Purpose: Configures Multer to receive and validate image uploads before sending them to Cloudinary.

multer → middleware used to handle file uploads in Express.
memoryStorage() → keeps the uploaded image temporarily in memory (Buffer) instead of saving it on the server.
fileFilter → checks whether the uploaded file is an allowed image type.
allowedTypes → allows only JPG, PNG, and WEBP.
file.mimetype → tells us the uploaded file's type.
cb(null, true) → accepts the file.
cb(error) → rejects the file if its type is not allowed.
limits.fileSize → limits image size to 5 MB.*/