import React from "react";
import { motion } from "framer-motion";
import IMG16 from "../assets/IMG16.PNG";
import get1 from "../assets/get1.jpeg";
import getinvolvedimg1 from "../assets/getinvolvedimg1.png";
import { useNavigate } from "react-router-dom";

/* DATA */
const opportunities = [
  {
    title: "Become a Mentor",
    description:
      "Guide and support young people by sharing your knowledge and experience.",
  },
  {
    title: "Join as a Mentee",
    description:
      "Be part of a community that helps you grow and discover purpose.",
  },
  {
    title: "Volunteer",
    description:
      "Support events and outreach programs with your time and skills.",
  },
  {
    title: "Partner With Us",
    description:
      "Collaborate to expand our reach and impact communities.",
  },
];

/* ANIMATIONS */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* COMPONENTS */
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



export default function GetInvolvedPage() {
  const navigate = useNavigate();

  const Card = ({ title, description }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -10 }}
    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
  >
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>

    <motion.button
    onClick={() => navigate("/register")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-purple-900 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
    >
      Apply Now
    </motion.button>
  </motion.div>
);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${IMG16})` }}
      >
        <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

        <div className="relative z-10 w-full flex justify-between items-center">

          <motion.div variants={fadeUp} className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Involved
            </h1>

            <div className="flex gap-4">
              <div className="w-[3px] h-16 bg-orange-500"></div>
              <p className="text-gray-200">
                Be part of a movement transforming lives and building leaders.
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
              HOME | <span className="text-orange-500">Get Involved</span>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ABOUT */}
      <Section>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.img
            variants={fadeUp}
            src={get1}
            className="rounded-2xl w-full mt-14 md:w-1/2"
          />

          <motion.div variants={fadeUp}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Be a Part of Something Greater
            </h1>

            <p className="text-gray-600">
              Step into your purpose by serving others and making a lasting impact.
              Every act of service matters and helps transform lives.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* OPPORTUNITIES (WITH BACKGROUND) */}
      <div
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${getinvolvedimg1})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10">
          <Section>
            <div className="grid md:grid-cols-2 gap-6">
              {opportunities.map((item, index) => (
                <Card key={index} {...item} />
              ))}
            </div>
          </Section>

          {/* CTA */}
          <Section>
            <motion.div
              variants={fadeUp}
              className="bg-[#16002E] rounded-2xl p-8 text-center text-white"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Ready to Take the Next Step?
              </h2>

              <p className="mb-6">
                Start your journey with us today.
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <motion.button
                onClick={() => navigate("/contact-page")}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white text-black px-6 py-3 rounded-2xl"
                >
                  Contact Us
                </motion.button>

                <motion.button
                onClick={() => navigate("/register")}
                  whileHover={{ scale: 1.05 }}
                  className="border px-6 py-3 rounded-2xl"
                >
                  Join Our Groups
                </motion.button>
              </div>
            </motion.div>
          </Section>
        </div>
      </div>
    </div>
  );
}