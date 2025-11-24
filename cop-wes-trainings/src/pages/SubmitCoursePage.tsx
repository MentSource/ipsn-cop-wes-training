import React from "react";
import { useNavigate } from "react-router-dom";
import SubmitCourseForm, { CourseFormData } from "../components/SubmitCourseForm";
// import SubmitCourseForm from "./SubmitCourseForm";


const SubmitCoursePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: CourseFormData) => {
    console.log("✅ New Course Submitted:", data);

    // Optionally: Save to localStorage or backend API
    alert("✅ Course submitted successfully!");
    navigate("/"); // Return to homepage
  };

  return (
    <div className="submit-course-page">
      <div className="card form-card">
        <h2>Submit New Training Course</h2>
        <SubmitCourseForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default SubmitCoursePage;
