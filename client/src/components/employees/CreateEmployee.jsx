import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../lib/employeeSlice";
import { useEmployeeForm } from "../../hooks/useEmployeeForm";
import EmployeeForm from "./EmployeeForm";

const CreateEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        formData,
        validationErrors,
        loading,
        error,
        setError,
        handleChange,
        validateFormData,
    } = useEmployeeForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) return;

        const formDataToSend = new FormData();

        // Append all form data fields
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
            await dispatch(createEmployee(formDataToSend)).unwrap();
            navigate("/employees");
        } catch (err) {
            setError(err.message || "Failed to create employee");
        }
    };

    return (
        <div className="container py-8">
            <div className="max-w-2xl mx-auto">
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Create Employee</h2>
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
                            loading ? "Creating..." : "Create Employee"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
