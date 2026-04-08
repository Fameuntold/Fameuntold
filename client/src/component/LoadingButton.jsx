import React from "react";

export default function LoadingButton({ loading, text, loadingText, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
        loading
          ? "bg-purple-400 cursor-not-allowed"
          : "bg-gradient-to-r from-gray-800 to-purple-500 text-xl hover:bg-purple-600"
      }`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}

      {loading ? loadingText : text}
    </button>
  );
}