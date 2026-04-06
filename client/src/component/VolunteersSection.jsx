import React from "react";
import { motion } from "framer-motion";
import vol1 from "../assets/vol1.jpeg";
import vol2 from "../assets/vol2.jpeg";
import vol3 from "../assets/vol3.jpeg";
import vol4 from "../assets/vol4.jpeg";

/* DATA */
const volunteers = [
  {
    name: "Olaitan Makinde",
    role: "Head Of Programs",
    img: vol1,
  },
  {
    name: "Truben A. Oripeloye",
    role: "Deputy Director",
    img: vol2,
  },
  {
    name: "Adeboye Access Iyinrere",
    role: "Member",
    img: vol3,
  },
  {
    name: "Ajibola Aishat",
    role: "Director Of Communication",
    img: vol4,
  },
];

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
    transition: { duration: 0.6 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function VolunteersSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
      className="text-black py-20 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* HEADING */}
        <motion.p variants={fadeUp} className="text-sm tracking-widest mb-2">
          + WHO +
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold mb-12"
        >
          Our Volunteers
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {volunteers.map((person, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="relative">

                {/* IMAGE */}
                <motion.img
                  src={person.img}
                  alt={person.name}
                  whileHover={{ scale: 1.05 }}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                />

                {/* PLUS BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 right-0 bg-blue-800 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
                >
                  +
                </motion.button>
              </div>

              <motion.p
                variants={fadeUp}
                className="text-xs mt-4 opacity-80"
              >
                {person.role}
              </motion.p>

              <motion.h3
                variants={fadeUp}
                className="text-lg font-semibold mt-1 text-center"
              >
                {person.name}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}