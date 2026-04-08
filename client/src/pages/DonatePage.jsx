import React, { useState } from "react";
import visa from "../assets/visa.png";
import verve from "../assets/verve.png";
import logo from "../assets/logo.png";

export default function DonatePage() {
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handlePaystack = () => {
        if (!amount || !email) return alert("Enter amount and email");

        const handler = window.PaystackPop.setup({
            key: "YOUR_PAYSTACK_PUBLIC_KEY",
            email,
            amount: amount * 100,
            currency: "NGN",
            callback: function (response) {
                alert("Payment successful! Ref: " + response.reference);
            },
            onClose: function () {
                alert("Transaction cancelled");
            }
        });

        handler.openIframe();
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">

            {/* LEFT PANEL */}
            <div className="bg-[#dbe7ef] flex flex-col justify-center text-center px-6">

                {/* MINISTRY NAME */}

                <div className="w-full mt-5 flex items-center flex-col">
                    <img className="w-16 h-16" src={logo} alt="" />
                    <h6 className="text-purple-900 font-bold">FAME UNTOLD</h6>
                </div>
              
                <p className="text-gray-600 mb-10">
                    SUPPORT THE MISSION
                </p>

                {/* TRANSFER */}
                <div className="bg-white flex flex-col items-start p-8 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900"> Bank Transfer </h2>
                    <p className="text-gray-600 mb-6"> You can support us directly via bank transfer using the details below: </p>
                    <div className="flex flex-col items-start space-y-3 text-gray-700">
                        <p><strong>Bank Name:</strong>FCMB</p>
                        <p><strong>Account Name:</strong> FAME UNTOLD</p>
                        <p><strong>Account Number:</strong> 8708910019</p>
                    </div>
                </div>

                {/* PAYMENT FOOTER */}
                <div className="mt-10 text-sm text-gray-600 text-center">
                    <p className="mb-4">🔒 Secured by Paystack</p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <img
                            src={visa}
                            alt="Visa"
                            className="h-15"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            className="h-8"
                        />
                        <img
                            src={verve}
                            alt="Verve"
                            className="h-6"

                        />
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-gray-50 flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border p-3 rounded-md w-full"
                        />

                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border p-3 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-3 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-6 flex">
                        <span className="px-4 flex items-center border border-r-0 rounded-l-md bg-gray-100 text-gray-600">
                            NGN
                        </span>
                        <input
                            type="number"
                            placeholder="1000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border p-3 rounded-r-md w-full"
                        />
                    </div>

                    <button
                        onClick={handlePaystack}
                        className="w-full bg-amber-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition"
                    >
                        Pay now
                    </button>
                </div>
            </div>
        </div>
    );
}