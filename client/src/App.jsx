import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { checkAuthStatus } from "./lib/authSlice";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NotFound from "./components/NotFound";
import EmployeeList from "./components/employees/EmployeeList";
import CreateEmployee from "./components/employees/CreateEmployee";
import EditEmployee from "./components/employees/EditEmployee";

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

// Authentication wrapper component
const AuthCheck = ({ children }) => {
    const dispatch = useDispatch();
    const { loading, initialized } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!initialized) {
            dispatch(checkAuthStatus());
        }
    }, [dispatch, initialized]);

    if (loading && !initialized) {
        return <LoadingSpinner />;
    }

    return children;
};

// Public Route wrapper (for login/signup)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, initialized } = useSelector((state) => state.auth);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (!initialized) {
        return <LoadingSpinner />;
    }

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    return children;
};

// Protected Route wrapper
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, initialized, loading } = useSelector(
        (state) => state.auth
    );
    const location = useLocation();

    if (!initialized || loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default function App() {
    return (
        <div className="min-h-screen">
            <AuthCheck>
                <Header />
                <main>
                    <Routes>
                        {/* Auth Routes */}
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <PublicRoute>
                                    <Signup />
                                </PublicRoute>
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />

                        {/* Employee Routes */}
                        <Route
                            path="/employees"
                            element={
                                <PrivateRoute>
                                    <EmployeeList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/employees/create"
                            element={
                                <PrivateRoute>
                                    <CreateEmployee />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/employees/:id/edit"
                            element={
                                <PrivateRoute>
                                    <EditEmployee />
                                </PrivateRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </AuthCheck>
        </div>
    );
}
