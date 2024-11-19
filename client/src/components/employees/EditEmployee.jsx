import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeById, updateEmployee } from "../../lib/employeeSlice";
import { useEmployeeForm } from "../../hooks/useEmployeeForm";
import EmployeeForm from "./EmployeeForm";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentEmployee, loading: fetchLoading } = useSelector(
        (state) => state.employees
    );

    const {
        formData,
        validationErrors,
        loading,
        setLoading,
        error,
        setError,
        handleChange,
        validateFormData,
        setFormData,
    } = useEmployeeForm(currentEmployee);

    useEffect(() => {
        dispatch(fetchEmployeeById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (currentEmployee) {
            setFormData({
                name: currentEmployee.data.name || "",
                email: currentEmployee.data.email || "",
                mobile: currentEmployee.data.mobile || "",
                designation: currentEmployee.data.designation || "HR",
                gender: currentEmployee.data.gender || "M",
                courses: Array.isArray(currentEmployee.data.courses)
                    ? [...currentEmployee.data.courses]
                    : [],
                employeeId: currentEmployee.data.employeeId || "",
                image: currentEmployee.data.imageUrl || null,
                isActive: currentEmployee.data.isActive || false,
            });
        }
    }, [currentEmployee, setFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) return;

        setLoading(true);
        setError(null);

        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "image" && !formData[key]) return;
            if (key === "courses") {
                formData.courses.forEach((course) => {
                    formDataToSend.append("courses", course);
                });
            } else if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            await dispatch(
                updateEmployee({
                    id,
                    formData: formDataToSend,
                })
            ).unwrap();
            navigate("/employees");
        } catch (err) {
            setError(err.message || "Failed to update employee");
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="container py-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="max-w-2xl mx-auto">
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Edit Employee</h2>
                        <button
                            onClick={() => navigate("/employees")}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <EmployeeForm
                        formData={formData}
                        validationErrors={validationErrors}
                        loading={loading}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        submitButtonText={
                            loading ? "Updating..." : "Update Employee"
                        }
                        currentImageUrl={currentEmployee?.data.imageUrl}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;
