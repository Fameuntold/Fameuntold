import React from "react";
import ceo2 from "../assets/ceo2.PNG";
import IMG16 from "../assets/IMG16.PNG";
import { useNavigate } from "react-router-dom";


export default function MentorshipDiscipleship() {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100">

            {/* HERO */}
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




            {/* MAIN SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* HEADER */}
                <div>
                    <div className="mb-16 max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-purple-950 leading-tight mb-6">
                            We Raise Purpose-Driven Believers Through Intentional Guidance
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At F.A.M.E Untold, mentorship and discipleship are more than programs—they are a lifestyle.
                            We walk closely with young people, helping them grow spiritually, build strong character,
                            and discover their purpose through biblical truth.
                        </p>
                    </div>

                </div>
                {/* CONTENT GRID */}
                <div className="grid md:grid-cols-3 gap-12">

                    {/* LEFT */}
                    <div>
                        <div className="text-6xl font-extrabold text-purple-300 mb-4">M</div>
                        <p className="text-gray-600 leading-relaxed">
                            Mentorship at F.A.M.E Untold focuses on building meaningful relationships that guide individuals through life’s challenges. Through one-on-one sessions and group engagements, we provide direction, accountability, and encouragement.
                        </p>

                        <div className="flex items-center gap-4 mt-10">
                            <img
                                src={ceo2}
                                className="w-14 h-14 rounded-full object-cover shadow"
                                alt="leader"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-900">Leadership Team</h4>
                                <p className="text-sm text-gray-500">Spiritual Mentors</p>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE */}
                    <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                            Our discipleship model is structured to ensure consistent spiritual growth. We emphasize prayer, study of the Word, and practical application of biblical principles in everyday life.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Through teachings, discussions, and accountability systems, individuals are nurtured into maturity and equipped to live intentionally.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                            We create safe and supportive environments where young people can express themselves, ask questions, and receive guidance without fear or judgment.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Our goal is to raise believers who are spiritually grounded, emotionally stable, and impactful in every sphere of life.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Start Your Growth Journey
                </h2>
                <p className="mb-6 text-gray-300">
                    Join a mentorship and discipleship community that transforms lives.
                </p>
                <button onClick={() => navigate("/register")} className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-semibold">
                    Join Now
                </button>
            </div>

        </div>
    );
}