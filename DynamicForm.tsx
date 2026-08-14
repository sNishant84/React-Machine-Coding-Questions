import React, { useState } from "react";

function DynamicFormFields() {
  const [fields, setFields] = useState([
    { id: Date.now(), label: "Name", type: "text", value: "" },
  ]);

  // For the "add field" form
  const [newField, setNewField] = useState({ label: "", type: "text" });

  // Handle input change in the "add field" section
  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };

  // Add new dynamic field
  const addField = () => {
    if (!newField.label.trim()) return alert("Please enter a field label!");

    setFields([
      ...fields,
      { id: Date.now(), label: newField.label.trim(), type: newField.type, value: "" },
    ]);

    setNewField({ label: "", type: "text" }); // reset
  };

  // Remove a field
  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  // Handle input change for dynamic form fields
  const handleChange = (id, value) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    fields.forEach((f) => (data[f.label] = f.value));
    console.log("Form Data:", data);
    alert(JSON.stringify(data, null, 2));
  };

  // Render each field
  const renderField = (field) => {
    switch (field.type) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={(e) => handleChange(field.id, e.target.checked)}
          />
        );
      case "select":
        return (
          <select
            value={field.value}
            onChange={(e) => handleChange(field.id, e.target.value)}
          >
            <option value="">Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.label}
          />
        );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h2>🧩 Dynamic Form Builder</h2>

      {/* --- Add New Field Section --- */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
        }}
      >
        <h4>Add New Field</h4>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            name="label"
            placeholder="Field Label"
            value={newField.label}
            onChange={handleNewFieldChange}
            style={{ flex: 1, padding: "5px" }}
          />
          <select
            name="type"
            value={newField.type}
            onChange={handleNewFieldChange}
            style={{ padding: "5px" }}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="checkbox">Checkbox</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
          </select>
          <button type="button" onClick={addField}>
            ➕ Add
          </button>
        </div>
      </div>

      {/* --- Dynamic Form --- */}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
            <label style={{ width: "120px" }}>{field.label}</label>
            {renderField(field)}
            <button type="button" onClick={() => removeField(field.id)}>
              ❌
            </button>
          </div>
        ))}

        <div style={{ marginTop: "15px" }}>
          <button type="submit">✅ Submit</button>
        </div>
      </form>
    </div>
  );
}

export default DynamicFormFields;
