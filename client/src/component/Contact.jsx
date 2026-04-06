import React from "react";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

/* ANIMATIONS */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function Contact() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={stagger}
      className="relative bg-black pb-10 text-white overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CARD */}
        <motion.div
          variants={slideLeft}
          whileHover={{ scale: 1.05 }}
          className="bg-white/40 text-gray-50 rounded-xl p-10 shadow-lg max-w-md"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-purple-800 p-4 rounded-full mb-4"
            >
              <PhoneCall size={28} />
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">Call Us</h3>

            <div className="w-10 h-1 bg-purple-600 mb-6"></div>

            <p className="mb-3">+2348147978747</p>
            <p>Fameuntold@gmail.com</p>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div variants={slideRight}>
          <motion.p
            variants={fadeUp}
            className="text-red-50 font-semibold mb-3 uppercase tracking-wide"
          >
            Get In Touch
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Don't hesitate Contact Us
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="w-12 h-1 bg-purple-600 mb-6"
          ></motion.div>

          <motion.p
            variants={fadeUp}
            className="text-gray-200 max-w-lg mb-8"
          >
            Our platform is designed to connect you with life-transforming experiences.
            Whether you're seeking inspiration, community, or purpose, Fame Untold is
            here to walk the journey with you.
          </motion.p>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-400 cursor-pointer text-black px-6 py-3 rounded-md font-medium"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>

      {/* WAVES (OPTIONAL ANIMATION) */}
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
      >
        <svg viewBox="0 0 1440 200" className="w-full h-[160px]" preserveAspectRatio="none">
          <path
            d="M0,128L80,122.7C160,117,320,107,480,101.3C640,96,800,96,960,101.3C1120,107,1280,117,1360,122.7L1440,128L1440,320L0,320Z"
            fill="#d1d5db"
          />
          <path
            d="M0,160L60,149.3C120,139,240,117,360,117.3C480,117,600,139,720,144C840,149,960,139,1080,128C1200,117,1320,107,1380,101.3L1440,96L1440,320L0,320Z"
            fill="#e5e7eb"
          />
          <path
            d="M0,192L80,181.3C160,171,320,149,480,144C640,139,800,149,960,160C1120,171,1280,181,1360,186.7L1440,192L1440,320L0,320Z"
            fill="#f3f4f6"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}