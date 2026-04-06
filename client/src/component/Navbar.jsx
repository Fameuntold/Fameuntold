import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FiSearch, FiX } from "react-icons/fi";
import pics1 from "../assets/pics1.jpeg";
import pics2 from "../assets/pics2.jpeg";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload(); // refresh UI
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full z-50">
            {/* 🔝 TOP NAV */}
            {!scrolled && (
                <div className="bg-purple-900 text-white text-sm px-6 py-2 flex justify-between items-center">
                    <div>🔥 Upcoming Event: Youth Conference</div>

                    {/* Search */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`bg-white text-black px-3 py-1 rounded-md outline-none transition-all duration-300 ${showSearch ? "w-48 opacity-100 mr-2" : "w-0 opacity-0 p-0"
                                }`}
                        />

                        {showSearch ? (
                            <FiX
                                className="cursor-pointer"
                                onClick={() => setShowSearch(false)}
                            />
                        ) : (
                            <FiSearch
                                className="cursor-pointer"
                                onClick={() => setShowSearch(true)}
                            />
                        )}
                    </div>

                    <div className="flex w-[20%] gap-6">
                        <Link to="/faq-page">FAQ</Link>
                        <Link to="/career-page">Careers</Link>
                        <Link to="/blog-page">Blog</Link>
                        <Link to="/contact-page">Contact</Link>
                    </div>
                </div>
            )}

            {/*  MAIN NAV */}
            <div
                className={`bg-purple-50 px-9 py-3 h-25 flex justify-between items-center shadow-md w-full z-50 transition-all duration-300 ${scrolled ? "fixed top-0 left-0 overflow-visible" : "relative"
                    }`}
            >
                {/* Logo */}
                <div className="w-[18%] flex items-center flex-col">
                    <img className="w-16 h-16" src={logo} alt="" />
                    <h6 className="text-purple-900 font-bold">FAME UNTOLD</h6>
                </div>

                {/* Menu */}
                <div className="hidden font-bold text-gray-700 text-xl md:flex gap-6 items-center">
                    <Link to="/">Home</Link>

                    {/* ABOUT */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenAbout(true)}
                        onMouseLeave={() => setOpenAbout(false)}
                    >
                        <span className="cursor-pointer hover:text-purple-700">
                            About
                        </span>

                        <div
                            className={`absolute left-1/2 -translate-x-1/2 top-full transition-all p-8 duration-300 ${openAbout
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none"
                                }`}
                        >
                            <div className="w-[700px] bg-gray-50 shadow-xl rounded-b-xl p-8 grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-4">
                                        About Us
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li onClick={() => navigate("/our-story")} className="hover:text-purple-700 cursor-pointer">Our Story</li>
                                        <li onClick={() => navigate("/mission")} className="hover:text-purple-700 cursor-pointer">Mission & Vision</li>
                                        <li onClick={() => navigate("/leader")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                        <li onClick={() => navigate("/objectives")} className="hover:text-purple-700 cursor-pointer">Aims & Objectives</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-900 text-white rounded-lg p-6">
                                    <h2 className="text-lg font-bold">Learn More About Our Impact</h2>
                                    <img src={pics2} alt="" className="mt-4 h-30 object-cover rounded" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROGRAMS */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenMenu(true)}
                        onMouseLeave={() => setOpenMenu(false)}
                    >
                        <span className="cursor-pointer hover:text-purple-700">
                            Programs
                        </span>

                        <div
                            className={`absolute left-1/2 -translate-x-1/2 top-full w-[900px] p-8 transition-all duration-300 ${openMenu
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4 pointer-events-none"
                                }`}
                        >
                            <div className="bg-gray-50 shadow-xl rounded-b-xl p-8 grid grid-cols-3 gap-8">
                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-4">
                                        Our Programs
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li onClick={() => navigate("/mentorship")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                        <li onClick={() => navigate("/worship")} className="hover:text-purple-700 cursor-pointer">Worship</li>
                                        <li onClick={() => navigate("/leadershipcapacity")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                        <li onClick={() => navigate("/counselling")} className="hover:text-purple-700 cursor-pointer">Counselling</li>
                                        <li onClick={() => navigate("/talent")} className="hover:text-purple-700 cursor-pointer">Talent</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-4">
                                        Resources
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li onClick={() => navigate("/workshop")} className="hover:text-purple-700 cursor-pointer">Workshops</li>
                                        <li onClick={() => navigate("/mentorpage")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                        <li onClick={() => navigate("/volunteer-page")} className="hover:text-purple-700 cursor-pointer">Volunteer</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-900 text-white rounded-lg p-6">
                                    <h2 className="text-xl font-bold">Empowering Youth</h2>
                                    <img src={pics1} alt="" className="mt-4 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/event-page">Events</Link>
                    <Link to="/media-page">Media</Link>
                    <Link to="/get-involved">Get Involved</Link>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-6 w-[18%]">
                    <Link
                        to="/donation"
                        className="bg-purple-900 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                        Donate
                    </Link>

                    {/*  ACCOUNT DROPDOWN */}

                    <div
                        className="relative"
                        onMouseEnter={() => setOpenRegister(true)}
                        onMouseLeave={() => setOpenRegister(false)}
                    >
                        <button className="bg-purple-900 text-white px-4 py-2 rounded-lg font-semibold">
                            Account
                        </button>


                        <div className="absolute right-0 w-48">
                            <div
                                className={`  mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${openRegister
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4 pointer-events-none"
                                    }`}
                            >
                                <ul className="text-sm text-gray-700">
                                    <li onClick={() => navigate("/register")} className="px-4 py-3 hover:bg-purple-100 cursor-pointer">
                                        Register
                                    </li>

                                    <li onClick={() => navigate("/login")} className="px-4 py-3 hover:bg-purple-100 cursor-pointer">
                                        Login
                                    </li>

                                    {user?.role === "admin" && (
                                        <li onClick={() => navigate("/admin")} className="px-4 py-3 hover:bg-purple-100 cursor-pointer text-purple-700 font-semibold">
                                            Admin Dashboard
                                        </li>
                                    )}

                                    {user && (
                                        <li onClick={handleLogout} className="px-4 py-3 hover:bg-red-100 cursor-pointer text-red-600 font-semibold">
                                            Logout
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Spacer */}
            {scrolled && <div className="h-[80px]"></div>}
        </div>
    );
};

export default Navbar;