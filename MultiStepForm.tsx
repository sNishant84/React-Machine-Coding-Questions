import React, { useState } from "react";
import useMultiStepForm from "./useMultiStepForm";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  skills: [] as string[],
};

const TAB_NAMES = ["User Info", "Skills"];

// ---------- Step 1 ----------
const UserForm = ({ data, updateFields, errors }: any) => (
  <div style={{ display: "grid", gap: "0.5rem 1rem", gridTemplateColumns: "120px 1fr" }}>
    <label>First Name</label>
    <div>
      <input
        type="text"
        value={data.firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      {errors.firstName && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.firstName}</div>}
    </div>

    <label>Last Name</label>
    <div>
      <input
        type="text"
        value={data.lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      {errors.lastName && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.lastName}</div>}
    </div>

    <label>Email</label>
    <div>
      <input
        type="email"
        value={data.email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      {errors.email && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.email}</div>}
    </div>
  </div>
);

// ---------- Step 2 ----------
const SkillsForm = ({ data, updateFields, errors }: any) => {
  const SKILLS = ["React", "Node", "Python", "CSS", "HTML"];
  const toggleSkill = (skill: string) => {
    const newSkills = data.skills.includes(skill)
      ? data.skills.filter((s: string) => s !== skill)
      : [...data.skills, skill];
    updateFields({ skills: newSkills });
  };

  return (
    <div>
      <div style={{ marginBottom: "5px" }}>Select at least 2 skills:</div>
      <div style={{ display: "flex", gap: "10px" }}>
        {SKILLS.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              checked={data.skills.includes(skill)}
              onChange={() => toggleSkill(skill)}
            />{" "}
            {skill}
          </label>
        ))}
      </div>
      {errors.skills && <div style={{ color: "red", marginTop: "5px" }}>{errors.skills}</div>}
    </div>
  );
};

// ---------- MultiStepForm ----------
export default function MultiStepForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState<any>({});

  const stepsArray = [
    <UserForm key="user" data={data} updateFields={(f) => setData({ ...data, ...f })} errors={errors} />,
    <SkillsForm key="skills" data={data} updateFields={(f) => setData({ ...data, ...f })} errors={errors} />,
  ];

  const { step, Next, Prev, isFirst, isLast, currentStep, steps, setCurrentStep } = useMultiStepForm(stepsArray);

  // ---------- Step Validation ----------
  const validateStep = () => {
    let newErrors: any = {};

    if (currentStep === 0) {
      if (!data.firstName.trim()) newErrors.firstName = "Required";
      if (!data.lastName.trim()) newErrors.lastName = "Required";
      if (!data.email.trim()) newErrors.email = "Required";
      else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Invalid email";
    }

    if (currentStep === 1) {
      if (!data.skills || data.skills.length < 2) newErrors.skills = "Select at least 2 skills";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Check if step is valid for button disabling ----------
  const isStepValid = () => {
    if (currentStep === 0) {
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        /\S+@\S+\.\S+/.test(data.email)
      );
    }
    if (currentStep === 1) {
      return data.skills.length >= 2;
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep()) Next();
  };

  const handlePrev = () => {
    Prev();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateStep()) return;
    alert("Form submitted: " + JSON.stringify(data, null, 2));
  };

  return (
    <form
      style={{ width: "500px", padding: "20px", border: "1px solid black" }}
      onSubmit={handleSubmit}
    >
      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "15px" }}>
        {TAB_NAMES.map((name, idx) => (
          <div
            key={idx}
            style={{
              padding: "5px 15px",
              borderBottom: currentStep === idx ? "3px solid blue" : "1px solid gray",
              cursor: "pointer",
              fontWeight: currentStep === idx ? "bold" : "normal",
            }}
            onClick={() => setCurrentStep(idx)}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step}

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        {!isFirst && (
          <button type="button" onClick={handlePrev} style={{ marginRight: "10px" }}>
            Back
          </button>
        )}
        {!isLast ? (
          <button type="button" onClick={handleNext} disabled={!isStepValid()}>
            Next
          </button>
        ) : (
          <button type="submit" disabled={!isStepValid()}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
