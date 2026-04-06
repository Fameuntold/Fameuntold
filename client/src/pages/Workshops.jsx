import React from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";
import skill1 from "../assets/skill1.jpeg";

export default function Workshops() {
    const navigate = useNavigate();

    return (
        <div className="bg-white">

            {/* HERO */}
            <div
                className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
                style={{ backgroundImage: `url(${IMG16})` }}
            >
                <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

                <div className="relative z-10 w-full flex justify-between items-center">
                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Workshops
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Empowering young people with practical skills, knowledge, and real-life experiences for impact.
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

            {/* SECTION 1 */}
            <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Practical Learning Experiences
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our workshops are designed to provide hands-on learning experiences that equip young people with relevant skills for personal growth and real-world impact.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        We focus on bridging the gap between knowledge and application, ensuring participants gain both understanding and practical ability.
                    </p>
                </div>

                <div>
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                        className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                        alt="workshop"
                    />
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                    <div>
                        <img
                            src={skill1}
                            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                            alt="training"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Skill Development & Training
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We offer a wide range of workshops covering leadership, personal development, career growth, and creative skills.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Each session is structured to be interactive, engaging, and impactful, helping participants build confidence and competence.
                        </p>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Our Workshop Focus Areas
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Leadership Skills</h3>
                        <p className="text-gray-600 text-sm">
                            Developing strong leadership qualities and decision-making abilities.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Career Development</h3>
                        <p className="text-gray-600 text-sm">
                            Preparing individuals for career opportunities and professional growth.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Creative & Practical Skills</h3>
                        <p className="text-gray-600 text-sm">
                            Encouraging creativity and teaching hands-on skills for real-world application.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Join Our Next Workshop
                </h2>
                <p className="text-gray-300 mb-6">
                    Gain valuable skills and grow through our impactful training sessions.
                </p>
                <button onClick={() => navigate("/register")} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">
                    Register Now
                </button> 

            </div>

        </div>
    );
}