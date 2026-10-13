
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import './CSS/global.css';
import './CSS/navbar.css';
import './CSS/footer.css';
import './CSS/admin-dashboard.css';
import './CSS/admin-layout.css';
import './CSS/create-complaints.css'
import './CSS/homepage.css';
import './CSS/manage-complaints.css';
import './CSS/my-complaints.css';
import './CSS/student-dashboard.css';
import './CSS/student-layout.css';




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);