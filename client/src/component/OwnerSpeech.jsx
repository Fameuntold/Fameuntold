import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import ceo from "../assets/ceo.png";
import { useNavigate } from "react-router-dom";

/* ANIMATION VARIANTS */
const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const imageZoom = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function OwnerSpeech() {

    const navigate = useNavigate()
  return (
  <div className="relative min-h-screen bg-gray-100 overflow-hidden">

    {/* Background texture */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] opacity-40"></div>

    <div className="relative grid md:grid-cols-2 items-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 gap-10">

      {/* LEFT CONTENT */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="text-center md:text-left"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
          Who We Are
        </h1>

        <span className="text-xl sm:text-2xl md:text-4xl text-gray-800 mb-6 block">
          Our mission is to share the Good of Jesus Christ, loving, faith and serving.
        </span>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto md:mx-0 mb-8 text-sm sm:text-base">
          The organization operates with the understanding that young people are not just leaders of tomorrow but key stakeholders of today. We recognize their ideas, energy, and creativity as essential to shaping the present and driving meaningful change in our communities. By providing platforms for engagement, skill development, and mentorship, we empower young people to take active roles in decision-making, innovation, and social impact.
        </p>

        <button
          onClick={() => navigate("/mission")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-md"
        >
          Learn More
        </button>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative flex mb-9 justify-center items-center"
      >

        {/* Background shape */}
        <div className="absolute w-48 hidden md:block sm:w-64 md:w-[360px] lg:w-[460px] h-72 sm:h-80 md:h-[480px] lg:h-[520px] bg-purple-400 polygon -bottom-5 md:-bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10"></div>

        {/* Image */}
        <motion.div
          variants={imageZoom}
          className="relative w-[380px]  md:w-[380px] lg:w-[440px] h-64 sm:h-80 md:h-[450px] lg:h-[500px] overflow-hidden"
        >
          <img
            src={ceo}
            alt="person"
            className="w-full h-full object-cover polygon bg-gray-300"
          />
        </motion.div>
      </motion.div>

    </div>
  </div>
);
}