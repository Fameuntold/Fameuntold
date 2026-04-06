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

            <div className="relative grid md:grid-cols-2 ml-[4rem] items-center min-h-screen px-8 md:px-20">

                {/* LEFT CONTENT */}
                <motion.div
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                        Who We Are
                    </h1>

                    <span className="text-3xl md:text-5xl text-gray-800 mb-6 block">
                        Our mission is to share the Good of Jesus Christ, loving, faith and serving.
                    </span>

                    <p className="text-gray-600 mt-3 max-w-lg mb-8">
                       The organization operates with the understanding that young people are not just leaders of tomorrow but key stakeholders of today. We recognize their ideas, energy, and creativity as essential to shaping the present and driving meaningful change in our communities. By providing platforms for engagement, skill development, and mentorship, we empower young people to take active roles in decision-making, innovation, and social impact.
                    </p>

                    <button onClick={()=>navigate('/mission')} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-md">
                        Learn More
                    </button>
                </motion.div>

                {/* RIGHT IMAGE SECTION */}
                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative flex justify-center items-center mt-10 md:mt-0"
                >
                    {/* Background shape */}
                    <div className="absolute w-[280px] md:w-[460px] h-[420px] md:h-[520px] -bottom-10 right-40 bg-purple-400 polygon"></div>

                    {/* Image with zoom */}
                    <motion.div
                        variants={imageZoom}
                        className="relative w-[260px] md:w-[440px] h-[400px] md:h-[500px] overflow-hidden"
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