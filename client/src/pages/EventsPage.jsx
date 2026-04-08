import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IMG16 from "../assets/IMG16.PNG";

/* EXTRA PROGRAMS */
const extraPrograms = [
  "Talent & Empowerment Programs",
  "Conferences & Strategic Meetings",
  "Worship & Spiritual Programs",
  "Outreach for Students",
];

/* ANIMATIONS */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

/* SECTION WRAPPER */
const Section = ({ children }) => (
  <motion.section
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}
    className="max-w-6xl mx-auto mb-16 px-4"
  >
    {children}
  </motion.section>
);

/* EVENT CARD */
const EventCard = ({ title, description, image }) => (
  <motion.div
    variants={scaleIn}
    whileHover={{ y: -10 }}
    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
  >
    <motion.img
      src={
        image?.startsWith("http")
          ? image
          : `https://fameuntold-85z3.vercel.app${image}`
      }
      alt={title}
      whileHover={{ scale: 1.05 }}
      className="w-full h-48 object-cover"
    />

    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function EventsPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* FETCH EVENTS */
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://fameuntold-85z3.vercel.app/api/events/getEvents"
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* FILTER */
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-18 h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${IMG16})` }}
      >
        <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

        <div className="relative z-10 w-full flex justify-between items-center">

          <motion.div variants={fadeUp} className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Events & Initiatives
            </h1>

            <div className="flex items-start gap-4">
              <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

              <p className="text-gray-200">
                Explore programs designed to inspire and transform lives.
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer"
          >
            <p
              onClick={() => navigate("/")}
              className="text-sm font-semibold text-gray-600"
            >
              HOME <span className="mx-2">|</span>
              <span className="text-orange-500">EVENT</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* SEARCH */}
      <Section>
        <motion.input
          variants={fadeUp}
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-3 rounded-lg shadow-sm focus:outline-none"
        />
      </Section>

      {/* EVENTS */}
      <Section>
        <motion.div
          variants={container}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 col-span-2">
              No events available
            </p>
          ) : (
            filteredEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))
          )}
        </motion.div>
      </Section>

      {/* PROGRAMS */}
      <Section>
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold mb-6 text-center"
        >
          Other Programs
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          {extraPrograms.map((program, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow p-4 text-center"
            >
              {program}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          variants={fadeUp}
          className="text-center text-white py-12 bg-[#16002E]"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Be Part of the Movement
          </h2>

          <p className="text-gray-50 mb-6">
            Join us in building lives and transforming communities.
          </p>

          <motion.button
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-50 text-black font-bold px-6 py-3 rounded-2xl hover:bg-gray-700 transition"
          >
            Get Involved
          </motion.button>
        </motion.div>
      </Section>

    </div>
  );
}