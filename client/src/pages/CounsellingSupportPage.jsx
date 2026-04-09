import React from "react";
import IMG16 from "../assets/IMG16.PNG";
import { useNavigate } from "react-router-dom";

export default function CounsellingSupportPage() {

    const navigate =useNavigate()
    return (
        <div className="min-h-screen bg-gray-50  ">
            <div >
                {/* Header */}
                <div
                    className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
                    style={{ backgroundImage: `url(${IMG16})` }}
                >
                    <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

                    <div className="relative z-10 w-full flex justify-between items-center">

                        <div className="max-w-xl text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Counselling & Support
                            </h1>

                            <div className="flex items-start gap-4">
                                <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

                                <p className="text-gray-200">
                                    You are not alone. We are here to walk with you through every season of life.
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


                {/* Services */}
                <div className="mb-12 w-full px-12">
                    <h2 className="text-4xl text-purple-800 font-bold mb-6 text-center mt-15">What We Offer</h2>

                    {/* Intro */}
                    <div className="ml-0 md:ml-[8rem] mb-10">
                        <p className="text-gray-700 text-start md:text-center w-[90%] leading-relaxed">
                            At our ministry, we believe that everyone deserves care, understanding, and support
                            no matter what they are going through. Life can bring challenges such as stress, grief,
                            relationship struggles, or spiritual doubts, and we are here to help.
                            Recognizing the emotional and psychological challenges faced by young
                            people, F.A.M.E Untold will provide counseling services and support groups.
                            These safe spaces will allow youths to express themselves freely, receive
                            guidance, and find healing in a supportive and faith-centered environment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Pastoral Counselling",
                                desc: "Guidance rooted in Scripture and prayer to help you navigate life’s challenges."
                            },
                            {
                                title: "Emotional & Mental Support",
                                desc: "Compassionate listening and encouragement for anxiety, depression, and personal struggles."
                            },
                            {
                                title: "Relationship & Family Support",
                                desc: "Support for couples and families to strengthen love and communication."
                            },
                            {
                                title: "Prayer & Spiritual Guidance",
                                desc: "Dedicated time for prayer and spiritual growth."
                            },
                            {
                                title: "Grief & Loss Support",
                                desc: "Care and comfort during times of loss and mourning."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-100 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-12">
                    {/* Approach */}
                    <div className="bg-amber-600 rounded-2xl shadow-md p-6 mb-12">
                        <h2 className="text-2xl text-gray-50 font-semibold mb-4">Our Approach</h2>
                        <ul className="space-y-2 text-gray-100">
                            <li>• Confidential and respectful</li>
                            <li>• Compassionate and non-judgmental</li>
                            <li>• Faith-based and practical</li>
                        </ul>
                    </div>

                    {/* Who */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Who Can Access This Service?</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Members of the ministry</li>
                            <li>Visitors and newcomers</li>
                            <li>Individuals, couples, and families</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="bg-[#16002E] text-white rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Get Support</h2>
                        <p className="mb-6">Reach out to us to book a counselling session or request prayer.</p>

                        <div className="space-y-2">
                            <p>📞 Phone: <span className="font-medium">+2348147978747</span></p>
                            <p>📧 Email: <span className="font-medium">Fameuntold@gmail.com</span></p>
                           
                        </div>

                        <button onClick={()=>navigate('/contact-page')} className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                            Book Appointment
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-10 text-gray-500 text-sm">
                        <p>
                            If you are in urgent need, please contact local emergency services or a healthcare provider immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
