import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import { useNavigate } from "react-router-dom";

export default function AimsObjectives() {

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
                            Aims & Objectives
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Our guiding principles that shape our mission, programs, and impact.
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

            {/* CONTENT SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

                {/* IMAGE */}
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65"
                        alt="bible"
                        className="rounded-xl w-full h-[400px] object-cover"
                    />
                </div>

                {/* TEXT */}
                <div>
                    <p className="uppercase text-sm tracking-widest text-gray-500 mb-2">
                        Core Focus
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        Aims and Objectives
                    </h2>

                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To provide mentorship and guidance to youths using biblical principles, helping them build a solid foundation for their future.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To create a community of like-minded individuals who support and encourage one another toward personal and spiritual growth.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To organize conferences and strategic meetings that facilitate learning and development across diverse social media platforms.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To promote worship and create environments where young people can encounter God and develop deeper relationships with Him.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To foster leadership skills and empower young people to become responsible leaders in their respective fields.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To provide training opportunities and resources that enable young people to develop practical skills and become self-sufficient.
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✔</span>
                            <p>
                                To create safe spaces where young people can share their challenges and experiences and receive emotional and psychological support.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#16002E] text-white py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Be Part of the Vision
                </h2>
                <p className="mb-6 opacity-90">
                    Join us as we empower lives and build a stronger generation.
                </p>
                <button onClick={() => navigate("/register")} className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold">
                    Get Involved
                </button>
            </div>

        </div>
    );
}