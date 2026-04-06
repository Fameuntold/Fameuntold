import React from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";
import { HeartHandshake, Users, Sparkles } from "lucide-react";

const Section = ({ children }) => (
    <section className="max-w-6xl mx-auto px-6 py-16">
        {children}
    </section>
);

const Card = ({ icon: Icon, title, text }) => (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <Icon className="w-10 h-10 text-orange-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{text}</p>
    </div>
);

export default function VolunteerPage() {
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
                            Volunteer With Us
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Use your time, skills, and passion to make meaningful impact and transform lives.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
                        <p
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-gray-600"
                        >
                            HOME <span className="mx-2">|</span>
                            <span className="text-orange-500">GET INVOLVED</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* INTRO */}
            <div className="bg-gray-50">
                <Section>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Be Part of Something Bigger
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Volunteering with us is more than service — it’s a calling to impact lives, build community, and grow spiritually while making a difference.
                        </p>
                    </div>
                </Section>

                {/* WHY VOLUNTEER */}
                <Section>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card
                            icon={HeartHandshake}
                            title="Make Impact"
                            text="Touch lives and bring hope to young people through meaningful service."
                        />

                        <Card
                            icon={Users}
                            title="Build Community"
                            text="Connect with like-minded individuals and grow in a supportive environment."
                        />

                        <Card
                            icon={Sparkles}
                            title="Grow Personally"
                            text="Develop leadership skills, character, and spiritual depth."
                        />
                    </div>
                </Section>

                {/* ROLES */}
                <Section>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Volunteer Opportunities
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Event Support",
                                desc: "Help organize and manage conferences, workshops, and outreach programs."
                            },
                            {
                                title: "Mentorship Support",
                                desc: "Assist in guiding and supporting young people in mentorship programs."
                            },
                            {
                                title: "Media & Creative",
                                desc: "Use your creative skills in media, design, and content creation."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* CTA */}
                <Section>
                    <div className="bg-[#0b1c2c] text-white rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Volunteer?
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Join us today and start making a difference in the lives of others.
                        </p>

                        <button onClick={()=>navigate('/register')} className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold">
                            Join Our Team
                        </button>
                    </div>
                </Section>

            </div>
        </div>
    );
}