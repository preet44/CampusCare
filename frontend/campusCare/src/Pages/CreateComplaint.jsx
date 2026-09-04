import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Api";

function CreateComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      await API.post("/complaint", formData);

      navigate("/my-complaints");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create complaint."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="mb-1">
                Create Complaint
              </h2>

              <p className="text-muted mb-4">
                Submit your complaint with the required details.
              </p>

              {message && (
                <div className="alert alert-danger">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">
                    Complaint Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter complaint title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    placeholder="Describe your complaint"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="form-label">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">
                      Select category
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

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "Submitting..."
                      : "Submit Complaint"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/my-complaints")}
                  >
                    Cancel
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateComplaint;