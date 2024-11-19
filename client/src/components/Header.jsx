import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, CircleUser, ScrollText } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, logoutUser } from "../lib/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-lg border-b border-border">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold text-primary">
                            Dashboard
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                to="/"
                                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to="/employees"
                                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                            >
                                Employees
                            </Link>
                        </nav>
                    </div>

                    {isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-muted">
                                {user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn-secondary text-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
