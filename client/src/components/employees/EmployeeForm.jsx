const EmployeeForm = ({
    formData,
    validationErrors,
    loading,
    handleChange,
    handleSubmit,
    submitButtonText,
    currentImageUrl = null,
}) => {
    const handleCourseChange = (e) => {
        const { name, checked } = e.target;
        let updatedCourses = [...(formData.courses || [])];

        if (checked && !updatedCourses.includes(name)) {
            updatedCourses.push(name);
        } else if (!checked) {
            updatedCourses = updatedCourses.filter((course) => course !== name);
        }

        handleChange({
            target: {
                name: "courses",
                value: updatedCourses,
            },
        });
    };

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground/80">
                        Basic Information
                    </h3>

                    <div>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${
                                validationErrors.name ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {validationErrors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${
                                validationErrors.email ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="form-label">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter 10 digit mobile number"
                            className={`form-input ${
                                validationErrors.mobile ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {validationErrors.mobile && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.mobile}
                            </p>
                        )}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground/80">
                        Additional Details
                    </h3>

                    <div>
                        <label className="form-label">Designation</label>
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Gender</label>
                        <div className="flex gap-4 mt-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={formData.gender === "M"}
                                    onChange={handleChange}
                                    className="form-radio"
                                    required
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={formData.gender === "F"}
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                        {validationErrors.gender && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.gender}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="form-label">Courses</label>
                        <div className="flex gap-4 mt-2">
                            {["MCA", "BCA", "BSC"].map((course) => (
                                <label
                                    key={course}
                                    className="inline-flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        name={course}
                                        checked={
                                            Array.isArray(formData.courses) &&
                                            formData.courses.includes(course)
                                        }
                                        onChange={handleCourseChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">{course}</span>
                                </label>
                            ))}
                        </div>
                        {validationErrors.courses && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.courses}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Image Section */}
            <div className="mt-6">
                <label className="form-label">Profile Image</label>
                <div className="flex items-center gap-4">
                    {currentImageUrl ? (
                        <img
                            src={`${API_URL}${currentImageUrl}`}
                            alt="Current profile"
                            className="w-24 h-24 object-cover rounded-lg border border-border"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-secondary flex justify-center items-center rounded-lg border border-border">
                            No Image
                        </div>
                    )}
                    <div className="flex-1">
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/jpeg,image/png,image/jpg"
                            className={`form-input ${
                                validationErrors.image ? "border-red-500" : ""
                            }`}
                        />
                        {validationErrors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.image}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full"
                >
                    {submitButtonText}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
