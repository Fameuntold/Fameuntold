import React, { useState } from "react";
import { motion } from "framer-motion";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import logo from "../assets/logo.png";
import pics5 from "../assets/pics5.jpeg";
import pics6 from "../assets/pics6.jpeg";
import event1 from "../assets/event1.jpeg";
import event3 from "../assets/event3.jpeg";
import axios from "axios"
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
    transition: { duration: 0.6 },
  },
};

export default function Footer() {


  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const links = [
    { name: "Who We Are?", path: "/our-story" },
    { name: "Support And FAQ’s", path: "/faq-page" },
    { name: "Payments", path: "/donation" },
    { name: "Donations Terms", path: "/donations-terms" },
    { name: "Volunteer", path: "/volunteer-page" },
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://fameuntold-85z3.vercel.app/api/newsletter/subscribe", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      if (err.response) setMessage(err.response.data.error || err.response.data.message);
      else setMessage("Server error");
    }
  };




  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
      className="bg-gradient-to-t from-purple-950 to-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ABOUT */}
        <motion.div variants={fadeUp}>



          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <img className="w-16 h-16 filter brightness-0 invert" src={logo} alt="" />
            About F.A.M.E Untold
          </h3>

          <p className="text-sm text-gray-300 leading-6">
            F.A.M.E Untold, an acronym for Forever Amazingly Manifesting Everywhere,
            is a faith-based organization focused on the holistic development of young people.
          </p>

          <div className="flex gap-3 mt-6">
            {[TiSocialFacebook, TiSocialTwitter, FaInstagram, FaLinkedin].map(
              (Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="bg-blue-800 p-2 rounded cursor-pointer"
                >
                  <Icon size={16} />
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* LINKS */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-500">+</span> Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-gray-300">
            {links.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                onClick={() => navigate(item.path)}
                className="cursor-pointer"
              >
                ☆ {item.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* NEWS */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-500">+</span> Latest News
          </h3>

          <div className="space-y-4">
            {[pics5, pics6, event1, event3].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex gap-3 items-center cursor-pointer"
              >
                <img
                  src={img}
                  className="w-14 h-14 rounded object-cover"
                  alt="news"
                />
                <div>
                  <p className="text-sm font-medium">
                    {i === 0
                      ? "Getting stronger through mentorship"
                      : "Raise a Sound"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {i === 0 ? "July 25, 2020" : "Feb 20, 2022"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NEWSLETTER */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-500">+</span> Newsletter
          </h3>

          <p className="text-sm text-white mb-4">
            Stay updated with our latest news and events.
          </p>

          <div className="max-w-md mx-auto p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}

                type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                Subscribe
              </motion.button>
            </form>
            {message && <p className="mt-3 text-sm text-blue-900">{message}</p>}
          </div>


        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="border-t border-gray-700 py-4 px-6 flex flex-col md:flex-row justify-between text-sm text-gray-400"
      >
        <p>Copyrights © 2026 F.A.M.E Untold.</p>

        <div className="space-x-4 mt-2 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span>/</span>
          <span className="hover:text-white cursor-pointer">Sermons</span>
          <span>/</span>
          <span className="hover:text-white cursor-pointer">Contact Us</span>
        </div>
      </motion.div>
    </motion.footer>
  );
}