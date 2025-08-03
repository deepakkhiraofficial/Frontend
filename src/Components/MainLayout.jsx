import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ShopFooter from "./ShopFooter";

export default function MainLayout() {
    const { pathname } = useLocation();

    const hideNavbarRoutes = ["/login", "/signup", "/admin", "/user"];
    const hideFooterRoutes = ["/login", "/signup"];

    const showNavbar = useMemo(() =>
        !hideNavbarRoutes.some(route => pathname.startsWith(route)),
        [pathname]);

    const showFooter = useMemo(() =>
        !hideFooterRoutes.some(route => pathname.startsWith(route)),
        [pathname]);

    return (
        <div className="min-h-screen flex flex-col">
            {showNavbar && <Navbar />}

            <main className="flex-grow">
                <Outlet />
            </main>

            {showFooter && <ShopFooter />}
        </div>
    );
}
