import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
    LogOut,
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    Settings,
    PlusCircle,
    Menu,
    X,
} from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [userName, setUserName] = useState("U");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (!user || user.role !== "admin") {
            // Redirect if no user or not admin
            navigate("/login", { replace: true });
        } else {
            setUserName(user.name?.charAt(0).toUpperCase() || "U");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        // Ideally dispatch logout action here if you have one

        dispatch(logout());
        toast.success("Logged out successfully!");
        navigate("/login", { replace: true });
    };

    const navItems = [
        { name: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Customers", to: "customers", icon: Users },
        { name: "Products", to: "products", icon: Package },
        { name: "Orders", to: "orders", icon: ShoppingCart },
        { name: "Settings", to: "settings", icon: Settings },
        { name: "Add Product", to: "product/add", icon: PlusCircle },
        { name: "Admin Users", to: "users", icon: Users },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-indigo-700 text-white p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <button
                        aria-label="Toggle Sidebar"
                        aria-expanded={isSidebarOpen}
                        aria-controls="sidebar-menu"
                        className="md:hidden focus:outline-none"
                        onClick={() => setIsSidebarOpen((open) => !open)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-600 font-semibold text-lg">
                        {userName}
                    </div>
                    <h1 className="text-xl font-semibold">Admin Panel</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="hidden sm:inline font-medium">Welcome, {userName}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-indigo-900 hover:bg-indigo-950 px-3 py-1 rounded-md flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar */}
                <nav
                    id="sidebar-menu"
                    className={`bg-white md:block shadow-md w-full md:w-64 p-4 transition-all duration-300 md:static absolute z-40 ${isSidebarOpen ? "block" : "hidden"
                        }`}
                >
                    <ul className="space-y-3">
                        {navItems.map(({ name, to, icon: Icon }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-3 py-2 rounded-md font-medium ${isActive
                                            ? "text-indigo-600 bg-indigo-100"
                                            : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-100"
                                        }`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon size={18} />
                                    <span>{name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1 bg-white p-4 md:p-6 pt-6 md:pt-0">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-500 text-sm py-4">
                © 2025 My Shop. All rights reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
