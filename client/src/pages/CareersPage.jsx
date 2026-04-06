import React from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";

const jobs = [
    {
        title: "Program Coordinator",
        location: "Lagos, Nigeria",
        type: "Full Time",
        desc: "Coordinate mentorship and leadership programs, ensuring smooth execution and impact."
    },
    {
        title: "Volunteer Manager",
        location: "Remote",
        type: "Part Time",
        desc: "Manage and support volunteers across different initiatives and events."
    },
    {
        title: "Media & Content Creator",
        location: "Abuja, Nigeria",
        type: "Contract",
        desc: "Create engaging media content including videos, graphics, and social media posts."
    }
];

export default function CareersPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* HERO */}
            <div
                className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
                style={{ backgroundImage: `url(${IMG16})` }}
            >
                <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

                <div className="relative z-10 w-full flex justify-between items-center">
                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Join Our Team
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>
                            <p className="text-gray-200">
                                Be part of a mission-driven team committed to transforming lives and raising leaders.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
                        <p
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-gray-600"
                        >
                            HOME <span className="mx-2">|</span>
                            <span className="text-orange-600">CAREERS</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* INTRO */}
            <div className="max-w-4xl mx-auto text-center py-16 px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Work With Purpose
                </h2>
                <p className="text-gray-600">
                    At our organization, we believe in purpose-driven work. Whether you're leading programs,
                    supporting operations, or creating content, your work contributes to meaningful impact.
                </p>
            </div>

            {/* JOB LISTINGS */}
            <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">
                {jobs.map((job, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>

                        <div className="flex gap-4 text-sm text-gray-500 mb-4">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                        </div>

                        <p className="text-gray-600 mb-6">{job.desc}</p>

                        <button onClick={()=>navigate('/contact-page')} className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-500 transition">
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-16 text-center px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Don’t See a Role That Fits?
                </h2>
                <p className="text-gray-300 mb-6">
                    We’re always looking for passionate individuals. Reach out and tell us how you can contribute.
                </p>
                <button className="bg-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition">
                    Contact Us
                </button>
            </div>

        </div>
    );
}
