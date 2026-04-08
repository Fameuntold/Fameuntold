import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/* CATEGORIES */
const categories = ["Worship", "Teachings", "Mentorship", "Prayer", "Sermons"];

/* ANIMATIONS */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MediaPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMedia, setActiveMedia] = useState(null);

  /* FETCH FROM BACKEND */
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://fameuntold.vercel.app/api/media/getMedia"
      );
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* FILTER */
  const filteredPosts = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-2xl font-bold mb-2">Tag: Media & Teachings</h1>
        <p className="text-sm text-gray-600 mb-6">
          Explore sermons, worship moments, and teachings.
        </p>
      </div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6"
      >

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="bg-white p-6 text-center text-gray-500 text-sm">
              No media available at this time
            </div>
          ) : (
            filteredPosts.map((event, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex gap-4 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                {/* IMAGE */}
                <div
                  className="w-32 h-24 bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage: `url(${
                      event.image?.startsWith("http")
                        ? event.image
                        : `https://fameuntold.vercel.app/${event.image}`
                    })`,
                  }}
                />

                {/* TEXT */}
                <div className="flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {event.title}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {event.createdAt
                      ? new Date(event.createdAt).toDateString()
                      : ""}
                  </p>

                  <button
                    onClick={() =>
                      setActiveMedia({
                        ...event,
                        type: event.type || "video",
                        src: event.src || event.mediaUrl || "",
                      })
                    }
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    {(event.type || "video") === "video"
                      ? "Watch (Mp4)"
                      : "Listen (Mp3)"}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <motion.div variants={fadeUp} className="space-y-6">

          {/* SEARCH */}
          <div className="bg-white p-4 shadow-sm">
            <input
              type="text"
              placeholder="Find Gospel songs/artist/lyrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* TRENDING */}
          <div className="bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">
              Trending Gospel Songs 🔥
            </h3>

            <div className="space-y-3 text-sm">
              {events.slice(0, 5).map((event, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div
                    className="w-12 h-12 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        event.image?.startsWith("http")
                          ? event.image
                          : `https://fameuntold.vercel.app/${event.image}`
                      })`,
                    }}
                  />
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {event.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TOP PICKS */}
          <div className="bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">Top Picks 🔥</h3>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg max-w-xl w-full relative"
            >
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-2 right-3 text-xl"
              >
                ✕
              </button>

              <h3 className="text-lg font-semibold mb-4">
                {activeMedia.title}
              </h3>

              {activeMedia.type === "video" ? (
                <video controls className="w-full rounded">
                  <source src={activeMedia.src} type="video/mp4" />
                </video>
              ) : (
                <audio controls className="w-full">
                  <source src={activeMedia.src} type="audio/mpeg" />
                </audio>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}