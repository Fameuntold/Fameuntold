import React, { useState } from "react";
import axios from "axios";
import profileArea from '../assets/profileArea.png'

const AccountPage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
);

  

    const [formData, setFormData] = useState({
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpdate = async () => {
        if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmPassword) {
                return alert("Passwords do not match");
            }
        }

        try {
            const res = await axios.put(
                "https://fameuntold-85z3.vercel.app/api/auth/update-profile",
                {
                    name: `${formData.firstName} ${formData.lastName}`,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Profile updated successfully!");

            setFormData({
                ...formData,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const handleUpload = async () => {
        if (!image) return alert("Select an image");

        const formData = new FormData();
        formData.append("profileImage", image);

        try {
            const res = await axios.post(
                "https://fameuntold-85z3.vercel.app/api/auth/upload-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            //  Save updated user
            localStorage.setItem("user", JSON.stringify(res.data.user));

            //  Update preview from server
            setPreview(`https://fameuntold-85z3.vercel.app/${res.data.imageUrl}`);
             setUser(res.data.user);
            alert("Profile updated successfully!");

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen px-3 sm:px-6 lg:px-10 py-6">

            {/* BREADCRUMB */}
            <div className="text-xs sm:text-sm text-gray-500 mb-4 break-words">
                Home &gt; My Account &gt; <span className="text-pink-600">My Profile</span>
            </div>

            {/* TITLE */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
                Account Information
            </h1>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* SIDEBAR */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm lg:col-span-1">

                    {/* PROFILE IMAGE */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                        <div className="relative">
                            <img
                                src={
                                    preview ||
                                    (user?.profileImage
                                        ? `https://fameuntold-85z3.vercel.app/${user.profileImage}`
                                        : profileArea)
                                }
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-400"
                            />

                            <label className="absolute bottom-0 right-0 bg-purple-500 text-white p-1.5 sm:p-2 rounded-full cursor-pointer text-xs">
                                ✎
                                <input type="file" hidden onChange={handleImageChange} />
                            </label>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-base sm:text-lg font-semibold">Profile Photo</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-2">
                                JPG, PNG. Max 2MB
                            </p>

                            <button
                                onClick={handleUpload}
                                className="bg-purple-500 text-white px-3 sm:px-4 py-2 rounded text-sm w-full sm:w-auto"
                            >
                                Upload Image
                            </button>
                        </div>
                    </div>

                    {/* PROFILE LINKS */}
                    <div className="mb-6">
                        <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm sm:text-base">
                            👤 My Profile
                        </h3>
                        <ul className="text-xs sm:text-sm space-y-2 pl-4 sm:pl-6">
                            <li className="text-pink-600 font-semibold">Account Information</li>
                            <li className="text-gray-600">Delivery Address</li>
                        </ul>
                    </div>

                    {/* DELETE */}
                    <div>
                        <h3 className="font-semibold flex items-center gap-2 mb-2 text-sm sm:text-base">
                            ❌ Delete Account
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 pl-4 sm:pl-6">Delete Account</p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm lg:col-span-3">

                    <h2 className="text-base sm:text-lg font-semibold border-b border-purple-200 pb-3 mb-6">
                        Account Information
                    </h2>

                    {/* FORM */}
                    <div className="space-y-4">

                        {/* NAME FIELDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        {/* PASSWORDS */}
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter your current password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />

                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            placeholder="Enter your new password"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            placeholder="Confirm your new password"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        />

                        <button
                            onClick={handleUpdate}
                            className="w-full sm:w-auto bg-gradient-to-r from-gray-800 to-purple-500 hover:bg-purple-600 text-white py-2 sm:py-3 px-6 rounded mt-4 font-semibold text-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
