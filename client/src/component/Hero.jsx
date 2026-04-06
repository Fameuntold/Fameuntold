import { useEffect, useState } from "react";
import IMG7 from "../assets/IMG7.PNG";
import IMG2 from "../assets/IMG2.Webp";
import IMG13 from "../assets/IMG13.PNG";
import IMG8 from "../assets/IMG8.PNG";
import IMG9 from "../assets/IMG9.PNG";
import IMG10 from "../assets/IMG10.PNG";
import { CgCross } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        bgImage: IMG7,

        title: "Inspiring Minds, Shaping the Future",
        text: "“Our conferences, seminars, and strategic meetings are designed to ignite vision, inspire growth, and drive transformation. Through insightful teachings, mentorship, and collaborative discussions, we create an environment where ideas are nurtured, leaders are developed, and individuals are empowered to take bold steps toward their purpose",
        btn: "Get Started",
    },
    {
        bgImage: IMG2,

        title: "Connecting Faith and Community",
        text: "We believe in the power of faith to transform lives and communities. Through our worship experiences and outreach programs in high schools and universities, we create opportunities for spiritual growth, meaningful connections, and positive change, reaching hearts and impacting lives with love, hope, and purpose.",
        btn: "Register Now",
    },
    {
        bgImage: IMG13,

        title: "Empowering the Next Generation of Leaders",
        text: "We are committed to raising a generation of purpose-driven individuals through our talent and empowerment programs. By equipping young people with practical skills, leadership training, and a strong moral foundation, we help them discover their unique gifts, unlock their full potential, and confidently make a meaningful impact in their communities and beyond.",
        btn: "Register Now",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimate(true);
            setShowContent(false);

            // Switch background image mid-animation
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
            }, 800); // half of animation duration

            // Show content after layers finish
            setTimeout(() => {
                setAnimate(false);
                setShowContent(true);
            }, 2000); // total layer animation duration
        }, 8000); // full slide duration

        return () => clearInterval(interval);
    }, []);

    const slide = slides[current];

    return (
        <section className="relative h-[35rem] -z-10 overflow-hidden bg-black">
            {/* BACKGROUND IMAGE */}
            <div
                key={current}
                className="absolute inset-0 bg-cover  object-cover bg-center transition-opacity duration-700"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* BIG WIPE LAYER */}
            <div
                className={`absolute inset-0 bg-purple-200 z-30 pointer-events-none ${animate ? "animate-wipeBigSlow" : ""
                    }`}
            />

            {/* SMALL ACCENT LAYER */}
            <div
                className={`absolute inset-0 bg-gradient-to-b from-gray-900 to-purple-500 z-40 pointer-events-none ${animate ? "animate-wipeSmallSlow" : ""
                    }`}
            />

            {/* TEXT + FOREGROUND IMAGE */}
            {showContent && (
                <div className="relative z-50 h-full w-full  items-center ">
                    <div className="animate-textUp transition ease-in w-80 h-80 border border-16 border-amber-50/10 top-15 absolute rounded-full"><CgCross className=" ease-in w-40 h-80 left-7  top-10 absolute text-white/20"/></div>
                    <div className="w-60 h-60 animate-textUp delay-700 transition ease-in border border-16 border-amber-500/20 bottom-15 right-7 absolute rounded-full"></div>
                    <div className="w-60 h-60 animate-textUp delay-1000 transition ease-in border border-16 border-amber-50/20 bottom-15 right-37 absolute rounded-full"></div>
                    <div className="text-white text-center  ml-57 w-[70%] gap-3 flex flex-col py-40 items-center justify-center">
                        <div className="overflow-hidden">
                            <h1 className="text-4xl md:text-6xl z-999 font-bold mb-4 animate-textUp delay-100">
                                {slide.title}
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <p className="mb-6 text-lg animate-textUp delay-300">
                                {slide.text}
                            </p>
                        </div>
                        <div className="overflow-hidden">
                            <button onClick={()=>navigate('/register')} className="bg-purple-50 text-purple-900 font-bold text-xl px-8 py-4 rounded-lg animate-textUp delay-500">
                                {slide.btn}
                            </button>
                        </div>
                    </div>


                </div>
            )}
        </section>
    )
}