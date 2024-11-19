import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../../lib/employeeSlice";
import { Pencil, Trash2, Plus } from "lucide-react";
import EmployeeAvatar from "../common/EmployeeAvatar";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list: employees, loading } = useSelector(
        (state) => state.employees
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to show per page
    const [sortConfig, setSortConfig] = useState({
        key: "employeeId",
        direction: "asc",
    });

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await dispatch(deleteEmployee(id)).unwrap();
                dispatch(fetchEmployees());
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getFilteredAndSortedEmployees = () => {
        let filtered =
            employees?.data?.filter((employee) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    employee.employeeId.toLowerCase().includes(searchLower) ||
                    employee.name.toLowerCase().includes(searchLower) ||
                    employee.email.toLowerCase().includes(searchLower) ||
                    employee.mobile.includes(searchTerm)
                );
            }) || [];

        return filtered.sort((a, b) => {
            if (sortConfig.key === "createdAt") {
                return sortConfig.direction === "asc"
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt);
            }

            let aValue = a[sortConfig.key].toString().toLowerCase();
            let bValue = b[sortConfig.key].toString().toLowerCase();

            if (sortConfig.direction === "asc") {
                return aValue.localeCompare(bValue);
            }
            return bValue.localeCompare(aValue);
        });
    };

    const filteredAndSortedEmployees = getFilteredAndSortedEmployees();
    const totalPages = Math.ceil(
        filteredAndSortedEmployees.length / itemsPerPage
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSortedEmployees.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
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
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Employees</h2>
                    <button
                        onClick={() => navigate("/employees/create")}
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search employees by name, email, number and id..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th
                                    onClick={() => handleSort("employeeId")}
                                    className="text-left p-4 text-muted font-medium cursor-pointer hover:bg-gray-50"
                                >
                                    ID{" "}
                                    {sortConfig.key === "employeeId" && (
                                        <span>
                                            {sortConfig.direction === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Image
                                </th>
                                <th
                                    onClick={() => handleSort("name")}
                                    className="text-left p-4 text-muted font-medium cursor-pointer hover:bg-gray-50"
                                >
                                    Name{" "}
                                    {sortConfig.key === "name" && (
                                        <span>
                                            {sortConfig.direction === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    onClick={() => handleSort("email")}
                                    className="text-left p-4 text-muted font-medium cursor-pointer hover:bg-gray-50"
                                >
                                    Email{" "}
                                    {sortConfig.key === "email" && (
                                        <span>
                                            {sortConfig.direction === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Mobile No
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Designation
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Gender
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Course
                                </th>
                                <th
                                    onClick={() => handleSort("createdAt")}
                                    className="text-left p-4 text-muted font-medium cursor-pointer hover:bg-gray-50"
                                >
                                    Created At{" "}
                                    {sortConfig.key === "createdAt" && (
                                        <span>
                                            {sortConfig.direction === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </span>
                                    )}
                                </th>
                                <th className="text-left p-4 text-muted font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((employee) => (
                                <tr
                                    key={employee._id}
                                    className="border-b border-border hover:bg-card-hover transition-colors"
                                >
                                    <td className="p-4">
                                        {employee.employeeId}
                                    </td>
                                    <td className="p-4">
                                        <EmployeeAvatar
                                            imageUrl={employee.imageUrl}
                                            name={employee.name}
                                            className="w-10 h-10"
                                        />
                                    </td>
                                    <td className="p-4">{employee.name}</td>
                                    <td className="p-4">{employee.email}</td>
                                    <td className="p-4">{employee.mobile}</td>
                                    <td className="p-4">
                                        {employee.designation}
                                    </td>
                                    <td className="p-4">
                                        {employee.gender === "M"
                                            ? "Male"
                                            : "Female"}
                                    </td>
                                    <td className="p-4">
                                        {Array.isArray(employee.courses)
                                            ? employee.courses.join(", ")
                                            : ""}
                                    </td>
                                    <td className="p-4">
                                        {new Date(
                                            employee.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/employees/${employee._id}/edit`
                                                    )
                                                }
                                                className="p-2 hover:bg-card-hover rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(employee._id)
                                                }
                                                className="p-2 hover:bg-card-hover rounded-lg transition-colors text-red-500"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4 px-4">
                    <div className="text-sm text-muted">
                        Showing {indexOfFirstItem + 1} to{" "}
                        {Math.min(
                            indexOfLastItem,
                            getFilteredAndSortedEmployees().length
                        )}{" "}
                        of {getFilteredAndSortedEmployees().length} entries
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${
                                currentPage === 1
                                    ? "bg-gray-100 text-black"
                                    : "bg-primary text-white hover:bg-primary/90"
                            }`}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === index + 1
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-black hover:bg-gray-200"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${
                                currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-primary text-white hover:bg-primary/90"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
