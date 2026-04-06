import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import lead1 from "../assets/lead1.jpeg";
import lead2 from "../assets/lead2.jpeg";
import { useNavigate } from "react-router-dom";

export default function LeadershipCapacity() {

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
                            Leadership & Capacity Building
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Raising equipped, confident, and purpose-driven leaders for impact in every sphere of life.
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


            {/* SECTION 1 */}
            <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

                {/* TEXT */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Building Strong Leaders
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        At F.A.M.E Untold, leadership development is central to our mission. We are committed to raising individuals who lead with integrity, purpose, and excellence in every area of life.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Through mentorship, training, and practical exposure, we equip young people with the tools needed to become effective leaders in their communities and beyond.
                    </p>
                </div>

                {/* IMAGE */}
                <div>
                    <img
                        src={lead2}
                        className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                        alt="leadership"
                    />
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                    {/* IMAGE */}
                    <div>
                        <img
                            src={lead1}
                            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                            alt="training"
                        />
                    </div>

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Capacity Building & Growth
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            We provide structured training programs, workshops, and real-life opportunities that help individuals develop practical skills and competence.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our focus is to empower young people with knowledge, confidence, and the ability to contribute meaningfully to society while staying grounded in godly values.
                        </p>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What We Offer
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Leadership Training</h3>
                        <p className="text-gray-600 text-sm">
                            Equipping individuals with leadership principles, communication skills, and strategic thinking.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Skill Development</h3>
                        <p className="text-gray-600 text-sm">
                            Providing opportunities to learn practical and vocational skills for self-development.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Mentorship Support</h3>
                        <p className="text-gray-600 text-sm">
                            Continuous guidance and accountability to ensure growth and long-term impact.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Step Into Leadership
                </h2>
                <p className="text-gray-300 mb-6">
                    Join us in building a generation of impactful and purpose-driven leaders.
                </p>
                <button onClick={() => navigate("/register")} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">
                    Get Started
                </button>
            </div>

        </div>
    );
}