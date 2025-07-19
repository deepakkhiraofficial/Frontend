import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Initial context structure
const defaultAuthContext = {
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    loading: true,
};

export const AuthContext = createContext(defaultAuthContext);

// Optional: Export reusable hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            setToken(storedToken);

            try {
                const res = await axios.get("https://myshop-72k8.onrender.com/me", {
                    headers: { Authorization: `Bearer ${storedToken}` },
                    withCredentials: true,
                });

                if (res.data?.user) {
                    setUser(res.data.user);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                } else {
                    logout();
                }
            } catch (err) {
                console.error("Auth revalidation failed:", err?.response?.data || err.message);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData, newToken) => {
        try {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", newToken);
            setUser(userData);
            setToken(newToken);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const logout = async () => {
        try {
            await axios.get("https://myshop-72k8.onrender.com/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.warn("Server logout failed:", err?.message || err);
        } finally {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
