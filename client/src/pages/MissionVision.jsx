import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import mis1 from "../assets/mis1.jpeg";
import mis2 from "../assets/mis2.jpeg";
import { useNavigate } from "react-router-dom";

export default function MissionVision() {


     const navigate = useNavigate();
    
    return (
        <div className="bg-gray-50">

            {/* HERO SECTION */}

            <div
                className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
                style={{ backgroundImage: `url(${IMG16})` }}
            >
                <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

                <div className="relative z-10 w-full flex justify-between items-center">

                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Mission & Vision
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Guiding purpose, shaping lives, and building a future grounded in faith, leadership, and impact.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
                        <p onClick={() => navigate('/')} className="text-sm font-semibold text-gray-600">
                            HOME <span className="mx-2">|</span>
                            <span className="text-orange-500">ABOUT US</span>
                        </p>
                    </div>
                </div>
            </div>


            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

                {/* MISSION */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-purple-900 mb-4">
                            Our Mission
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-2">
                            Our mission is to empower young people to live purpose-driven lives rooted in biblical principles, strong character, and transformational leadership.

                        </p>

                        <p className="text-gray-700 leading-relaxed mb-2">
                            Through mentorship, worship, community outreach, and leadership development, we are committed to raising individuals who will positively influence their generation and reflect the values of Christ in every area of life.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            To provide young people with the tools they
                            need to succeed in life by incorporating biblical principles into their daily
                            lives. This mission is pursued through the organization of conferences,
                            worship events, seminars, and entertainment events that educate, empower,
                            and inspire young people to become leaders committed to positive societal
                            transformation.
                            Through intentional mentorship, counseling, and training programs, F.A.M.E
                            Untold guides young people toward discovering their purpose and potential
                            while instilling core values such as integrity, compassion, excellence, and
                            service to others.
                        </p>
                    </div>

                    <div>
                        <img
                            src={mis1}
                            alt="mission"
                            className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                        />
                    </div>
                </div>

                {/* VISION */}
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <div className="order-2 md:order-1">
                        <img
                            src={mis2}
                            alt="vision"
                            className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                        />
                    </div>

                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-purple-900 mb-4">
                            Our Vision
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-2">
                            Our vision is to raise a generation of spiritually grounded, morally sound, and purpose-driven leaders who will transform society.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-2">
                            We envision a world where young people walk in truth, live with integrity, and boldly impact their communities through faith, excellence, and service.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            To raise a generation of young people who are grounded in biblical principles,
                            empowered to make a positive impact in their communities, and equipped to
                            build a better future for themselves and others.
                            This vision reflects F.A.M.E Untold’s long-term aspiration to see young people
                            transformed from within and positioned to influence the world around them. It
                            emphasizes spiritual grounding, personal empowerment, communal
                            responsibility, and sustainable impact.
                        </p>
                    </div>
                </div>

                {/* CORE VALUES */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-purple-900 mb-10">
                        Our Core Values
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-center">

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-lg mb-2">Faith</h3>
                            <p className="text-gray-600 text-sm">
                                Living by God’s word and trusting His direction in all things.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-lg mb-2">Leadership</h3>
                            <p className="text-gray-600 text-sm">
                                Raising leaders who inspire change and influence society positively.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-lg mb-2">Integrity</h3>
                            <p className="text-gray-600 text-sm">
                                Upholding strong moral principles in every aspect of life.
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* CTA */}
            <div className="bg-[#16002E] text-white py-16 text-center mb-22">
                <h2 className="text-3xl font-bold mb-4">
                    Join Our Mission
                </h2>
                <p className="mb-6 opacity-90">
                    Be part of a movement that is transforming lives and shaping the future.
                </p>
                <button onClick={() => navigate("/register")} className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold">
                    Get Involved
                </button>
            </div>

        </div>
    );
}
