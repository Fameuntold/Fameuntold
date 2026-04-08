import React, { useState, useEffect } from "react";
import IMG10 from "../assets/IMG10.png";
import IMG11 from "../assets/IMG11.png"; // add more images if you have
import IMG12 from "../assets/IMG12.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: IMG10,
    title: "Transform Your Future Today",
    text: "  Transform your future today by taking bold steps toward the life you envision. Every great journey begins with a single decision—the choice to move forward, to grow, and to embrace new opportunities. We are here to support you every step of the way, providing the tools, insights, and guidance you need to turn your ambitions into reality.",
  },
  {
    image: IMG11,
    title: "Be Empowered and Equipped",
    text: " Be empowered and equipped with the knowledge, tools, and support you need to thrive in every area of your life. True empowerment comes from understanding your potential and having access to the right resources to bring your vision to life.",
  },
  {
    image: IMG12,
    title: "Walk in Purpose",
    text: " Walk in purpose by embracing the unique calling placed upon your life and trusting the path set before you. Every step you take is an opportunity to grow, to serve, and to become the person you were created to be.",
  },
];

const OurJourney = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate()

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">

      {/* 🔝 HERO SECTION */}
      <div className="grid md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 text-white flex flex-col justify-center px-10 py-15 h-[25rem]">
          <h4 className="text-green-50 mb-4 text-lg">
            Fame Untold
          </h4>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Let’s build together. <br />
            Let’s grow together.
          </h1>

          <p className="mb-6 max-w-md">
            We are committed to raising empowered and spirit-filled individuals,
            transforming lives through faith, leadership, and impactful programs.
          </p>

          <button onClick={()=>navigate('/mentorship')} className="bg-purple-50 text-black px-6 py-3 mb-13 rounded w-fit font-semibold hover:bg-purple-300 transition">
            Find out more
          </button>
        </div>

        {/* RIGHT IMAGE SLIDER */}
        <div className="relative h-[25rem] overflow-hidden">

          {/* Image */}
          <img
            src={slides[current].image}
            alt="slide"
            className="w-full h-full object-cover transition-all duration-1000"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/80"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">

            <h2
              key={slides[current].title}
              className="text-3xl md:text-4xl font-bold mb-4 animate-slideIn"
            >
              {slides[current].title}
            </h2>

            <p
              key={slides[current].text}
              className="max-w-md text-gray-200 animate-fadeIn"
            >
              {slides[current].text}
            </p>
          </div>
        </div>
      </div>

      {/* 🔽 BOTTOM SECTION */}
      <div className="grid md:grid-cols-2">

        {/* LEFT CARD */}
        <div className="bg-gray-50 px-10 py-16 h-[25rem]">
          <h4 className="text-blue-600 mb-4">Help & Support</h4>

          <h2 className="text-3xl font-semibold mb-4">
            Be empowered and equipped
          </h2>

          <p className="text-gray-600 max-w-md">
            We are dedicated to building lives through faith, knowledge, and purpose-driven programs—equipping you to grow, lead, and make lasting impact.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-gradient-to-r from-purple-700 to-gray-800 text-gray-100 px-10 py-16 h-[25rem]">
          <h4 className="text-blue-50 mb-4">Programs</h4>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            We believe every life <br />
            carries purpose and greatness.
          </h1>

          <p className="max-w-md">
            Join our conferences, seminars, outreach programs, and spiritual
            gatherings designed to inspire growth and impact lives.
          </p>
        </div>

      </div>

      {/* 🔥 Custom Animations */}
      <style>
        {`
          .animate-slideIn {
            animation: slideIn 0.8s ease-in-out;
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease-in-out;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default OurJourney;