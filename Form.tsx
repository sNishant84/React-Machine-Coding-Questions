import React, { useState, useEffect } from "react";


// I manage complex dynamic forms using schema-driven configuration with declarative showWhen rules, controlled state, and effects to clear dependent fields when they’re hidden.
const formConfig = [
    {
      type: "select",
      name: "isEmployed",
      label: "Are you employed?",
      options: ["yes", "no"],
      required: true,
    },
    {
      type: "text",
      name: "company",
      label: "Company Name",
      required: true,
      showWhen: (data) => data.isEmployed === "yes",
    },
    {
      type: "number",
      name: "salary",
      label: "Salary",
      required: true,
      showWhen: (data) => data.isEmployed === "yes",
    },
  ];
function DynamicForm() {
  const [formData, setFormData] = useState({
    isEmployed: "",
    company: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Clear dependent fields when hidden
  useEffect(() => {
    if (formData.isEmployed !== "yes") {
      setFormData((prev) => ({
        ...prev,
        company: "",
        salary: "",
      }));
    }
  }, [formData.isEmployed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    formConfig.forEach((field) => {
      if (field.showWhen && !field.showWhen(formData)) return;

      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitted Data:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const renderField = (field) => {
    if (field.showWhen && !field.showWhen(formData)) return null;

    switch (field.type) {
      case "select":
        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors[field.name] && <p style={{ color: "red" }}>{errors[field.name]}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && <p style={{ color: "red" }}>{errors[field.name]}</p>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map(renderField)}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;
