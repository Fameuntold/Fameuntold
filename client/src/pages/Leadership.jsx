import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import ceo2 from '../assets/ceo2.png'
import vol3 from "../assets/vol3.jpeg";
import vol1 from "../assets/vol1.jpeg";
import { useNavigate } from "react-router-dom";

export default function Leadership() {

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
                            Leadership
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Meet the passionate leaders guiding the vision and impact of F.A.M.E Untold.
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


            {/* INTRO */}
            <div className="w-full mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold text-purple-900 mb-4">
                    Our Leadership Team
                </h2>
                <p className="text-gray-700 text-start md:text-center flex leading-relaxed mb-3 w-[85%] ml-0 md:ml-[6rem]">

                    While young people possess immense potential, many lack the leadership
                    skills and practical capacities needed to translate that potential into positive
                    impact. Educational systems often focus on academic achievement while
                    neglecting character formation, leadership development, and life skills.
                    As a result, many youths are unprepared to take on leadership responsibilities
                    or contribute meaningfully to their communities. This leadership gap has
                    long-term implications for societal development, as the absence of valuedriven
                    leaders perpetuates cycles of poor governance, social injustice, and
                    underdevelopment.

                    Our leadership is built on integrity, service, and a shared commitment to raising a generation of purpose-driven individuals. Each leader brings unique gifts and experiences that contribute to the growth and impact of the organization.
                </p>
               
            </div>

            {/* LEADERS GRID */}
            <div className="max-w-6xl mx-auto px-6 pb-16 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

                {/* LEADER CARD */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                    <img
                        src={ceo2}
                        alt="leader"
                        className="w-full h-64 "
                    />
                    <div className="p-6">
                        <h3 className="font-bold text-lg">Emmanuel A. Oluwafemi</h3>
                        <p className="text-sm text-purple-700 mb-2">Founder / President</p>
                        <p className="text-gray-600 text-sm">
                            Passionate about youth empowerment and spiritual growth, leading with vision and purpose.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                    <img
                        src={vol1}
                        alt="leader"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="font-bold text-lg">Olaitan Makinde </h3>
                        <p className="text-sm text-purple-700 mb-2">Program Director</p>
                        <p className="text-gray-600 text-sm">
                            Oversees programs and ensures impactful delivery across all initiatives.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                    <img
                        src={vol3}
                        alt="leader"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="font-bold text-lg">Adeboye A. Iyinrere</h3>
                        <p className="text-sm text-purple-700 mb-2">Community Lead</p>
                        <p className="text-gray-600 text-sm">
                            Builds strong relationships and drives community engagement initiatives.
                        </p>
                    </div>
                </div>

            </div>

            {/* CTA */}
            <div className="bg-[#16002E] text-white py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Become a Leader
                </h2>
                <p className="mb-6 opacity-90">
                    Join us in raising the next generation of impactful leaders.
                </p>
                <button onClick={() => navigate("/register")} className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold">
                    Get Involved
                </button> 
            </div>

        </div>
    );
}
