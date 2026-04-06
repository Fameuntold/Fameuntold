import React from "react";
import IMG16 from '../assets/IMG16.PNG'
import abt1 from '../assets/abt1.jpeg'
import abt2 from '../assets/abt2.jpeg'
import abt3 from '../assets/abt3.jpeg'
import { useNavigate } from "react-router-dom";

export default function OurStory() {

   const navigate = useNavigate();
 



  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <div
        className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${IMG16})` }}
      >
        <div className="absolute inset-0 bg-[#0b1c2c]/80"></div>

        <div className="relative z-10 w-full flex justify-between items-center">

          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>

            <div className="flex items-start gap-4">
              <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

              <p className="text-sm md:text-base leading-relaxed text-gray-200">
                We are a church that believes in Jesus Christ and His followers,
                committed to spreading His love and truth to the world.
              </p>
            </div>
          </div>

          <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
            <p onClick={()=>navigate('/')} className="text-sm font-semibold text-gray-600">
              HOME <span className="mx-2">|</span>
              <span className="text-orange-500">ABOUT US</span>
            </p>
          </div>
        </div>
      </div>

      {/* STORY CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

        {/* SECTION 1 */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Where It All Began
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            We are a faith-driven community committed to raising lives, empowering talents, and unlocking the full potential within every individual. We believe that every person is uniquely created with gifts, abilities, and purpose, and our mission is to nurture and develop these qualities so they can thrive. Through mentorship, guidance, and holistic support, we provide opportunities for personal, spiritual, and professional growth, ensuring that our members are equipped to face life’s challenges with confidence and resilience. Our programs are designed to inspire creativity, leadership, and excellence, allowing individuals not only to grow personally but also to contribute meaningfully to their communities.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
           At the heart of our community is a culture of faith, integrity, and service. We foster an environment where values such as compassion, discipline, and perseverance are cultivated alongside practical skills and talents. By encouraging collaboration, innovation, and purpose-driven action, we empower people to discover their calling and make a lasting impact in the world. Every initiative we undertake is aimed at helping members rise above limitations, overcome obstacles, and embrace a life of significance, grounded in principles that guide both personal and collective success.
          </p>

          <p className="text-gray-700 leading-relaxed">
           Ultimately, we envision a world where individuals are not only aware of their potential but are actively supported to achieve it. We are more than a community; we are a movement dedicated to transforming lives, inspiring hope, and creating a future where every person has the tools, encouragement, and faith-driven confidence to thrive. By investing in people, celebrating talents, and nurturing purpose, we aim to shape leaders, innovators, and changemakers who will leave a positive legacy for generations to come.
          </p>
        </div>

        {/* SECTION 2 */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            What We Do
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            We operate across both physical and digital spaces, reaching young people through conferences, mentorship sessions, worship gatherings, and social media engagement.
          </p>

          <p className="text-gray-700 leading-relaxed">
            These platforms span schools, universities, churches, and online communities—creating safe environments for growth, transformation, and spiritual encounter.
          </p>
        </div>

        {/* SECTION 3 */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Our Core Focus
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            A defining feature of F.A.M.E Untold is its emphasis on raising altars of worship. We believe worship is not just music but a lifestyle that aligns hearts with God’s will.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Beyond spiritual growth, we are passionate about raising leaders grounded in integrity, excellence, and service—individuals who will impact society while remaining rooted in godly values.
          </p>
        </div>

        {/* SECTION 4 */}
        <div>
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Our Growth Journey
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Over the years, Fame Untold has grown into a dynamic movement impacting lives through outreach programs, leadership initiatives, and strategic collaborations.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We continue to expand our reach, strengthen our community, and invest in future leaders—ensuring lasting impact across generations.
          </p>
        </div>

      </div>

      {/* IMAGE SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        <img
          src={abt1}
          className="rounded-xl object-cover h-64 w-full"
          alt=""
        />
        <img
          src={abt2}
          className="rounded-xl object-cover h-64 w-full"
          alt=""
        />
        <img
          src={abt3}
          className="rounded-xl object-cover h-64 w-full"
          alt=""
        />
      </div>

      {/* CTA SECTION */}
      <div className="bg-[#16002E] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Be Part of Our Story</h2>
        <p className="mb-6 opacity-90">
          Join us as we continue to make impact and transform lives.
        </p>
        <button onClick={() => navigate("/register")} className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold">
          Get Involved
        </button> 
      </div>
    </div>
  );
}