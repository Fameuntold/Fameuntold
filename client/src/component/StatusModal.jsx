import React from "react";

export default function StatusModal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center animate-scaleIn">
        
        {/* Icon */}
        <div className="text-5xl mb-4">
          {type === "success" ? "✅" : "❌"}
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold mb-2">
          {type === "success" ? "Success" : "Error"}
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            type === "success"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
}