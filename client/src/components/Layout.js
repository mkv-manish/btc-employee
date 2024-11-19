import { Outlet } from "react-router-dom";

import { AuthCheck } from "../App";
import Header from "./Header";

const Layout = () => {
    return (
        <AuthCheck>
            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </AuthCheck>
    );
};

export default Layout;
