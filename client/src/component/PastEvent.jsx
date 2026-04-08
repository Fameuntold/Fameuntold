import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GiChainedArrowHeads } from "react-icons/gi";

// IMAGES
import IMG1 from "../assets/IMG1.PNG";
import IMG2 from "../assets/IMG2.PNG";
import IMG3 from "../assets/IMG3.PNG";
import IMG4 from "../assets/IMG4.PNG";
import pics3 from "../assets/pics3.jpeg";

// VIDEOS
import vid1 from "../assets/vid1.MOV";
import vid2 from "../assets/vid2.MOV";
import vid3 from "../assets/vid3.MOV";
import vid4 from "../assets/vid4.MOV";

/* ANIMATIONS */
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

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const modalVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
    },
};

export default function PastEvent() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    const videos = [
        { thumbnail: pics3, video: vid1 },
        { thumbnail: IMG2, video: vid2 },
        { thumbnail: IMG3, video: vid3 },
        { thumbnail: IMG4, video: vid4 },
    ];

    const openVideo = (video) => {
        setCurrentVideo(video);
        setIsOpen(true);
    };

    const closeVideo = () => {
        setIsOpen(false);
        setCurrentVideo("");
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <div className="bg-gray-100 min-h-screen pt-20 py-10 px-4">
            <motion.div
                className="max-w-7xl mx-auto relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >

                {/* MAIN CARD */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden grid md:grid-cols-2">

                    {/* IMAGE */}
                    <motion.div
                        variants={slideLeft}
                        className="relative"
                    >
                        <img
                            src={IMG1}
                            className="w-full h-full object-cover"
                            alt=""
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="border border-white/40 w-40 h-40 flex items-center justify-center">
                                <div
                                    onClick={() => openVideo(vid1)}
                                    className="bg-orange-500 w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition"
                                >
                                    <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[10px] border-y-transparent ml-1" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* TEXT */}
                    <motion.div
                        variants={slideRight}
                        className="p-10 flex flex-col justify-center"
                    >
                        <p className="text-orange-500 font-semibold mb-3">
                            Aug 12, 2026
                        </p>

                        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
                            When our power of choice
                        </h1>

                        <p className="text-gray-600 leading-relaxed text-[15px]">
                            When choice is guided by clarity, purpose, and the right support system...
                        </p>
                    </motion.div>
                </div>

                {/* VIDEO GRID */}
                <motion.div
                    variants={staggerContainer}
                    className="grid md:grid-cols-4 gap-6 mt-10"
                >
                    {videos.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            className="relative group cursor-pointer overflow-hidden"
                            onClick={() => openVideo(item.video)}
                        >
                            <img
                                src={item.thumbnail}
                                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                                alt=""
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="border border-white/40 w-24 h-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <div className="bg-orange-500 w-12 h-12 flex items-center justify-center">
                                        <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* MODAL */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <motion.div
                            variants={modalVariant}
                            initial="hidden"
                            animate="visible"
                            className="relative w-[90%] md:w-[700px]"
                        >
                            <button
                                onClick={closeVideo}
                                className="absolute -top-10 right-0 text-white text-2xl hover:text-red-400"
                            >
                                ✕
                            </button>

                            <video
                                src={currentVideo}
                                controls
                                autoPlay
                                className="w-full rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}