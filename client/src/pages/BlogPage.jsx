import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";
import lead2 from "../assets/lead2.jpeg";
import mis1 from "../assets/mis1.jpeg";

const posts = [
  {
    title: "Building a Life of Purpose",
    date: "Oct 25, 2025",
    excerpt:
      "Discover how to align your life with purpose and live intentionally every day.",
    image: mis1,
  },
  {
    title: "The Power of Mentorship",
    date: "Oct 20, 2025",
    excerpt:
      "Mentorship can shape destinies. Learn why it matters and how to get involved.",
    image: lead2,
  },
  {
    title: "Growing Spiritually in a Busy World",
    date: "Oct 15, 2025",
    excerpt:
      "Practical ways to stay spiritually grounded despite life’s demands.",
    image: IMG16,
  },
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on search
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${IMG16})` }}
      >
        <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

        <div className="relative z-10 w-full flex justify-between items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & Insights
            </h1>

            <div className="flex items-start gap-4">
              <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>
              <p className="text-gray-200">
                Read inspiring articles, teachings, and insights for your growth journey.
              </p>
            </div>
          </div>

          <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
            <p
              onClick={() => navigate("/")}
              className="text-sm font-semibold text-gray-600"
            >
              HOME <span className="mx-2">|</span>
              <span className="text-orange-500">BLOG</span>
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {/* POSTS */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-2 bg-white p-6 text-center text-gray-500">
              No post available at this time
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="col-span-2 bg-white p-6 text-center text-gray-500">
              No results found
            </div>
          ) : (
            filteredPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>

                <div className="p-6">
                  <span className="text-xs text-purple-500 font-semibold">
                    {post.date}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-gray-800">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {post.excerpt}
                  </p>

                  <button className="mt-4 text-purple-500 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          {/* SEARCH */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* CATEGORIES */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-orange-500 cursor-pointer">Spiritual Growth</li>
              <li className="hover:text-orange-500 cursor-pointer">Leadership</li>
              <li className="hover:text-orange-500 cursor-pointer">Mentorship</li>
              <li className="hover:text-orange-500 cursor-pointer">Faith</li>
            </ul>
          </div>

          {/* RECENT POSTS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>Walking in Purpose</p>
              <p>Faith in Difficult Times</p>
              <p>Becoming a Leader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
