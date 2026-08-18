import React, { useState } from 'react';

const formConfig = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: value => value.length >= 3 || "First name must be at least 3 characters",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      validation: value => value.length >= 3 || "Last name must be at least 3 characters",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
      validation: value => /\S+@\S+\.\S+/.test(value) || "Please enter a valid email",
    },
    {
      type: "checkbox",
      name: "terms",
      label: "I agree to the terms and conditions",
      required: true,
      validation: value => value === true || "You must agree to the terms",
    },
    {
      type: "select",
      name: "country",
      label: "Country",
      options: ["USA", "Canada", "UK", "Australia"],
      required: true,
      validation: value => value !== "" || "Please select a country",
    },
  ];
  

function DynamicForm({ config }) {
  const [formData, setFormData] = useState(
    config.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    config.forEach(field => {
      const { name, validation, required } = field;
      const value = formData[name];

      if (required && !value) {
        newErrors[name] = `${field.label} is required`;
      } else if (validation && typeof validation === "function") {
        const errorMessage = validation(value);
        if (errorMessage !== true) {
          newErrors[name] = errorMessage;
        }
      }
    });

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const renderField = (field) => {
    const { type, name, label, placeholder, options } = field;

    switch (type) {
      case "text":
      case "email":
        return (
          <div key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              placeholder={placeholder}
            />
            {errors[name] && <div style={{ color: "red" }}>{errors[name]}</div>}
          </div>
        );
      case "checkbox":
        return (
          <div key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleChange}
              />
              {label}
            </label>
            {errors[name] && <div style={{ color: "red" }}>{errors[name]}</div>}
          </div>
        );
      case "select":
        return (
          <div key={name}>
            <label>{label}</label>
            <select name={name} value={formData[name]} onChange={handleChange}>
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[name] && <div style={{ color: "red" }}>{errors[name]}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map((field) => renderField(field))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;
