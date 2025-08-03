import React from "react";
import { Navigate } from "react-router-dom";

// Decode JWT helper
function parseJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const decodedToken = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decodedToken || decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    // ✅ FIXED LOGIC: Only redirect if role is not allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
