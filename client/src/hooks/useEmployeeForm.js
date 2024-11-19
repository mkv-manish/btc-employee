import { useState, useEffect } from "react";
import {
  validateName,
  validateEmail,
  validateMobile,
  validateImage,
} from "../utils/validations";

export const useEmployeeForm = (initialData = null) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    courses: [],
    image: null,
    isActive: false,
    employeeId: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        mobile: initialData.mobile || "",
        designation: initialData.designation || "HR",
        gender: initialData.gender || "M",
        courses: Array.isArray(initialData.courses) ? [...initialData.courses] : [],
        employeeId: initialData.employeeId || "",
        image: null,
        isActive: initialData.isActive || false,
      });
    }
  }, [initialData]);

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;
    let error = "";

    if (name === "image") {
      newValue = files[0];
      error = validateImage(files[0]);
    } else if (name === "mobile") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      newValue = value.slice(0, 10);
      error = validateMobile(newValue);
    } else {
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        default:
          break;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateFormData = () => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.mobile) errors.mobile = "Mobile is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.courses?.length) errors.courses = "A course must be selected";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    formData,
    setFormData,
    validationErrors,
    loading,
    setLoading,
    error,
    setError,
    handleChange,
    validateFormData,
  };
};
