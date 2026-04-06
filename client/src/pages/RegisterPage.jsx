import React, { useState } from "react";
import getinvolvedimg1 from "../assets/getinvolvedimg1.png";
import StatusModal from "../component/StatusModal";
import LoadingButton from "../component/LoadingButton"; // 
import { useNavigate } from "react-router-dom";

const roles = ["Mentee", "Mentor", "Volunteer", "Partner"];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("Mentee");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    message: ""
  });

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ START LOADING

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          role: selectedRole
        })
      });

      // FIX YOUR JSON ERROR HERE
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        setModal({
          open: true,
          type: "error",
          message: data.message || "Registration failed",
        });
        setLoading(false);
        return;
      }

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setModal({
        open: true,
        type: "success",
        message: "Registration successful 🎉",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        message: ""
      });

      //  Redirect after 2s
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(error);

      setModal({
        open: true,
        type: "error",
        message: "Server error. Check backend.",
      });
    }

    setLoading(false); //  STOP LOADING
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${getinvolvedimg1})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-4xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Join Our Community
        </h1>

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-full border ${
                selectedRole === role
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-3 rounded-lg" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-3 rounded-lg" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-3 rounded-lg" required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-3 rounded-lg" required />
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-3 rounded-lg" required />

          <textarea
            name="message"
            placeholder="Tell us more..."
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            required
          />

          {/*  NEW LOADING BUTTON */}
          <div className="md:col-span-2">
            <LoadingButton
              loading={loading}
              text={`Register as ${selectedRole}`}
              loadingText="Creating account..."
              onClick={handleSubmit}
            />
          </div>

        </form>
      </div>

      {/*  MODAL */}
      <StatusModal
        isOpen={modal.open}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </div>
  );
}