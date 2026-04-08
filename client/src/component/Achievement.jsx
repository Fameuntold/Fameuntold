import React, { useEffect, useState } from "react";
import pics9 from "../assets/pics9.jpeg";
import pics8 from "../assets/pics8.jpeg";
import { useNavigate } from "react-router-dom";


function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Achievement() {

  const navigate = useNavigate()
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-center">

        {/* LEFT IMAGE */}
        <div className="overflow-hidden">
          <img
            src={pics9}
            alt="Prayer"
            className="w-full h-[420px] object-cover transition duration-500 hover:scale-110"
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="relative space-y-6">

          {/* Badge */}
          

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            A CHRIST-CENTERED
            <br />
            MISSION FOR ALL
          </h1>

          {/* Button */}
          <button onClick={()=>navigate('/counselling')} className="bg-purple-500 text-white px-6 py-3 font-semibold hover:bg-purple-600 transition">
            Learn About Us
          </button>

          {/* Stats Box */}
          <div className="bg-[#e9e3dc] mt-6">
            <div className="flex border-b">
              <div className="flex-1 p-6">
                <h2 className="text-4xl font-extrabold text-gray-900">
                  <Counter target={500} />+
                </h2>
              </div>
              <div className="flex-1 flex items-center p-6 text-gray-700">
                Sermons Preached
              </div>
            </div>

            <div className="flex">
              <div className="flex-1 p-6">
                <h2 className="text-4xl font-extrabold text-gray-900">
                  <Counter target={25} />+
                </h2>
              </div>
              <div className="flex-1 flex items-center p-6 text-gray-700">
                Years in Ministry
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE + FLOATING BADGE */}
        <div className="relative">
          <div className="overflow-hidden">
            <img
              src={pics8}
              alt="Prayer Group"
              className="w-full h-[620px] object-cover transition duration-500 hover:scale-110"
            />
          </div>

          {/* Circular Badge */}
          <div className="absolute -top-10 right-0 w-32 h-32 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center text-center text-xs font-semibold p-4">
            Religion & Church Social Activists
          </div>
        </div>

      </div>
    </div>
  );
}