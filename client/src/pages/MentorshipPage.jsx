import React from "react";
import { useNavigate } from "react-router-dom";
import IMG16 from "../assets/IMG16.PNG";
import { Users, Compass, HeartHandshake } from "lucide-react";

// Reusable components
const Section = ({ children }) => (
  <section className="max-w-5xl mx-auto mb-16 px-4">
    {children}
  </section>
);

const Card = ({ icon: Icon, title, text }) => (
  <div className="rounded-2xl shadow-md bg-white p-6 hover:shadow-lg transition">
    <Icon className="mb-4 text-purple-800" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);


export default function MentorshipPage() {

  const navigate = useNavigate();

  const Button = ({ children, variant = "primary" }) => {
  const base = "px-6 py-3 rounded-2xl text-sm font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-gray-800 text-gray-800 hover:bg-gray-100"
      : "bg-purple-900 text-white hover:bg-gray-700";

  return <button onClick={() => navigate("/register")} className={`${base} ${styles}`}>{children}</button>;
};


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
              Mentorship Program
            </h1>

            <div className="flex items-start gap-4">
              <div className="w-[3px] h-16 bg-orange-500 mt-1"></div>

              <p className="text-gray-200">
                Guiding lives, building purpose, and raising leaders through intentional relationships.
              </p>
            </div>
          </div>

          <div className="hidden md:block bg-white px-6 py-4 shadow-lg cursor-pointer">
            <p
              onClick={() => navigate("/")}
              className="text-sm font-semibold text-gray-600"
            >
              HOME <span className="mx-2">|</span>
              <span className="text-orange-500">PROGRAMS</span>
            </p>
          </div>
        </div>
      </div>



      <div className="min-h-screen bg-gray-50 text-gray-800 py-12">
        {/* Hero Section */}
        <Section>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl text-purple-800 font-bold mb-4">
              Mentorship That Shapes Purpose
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bridging the gap between generations by providing guidance,
              wisdom, and godly counsel to help young people navigate life
              with clarity and confidence.
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate("/")} >Become a Mentor</Button>
            </div>
          </div>
        </Section>

        {/* Problem Section */}
        <Section>
          <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
          <p className="text-gray-600 leading-relaxed">
            Many young people grow up without consistent mentorship or access
            to positive role models. Broken family structures, busy schedules,
            and societal fragmentation have reduced meaningful
            intergenerational relationships. Without mentors, youths often
            rely on peers or popular culture for guidance—sources that may
            lack depth, accountability, and moral grounding.
          </p>
        </Section>

        {/* Case Studies */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16 px-4">
          <Card
            icon={Users}
            title="Lack of Role Models"
            text="Youths without mentors often lack guidance and direction, leading to confusion about identity and purpose."
          />

          <Card
            icon={Compass}
            title="Directionless Living"
            text="Without proper mentorship, many young people struggle to make informed life decisions and navigate challenges effectively."
          />

          <Card
            icon={HeartHandshake}
            title="Need for Guidance"
            text="Positive mentorship provides accountability, wisdom, and emotional support essential for growth and stability."
          />
        </section>

        {/* Solution */}
        <Section>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect young people with experienced mentors who provide
              intentional guidance, life wisdom, and spiritual direction.
              Our goal is to nurture purpose-driven individuals equipped to
              thrive in every area of life.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Start Your Mentorship Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Whether you need guidance or want to give back, there's a place
              for you here.
            </p>
           
          </div>
        </Section>
      </div>
    </div>
  );
}
