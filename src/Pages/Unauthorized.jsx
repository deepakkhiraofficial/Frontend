import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
        const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    useEffect(() => {
        if (countdown === 0) {
            navigate("/"); // Redirect to user dashboard after countdown
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);
    return (
        <div className="p-6 text-center text-red-600">
            <h1 className="text-2xl font-bold mb-2">403 - Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <p className="mt-2 text-gray-600">
                Redirecting in <span className="font-semibold">{countdown}</span>{" "}
                second{countdown !== 1 ? "s" : ""}...
            </p>
        </div>
    );
};

export default Unauthorized; // ✅ default export
