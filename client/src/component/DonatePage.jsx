import React from "react";
import { motion } from "framer-motion";
import IMG5 from "../assets/IMG5.png";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ANIMATIONS */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const DonatePage = () => {

  const navigate = useNavigate()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={container}
      className="relative"
    >
      {/* 🔥 HERO BACKGROUND */}
      <div
        className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-fixed"
        style={{
          backgroundImage: `url(${IMG5})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* ❤️ FLOATING ICON */}
        <motion.div
          variants={fadeUp}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-16 flex justify-center w-full"
        >
          <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <FaHeart className="text-white text-xl" />
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          variants={container}
          className="relative mt-14 z-10 text-white px-6 max-w-6xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold leading-tight mb-6"
          >
            “Pray and stay attentive to God’s voice. You may be able to stand
            alone, but you were never meant to walk alone.”
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="italic text-lg mb-6"
          >
            This is more than a story. it’s a reminder that every cross we carry
            leads to purpose, growth, and victory.
          </motion.p>

          <motion.button
          onClick={()=>navigate('/donation')}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition"
          >
            Donate Online
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DonatePage;