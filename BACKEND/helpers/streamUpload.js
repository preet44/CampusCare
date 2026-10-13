const cloudinary = require("../config/cloudinary");

const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "campuscare/complaints",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};

module.exports = streamUpload;
/*Purpose: This helper function takes an uploaded image's buffer and uploads it to Cloudinary using an upload stream.
cloudinary → imports our Cloudinary configuration.
streamUpload(buffer) → function that receives the image data.
Promise → allows us to use await while the upload is happening.
upload_stream() → uploads the image to Cloudinary through a stream instead of saving it first on the server.
folder → stores images inside campuscare/complaints folder in Cloudinary.
resource_type: "image" → tells Cloudinary that the uploaded file is an image.
reject(error) → reports upload failure.
resolve(result) → returns successful Cloudinary upload information.
stream.end(buffer) → sends the image buffer into the Cloudinary upload stream.

A Buffer is temporary data stored in memory that represents a file's raw binary data.
In our project:
Student selects image → Multer receives it → req.file.buffer temporarily holds the image data → streamUpload() sends it to Cloudinary.*/