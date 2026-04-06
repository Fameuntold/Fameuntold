import React from "react";
import { motion } from "framer-motion";

/* DATA */
const events = [
  {
    date: "27 Jan 2026",
    time: "Fri 06:55",
    title: "Haven with F.A.M.E",
    desc: "Untold is a closed-door mentorship platform designed to provide consistent guidance...",
  },
  {
    date: "11 Jan 2026",
    time: "Wed 11:30",
    title: "Raise a Sound",
    desc: "Raise a Sound is an annual worship concert organized by F.A.M.E Untold...",
  },
  {
    date: "01 Dec 2025",
    time: "Sun 09:00",
    title: "SUMES (Summit for a More Equitable Society)",
    desc: "A comprehensive initiative designed to engage all segments of society...",
  },
  {
    date: "01 Dec 2025",
    time: "Sun 09:00",
    title: "Limitless Conference",
    desc: "A Bible-based teaching conference held once every year...",
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
    transition: { duration: 0.6, ease: "easeOut" },
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

const Upcoming = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
      className="w-full py-16 px-6 md:px-20 mb-20"
    >
      {/* HEADING */}
      <motion.h1
        variants={fadeUp}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-12"
      >
        Upcoming <span className="font-light">Events</span>
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-10">

        {/* TIMELINE */}
        <motion.div
          variants={slideLeft}
          className="relative border-l-4 border-purple-500 pl-8 flex-1"
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="mb-12 relative"
            >
              {/* DOT */}
              <div className="absolute -left-10 top-2 w-4 h-4 bg-red-500 rounded-full"></div>

              <p className="text-sm text-gray-500 font-semibold">
                {event.date}
              </p>
              <p className="text-xs text-gray-400 mb-2">{event.time}</p>

              <h2 className="text-xl font-bold text-gray-800">
                {event.title}
              </h2>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {event.desc}
              </p>

              <div className="w-[85%] h-1 bg-purple-300 -ml-8 mt-2"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* SIDE CARD */}
        <motion.div
          variants={slideRight}
          className="flex justify-center items-start"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="border-4 border-black p-10 text-center"
          >
            <h2 className="text-5xl text-purple-800 font-bold tracking-widest leading-relaxed">
              FA<br />ME
            </h2>
            <div className="w-20 h-2 bg-purple-700 mx-auto"></div>

            <h2 className="text-5xl text-purple-800 font-bold tracking-widest leading-relaxed">
              UN<br />TO<br />LD
            </h2>
            <div className="w-20 h-2 bg-purple-700 mx-auto"></div>

            <h2 className="text-5xl text-purple-800 font-bold tracking-widest leading-relaxed">
              EV<br />EN<br />TS
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Upcoming;