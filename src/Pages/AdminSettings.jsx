import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserState } from "../redux/authSlice"; // updated action import

const AdminSettings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("email", user.email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://myshop-72k8.onrender.com/forget-password", // your real endpoint
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser = response.data.updatedUser;
            dispatch(updateUserState(updatedUser)); // <-- use reducer action here
            toast.success("Settings updated successfully!");
            reset({ ...updatedUser, password: "" });
        } catch (error) {
            if (error.response?.data?.errors) {
                for (const key in error.response.data.errors) {
                    setError(key, {
                        type: "manual",
                        message: error.response.data.errors[key],
                    });
                }
            } else {
                toast.error("Something went wrong. Try again.",error);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}
            <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium">Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full mt-1 p-2 border rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium">New Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            minLength: { value: 6, message: "Minimum 6 characters" },
                        })}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Leave blank to keep current password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default AdminSettings;
