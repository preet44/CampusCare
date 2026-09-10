const express = require("express");

const router = express.Router();


const authMiddleware =
    require("../middlewares/authMiddleware");

const upload =
    require("../middlewares/uploadMiddleware");

const validate =
    require("../validation/validate");


const {
    complaintValidation,

    updatedComplaint:
        updatedComplaintValidation,

} = require("../validation/complaintValidation");


const {

    createComplaint,

    getMyComplaint,

    getComplaintById,

    updatedComplaint:
        updateComplaint,

    deleteComplaint,

} = require("../controllers/complaintController");


/* =========================================================
   CREATE COMPLAINT
========================================================= */

router.post(

    "/create",

    authMiddleware,

    upload.single("image"),

    validate(complaintValidation),

    createComplaint

);


/* =========================================================
   GET MY COMPLAINTS
========================================================= */

router.get(

    "/my_complaints",

    authMiddleware,

    getMyComplaint

);


/* =========================================================
   GET COMPLAINT BY ID
========================================================= */

router.get(

    "/:id",

    authMiddleware,

    getComplaintById

);


/* =========================================================
   UPDATE COMPLAINT
========================================================= */

router.put(

    "/:id",

    authMiddleware,

    validate(updatedComplaintValidation),

    updateComplaint

);


/* =========================================================
   DELETE COMPLAINT
========================================================= */

router.delete(

    "/:id",

    authMiddleware,

    deleteComplaint

);


module.exports = router;