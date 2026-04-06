import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-5 rounded-2xl shadow-lg">
        
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <p className="text-white text-sm font-medium tracking-wide">
          Please wait...
        </p>
      </div>

    </div>
  );
}