import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";

const faqs = [
    {
        question: "How can I join as a mentee?",
        answer: "You can register through our registration page and select 'Mentee'. Our team will match you with a suitable mentor."
    },
    {
        question: "What does a mentor do?",
        answer: "Mentors provide guidance, accountability, and support to help individuals grow spiritually, personally, and professionally."
    },
    {
        question: "How can I volunteer?",
        answer: "Visit the registration page and select 'Volunteer'. You’ll be contacted with available opportunities to serve."
    },
    {
        question: "Can organizations partner with you?",
        answer: "Yes, we welcome partnerships. Register as a partner and share your organization details with us."
    },
    {
        question: "Are your programs free?",
        answer: "Most of our programs are free, but some specialized trainings or events may require a small fee."
    }
];

export default function FAQPage() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                            Frequently Asked Questions
                        </h1>

                        <div className="flex items-start gap-4">
                            <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>
                            <p className="text-gray-200">
                                Find answers to common questions about our programs, volunteering, mentorship, and partnerships.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
                        <p
                            onClick={() => navigate("/")}
                            className="text-sm font-semibold text-gray-600"
                        >
                            HOME <span className="mx-2">|</span>
                            <span className="text-orange-500">FAQ</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Got Questions?
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow p-5 cursor-pointer transition"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">
                                    {faq.question}
                                </h3>
                                <span className="text-orange-500 text-xl">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            {openIndex === index && (
                                <p className="text-gray-600 mt-4">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0b1c2c] text-white py-16 text-center px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Still Have Questions?
                </h2>
                <p className="text-gray-300 mb-6">
                    Reach out to us and we’ll be happy to assist you.
                </p>
                <button onClick={()=>navigate('/contact-page')} className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                    Contact Us
                </button>
            </div>

        </div>
    );
}
