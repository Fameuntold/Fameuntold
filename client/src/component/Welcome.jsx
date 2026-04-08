import React from "react";
import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { FaPrayingHands, FaBookOpen } from "react-icons/fa";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

/* ANIMATION VARIANTS */
const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-200 w-full flex flex-col md:flex-row min-h-screen">
      {/* LEFT SECTION */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col justify-center px-6 md:px-20 py-12 md:py-16 w-full md:w-1/2"
      >
        <p className="text-purple-800 mb-3 font-medium text-2xl">Welcome To</p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Place of Purpose and Transformation
        </h1>
        <p className="text-gray-700 mb-8">
          We are a faith-driven community committed to raising lives,
          empowering talents, and equipping individuals to reach their full
          potential. At the core of our mission is the belief that every person
          is created with unique gifts, abilities, and purpose, and it is our
          responsibility to nurture these qualities so they can flourish. We
          provide guidance, mentorship, and opportunities that help people grow
          spiritually, emotionally, and intellectually, ensuring that they are
          not only prepared to face life’s challenges but are also able to
          contribute positively to society.
        </p>
        <button
          onClick={() => navigate("/our-story")}
          className="bg-purple-800 hover:bg-purple-600 text-white px-6 py-3 rounded-full w-fit shadow-md transition"
        >
          Learn More
        </button>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-6 md:px-16 py-12 md:py-16 w-full md:w-1/2 flex justify-center items-start md:items-center"
      >
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
        >
          <BenefitCard
            icon={<FiGlobe size={24} />}
            title="OUTREACH"
            text="Our outreach initiatives are focused on reaching communities..."
          />

          <BenefitCard
            dark
            icon={<FaBookOpen size={24} />}
            title="SEMINARS"
            text="Our seminars are structured to provide practical knowledge..."
          />

          <BenefitCard
            icon={<HiOutlinePresentationChartBar size={24} />}
            title="CONFERENCES"
            text="Our conferences bring together individuals..."
          />

          <BenefitCard
            dark
            icon={<FaPrayingHands size={24} />}
            title="SPIRITUAL PROGRAMS"
            text="Our spiritual programs are designed to create an atmosphere..."
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

/* CARD COMPONENT */
function BenefitCard({ icon, title, text, dark }) {
  return (
    <motion.div
      variants={cardVariant}
      className={`relative rounded-2xl p-6 text-center shadow-sm transition transform hover:-translate-y-1 ${
        dark ? "bg-purple-800 text-white" : "bg-white"
      }`}
    >
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-full shadow-md ${
          dark ? "bg-purple-700 text-white" : "bg-purple-600 text-white"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-10 font-semibold text-lg">{title}</h3>

      <p className={`mt-2 text-sm ${dark ? "text-blue-100" : "text-gray-500"}`}>
        {text}
      </p>
    </motion.div>
  );
}