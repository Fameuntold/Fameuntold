import React from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG"; // update path as needed

export default function TalentDevelopmentPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-200 text-gray-800">
            {/* Hero Section */}
            <div
                className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
                style={{ backgroundImage: `url(${IMG16})` }}
            >
                <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

                <div className="relative z-10 w-full flex justify-between items-center">
                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Talent & Development
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Discover, grow, and use your God-given gifts to make impact in the ministry and beyond.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
                        <p
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-gray-600"
                        >
                            HOME <span className="mx-2">|</span>
                            <span className="text-orange-500">MINISTRIES</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Intro */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
                    <p className="text-gray-700 leading-relaxed">
                        We are dedicated to helping individuals discover their unique gifts, develop their skills,
                        and maximize their potential for God’s work. Everyone has something valuable to contribute,
                        and we are here to help you grow and thrive.
                        To promote self-sufficiency, the organization will offer training opportunities
                        in various skill areas relevant to today’s economy. These may include digital
                        skills, entrepreneurship, creative arts, and vocational training, empowering
                        young people to become economically productive and independent.
                    </p>
                </div>

                {/* Programs */}
                <div className="mb-12">
                    <h2 className="text-2xl text-purple-800 font-semibold mb-6">What We Offer</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Talent Discovery",
                                desc: "Helping you identify your strengths, passions, and spiritual gifts."
                            },
                            {
                                title: "Skill Development",
                                desc: "Training programs and workshops to grow your abilities."
                            },
                            {
                                title: "Leadership Training",
                                desc: "Equipping future leaders with practical and spiritual guidance."
                            },
                            {
                                title: "Mentorship",
                                desc: "One-on-one guidance from experienced leaders."
                            },
                            {
                                title: "Creative Arts",
                                desc: "Opportunities in music, media, drama, and design."
                            },
                            {
                                title: "Service Opportunities",
                                desc: "Platforms to serve and apply your talents in ministry."
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Approach */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Purpose-driven development</li>
                        <li>• Continuous learning and growth</li>
                        <li>• Practical application of skills</li>
                        <li>• Faith-centered mentorship</li>
                    </ul>
                </div>

                {/* Who */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Who Can Join?</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Youths and young adults</li>
                        <li>Professionals and creatives</li>
                        <li>Anyone willing to grow and serve</li>
                    </ul>
                </div>

                {/* CTA */}
                <div className="bg-[#16002E] text-white rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Start Your Growth Journey</h2>
                    <p className="mb-6">
                        Join our Talent & Development programs and begin to unlock your full potential.
                    </p>

                    <button onClick={() => navigate("/register")} className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                        Join Now
                    </button>

                </div>
            </div>
        </div>
    );
}
