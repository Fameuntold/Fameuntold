import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import IMG16 from "../assets/IMG16.PNG";
import axios from "axios"; 

export default function ContactPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://fameuntold-85z3.vercel.app/api/contact/contact", formData);
      alert(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${IMG16})` }}
      >
        <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

        <div className="relative z-10 w-full flex justify-between items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>

            <div className="flex items-start gap-4">
              <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>
              <p className="text-gray-200">
                We’re here to help, answer questions, and connect with you.
              </p>
            </div>
          </div>

          <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
            <p
              onClick={() => navigate("/")}
              className="text-sm font-semibold text-gray-600"
            >
              HOME <span className="mx-2">|</span>
              <span className="text-orange-500">CONTACT</span>
            </p>
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Let’s Talk</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Mail className="text-purple-500" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">Fameuntold@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Phone className="text-purple-500" />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">+234 8147978747</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <MapPin className="text-purple-500" />
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600">
                  Osogbo, Osun State, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-6">Send Message</h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* MAP */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Osogbo, Osun State&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[400px] border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}