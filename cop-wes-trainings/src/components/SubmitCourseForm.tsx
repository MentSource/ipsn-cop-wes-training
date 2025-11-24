import React, { useState } from "react";

export interface CourseFormData {
  format: string;
  category: string;
  title: string;
  organization: string;
  status: string;
  link: string;
}

interface SubmitCourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
}

const SubmitCourseForm: React.FC<SubmitCourseFormProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState<CourseFormData>({
    format: "",
    category: "",
    title: "",
    organization: "",
    status: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course Format:
        <input name="format" value={form.format} onChange={handleChange} required />
      </label>

      <label>
        Category:
        <input name="category" value={form.category} onChange={handleChange} required />
      </label>

      <label>
        Course Title:
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Organization:
        <input name="organization" value={form.organization} onChange={handleChange} required />
      </label>

      <label>
        Status:
        <input name="status" value={form.status} onChange={handleChange} />
      </label>

      <label>
        Link:
        <input type="url" name="link" value={form.link} onChange={handleChange} required />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-btn">Submit</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SubmitCourseForm;
