import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import form1 from "../assets/form1.jpeg";
import form2 from "../assets/form2.jpeg";
import { useNavigate } from "react-router-dom";

export default function WorshipSpiritualFormation() {

    const navigate = useNavigate()
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
                            Worship & Spiritual Formation
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                            <p className="text-gray-200">
                                Worship will be presented as both an
                                expression and a lifestyle that influences everyday choices.
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
            <div className="max-w-6xl  mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

                {/* TEXT */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        A Lifestyle of Worship
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        At F.A.M.E Untold, worship goes beyond music—it is a lifestyle. We create
                        atmospheres where young people can encounter God genuinely and grow
                        in their relationship with Him.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Through intentional worship gatherings, prayer moments, and spiritual
                        encounters, individuals are drawn into deeper intimacy with God.
                    </p>
                </div>

                {/* IMAGE */}
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1507692049790-de58290a4334"
                        className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                        alt="worship"
                    />
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="bg-[#0b1c2c] py-20">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                    {/* IMAGE */}
                    <div>
                        <img
                            src={form1}
                            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                            alt="prayer"
                        />
                    </div>

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Spiritual Formation & Growth
                        </h2>
                        <p className="text-gray-100 leading-relaxed mb-6">
                            We guide young people through structured spiritual disciplines such as
                            prayer, Bible study, and devotion, helping them grow in faith and
                            understanding.
                        </p>
                        <p className="text-gray-100 leading-relaxed">
                            Our focus is to raise believers who are spiritually grounded,
                            disciplined, and able to live out their faith boldly in everyday life.
                        </p>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What We Focus On
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Worship Gatherings</h3>
                        <p className="text-gray-600 text-sm">
                            Creating powerful moments of worship that bring people into God's presence.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Prayer & Devotion</h3>
                        <p className="text-gray-600 text-sm">
                            Encouraging consistent prayer lives and personal devotion habits.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl shadow-md border hover:shadow-xl transition">
                        <h3 className="font-semibold text-lg mb-3">Biblical Teaching</h3>
                        <p className="text-gray-600 text-sm">
                            Teaching the Word of God in practical ways for everyday living.
                        </p>
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Grow Deeper in Your Faith
                </h2>
                <p className="text-gray-300 mb-6">
                    Join a community committed to spiritual growth and transformation.
                </p>
                <button onClick={() => navigate("/register")} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold">
                    Join Us
                </button>

            </div>

        </div>
    );
}
