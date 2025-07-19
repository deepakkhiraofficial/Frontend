import React, { createContext, useEffect, useState } from "react";

// Create context with default fallback to avoid undefined errors
export const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Load user/token from localStorage on first mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Failed to restore auth data from localStorage:", error);
        }
    }, []);

    // Login and store credentials
    const login = (userData, token) => {
        try {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            setUser(userData);
            setToken(token);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // Logout and clear credentials
    const logout = () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
