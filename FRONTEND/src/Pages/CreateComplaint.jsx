import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Api";
import Message from "../Components/Message";
import { motion } from "framer-motion";

function CreateComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Only JPG, PNG, and WEBP images are allowed."
      );

      e.target.value = "";
      setImage(null);
      setPreview("");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");

      e.target.value = "";
      setImage(null);
      setPreview("");

      return;
    }

    setMessage("");
    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (image) {
        data.append("image", image);
      }

      await API.post("/complaint/create", data);

      setMessage("Complaint submitted successfully.");

      setFormData({
        title: "",
        description: "",
        category: "",
      });

      setImage(null);
      setPreview("");

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to submit complaint."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container create-complaint-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <motion.div
        className="create-complaint-header"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        <h2>Create Complaint</h2>

        <p>
          Report an issue on campus and help us improve
          your college experience.
        </p>
      </motion.div>


      {/* ================================
          MESSAGE
      ================================= */}

      <Message message={message} />


      {/* ================================
          FORM CARD
      ================================= */}

      <motion.div
        className="create-complaint-card"
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* ================================
                TITLE
            ================================= */}

            <div className="create-form-group">

              <label
                htmlFor="title"
                className="create-form-label"
              >
                Complaint Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                className="form-control create-form-control"
                placeholder="Enter complaint title"
                value={formData.title}
                onChange={handleChange}
                minLength="5"
                maxLength="100"
                required
              />

              <div className="create-form-help">
                Minimum 5 characters.
              </div>

            </div>


            {/* ================================
                CATEGORY
            ================================= */}

            <div className="create-form-group">

              <label
                htmlFor="category"
                className="create-form-label"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                className="form-select create-form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select a category
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="Canteen">
                  Canteen
                </option>

                <option value="Library">
                  Library
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>


            {/* ================================
                DESCRIPTION
            ================================= */}

            <div className="create-form-group">

              <label
                htmlFor="description"
                className="create-form-label"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                className="form-control create-form-control create-description"
                rows="6"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                minLength="10"
                maxLength="1000"
                required
              />

              <div className="create-form-help">
                Minimum 10 characters and maximum 1000
                characters.
              </div>

            </div>


            {/* ================================
                IMAGE UPLOAD
            ================================= */}

            <div className="create-form-group">

              <label
                htmlFor="image"
                className="create-form-label"
              >
                Attach Image

                <span className="create-optional">
                  {" "}
                  (Optional)
                </span>
              </label>

              <input
                type="file"
                id="image"
                className="form-control create-form-control"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />

              <div className="create-form-help">
                Upload a photo related to the complaint.
                JPG, PNG or WEBP. Maximum 5 MB.
              </div>


              {/* ================================
                  IMAGE PREVIEW
              ================================= */}

              {preview && (
                <motion.div
                  className="create-image-preview"
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                >
                  <p className="create-preview-title">
                    Image Preview
                  </p>

                  <div className="create-preview-container">

                    <img
                      src={preview}
                      alt="Complaint preview"
                      className="create-preview-image"
                    />

                  </div>
                </motion.div>
              )}

            </div>


            {/* ================================
                BUTTONS
            ================================= */}

            <div className="create-form-actions">

              <button
                type="button"
                className="btn btn-outline-secondary create-cancel-btn"
                onClick={() => navigate("/my-complaints")}
                disabled={loading}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="btn btn-primary create-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>

                    Submitting...
                  </>
                ) : (
                  "Submit Complaint"
                )}
              </button>

            </div>

          </form>

        </div>
      </motion.div>

    </div>
  );
}

export default CreateComplaint;