import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../lib/employeeSlice";
import EmployeeAvatar from "./common/EmployeeAvatar";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { list: employees, loading } = useSelector(
        (state) => state.employees
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, []);

    const stats = {
        totalEmployees: employees?.data?.length || 0,
        activeEmployees:
            employees?.data?.filter((emp) => emp.isActive)?.length || 0,
        departments: {
            HR:
                employees?.data?.filter((emp) => emp.designation === "HR")
                    ?.length || 0,
            Manager:
                employees?.data?.filter((emp) => emp.designation === "Manager")
                    ?.length || 0,
            Sales:
                employees?.data?.filter((emp) => emp.designation === "Sales")
                    ?.length || 0,
        },
        genderDistribution: {
            male:
                employees?.data?.filter((emp) => emp.gender === "M")?.length ||
                0,
            female:
                employees?.data?.filter((emp) => emp.gender === "F")?.length ||
                0,
        },
    };

    return (
        <div className="container py-8">
            <div className="grid gap-6">
                {/* Welcome and Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="card bg-gradient-to-r from-primary to-primary-hover">
                            <h1 className="text-2xl font-bold mb-2">
                                Welcome back, {user?.name}
                            </h1>
                            <p className="text-white/80 mb-4">
                                Here's what's happening in your organization
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate("/employees")}
                                    className="btn-secondary bg-white/10 hover:bg-white/20"
                                >
                                    View Employees
                                </button>
                                <button
                                    onClick={() =>
                                        navigate("/employees/create")
                                    }
                                    className="btn-secondary bg-white/10 hover:bg-white/20"
                                >
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="text-lg font-medium mb-4">
                            Profile Overview
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-medium">
                                        {user?.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{user?.name}</p>
                                    <p className="text-sm text-muted">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="card bg-blue-500/10">
                        <h3 className="text-lg font-medium mb-2">
                            Total Employees
                        </h3>
                        <p className="text-3xl font-bold text-blue-500">
                            {stats.totalEmployees}
                        </p>
                    </div>
                    <div className="card bg-green-500/10">
                        <h3 className="text-lg font-medium mb-2">
                            Active Employees
                        </h3>
                        <p className="text-3xl font-bold text-green-500">
                            {stats.activeEmployees}
                        </p>
                    </div>
                    <div className="card bg-purple-500/10">
                        <h3 className="text-lg font-medium mb-2">
                            Departments
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(stats.departments).map(
                                ([dept, count]) => (
                                    <div
                                        key={dept}
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-muted">
                                            {dept}
                                        </span>
                                        <span className="font-medium text-purple-500">
                                            {count}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="card bg-orange-500/10">
                        <h3 className="text-lg font-medium mb-2">
                            Gender Distribution
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-muted">Male</span>
                                <span className="font-medium text-orange-500">
                                    {stats.genderDistribution.male}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted">Female</span>
                                <span className="font-medium text-orange-500">
                                    {stats.genderDistribution.female}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Employees */}
                <div className="card">
                    <h3 className="text-lg font-medium mb-4">
                        Recent Employees
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left p-4 text-muted font-medium">
                                        Name
                                    </th>
                                    <th className="text-left p-4 text-muted font-medium">
                                        Email
                                    </th>
                                    <th className="text-left p-4 text-muted font-medium">
                                        Designation
                                    </th>
                                    <th className="text-left p-4 text-muted font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees?.data
                                    ?.slice(0, 5)
                                    .map((employee) => (
                                        <tr
                                            key={employee._id}
                                            className="border-b border-border"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <EmployeeAvatar
                                                        imageUrl={
                                                            employee.imageUrl
                                                        }
                                                        name={employee.name}
                                                        className="w-8 h-8"
                                                    />
                                                    <span>{employee.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {employee.email}
                                            </td>
                                            <td className="p-4">
                                                {employee.designation}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                                ${
                                                    employee.isActive
                                                        ? "bg-green-500/10 text-green-500"
                                                        : "bg-red-500/10 text-red-500"
                                                }`}
                                                >
                                                    {employee.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
