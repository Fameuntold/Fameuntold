import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
    FiSearch,
    FiX,
    FiMenu,
    FiChevronDown
} from "react-icons/fi";
import logo from "../assets/logo.png";
import pics1 from "../assets/pics1.jpeg";
import pics2 from "../assets/pics2.jpeg";
import axios from "axios";
import profile from "../assets/profile.png";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openPrograms, setOpenPrograms] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const profileRef = useRef();
    const registerRef = useRef();

    // SCROLL
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // LOCK SCROLL
    useEffect(() => {
        document.body.style.overflow = mobileMenu ? "hidden" : "auto";
    }, [mobileMenu]);

    // OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
            if (registerRef.current && !registerRef.current.contains(e.target)) setOpenRegister(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const getInitials = (name) => {
        if (!name) return "";
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/upload-profile",
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const updatedUser = { ...user, profileImage: res.data.imageUrl };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full z-50">

            {/* TOP NAV */}
            {!scrolled && (
                <div className="bg-purple-900 text-white text-sm px-4 md:px-6 py-2 flex justify-between items-center">
                    <div>🔥 Upcoming Event: Youth Conference</div>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`bg-white text-black px-3 py-1 rounded-md transition-all duration-300 ${showSearch ? "w-48 opacity-100 mr-2" : "w-0 opacity-0 p-0"}`}
                        />
                        {showSearch ? <FiX onClick={() => setShowSearch(false)} /> : <FiSearch onClick={() => setShowSearch(true)} />}
                    </div>
                    <div className="hidden md:flex gap-6">
                        <Link to="/faq-page">FAQ</Link>
                        <Link to="/career-page">Careers</Link>
                        <Link to="/blog-page">Blog</Link>
                        <Link to="/contact-page">Contact</Link>
                    </div>
                </div>
            )}

            {/* MAIN NAV */}
            <div className={`bg-purple-50 px-4 md:px-9 py-3 flex justify-between items-center shadow-md ${scrolled ? "fixed top-0 w-full z-[9999]" : ""}`}>

                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <img src={logo} className="w-16 h-16" />
                    <h6 className="text-purple-900 font-bold">FAME UNTOLD</h6>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-6 items-center font-bold text-gray-700">

                    <Link className=" text-sm md:text-xl" to="/">Home</Link>

                    {/* ABOUT */}
                    <div className="relative" onMouseEnter={() => setOpenAbout(true)} onMouseLeave={() => setOpenAbout(false)}>
                        <span className="cursor-pointer hover:text-purple-700 flex text-sm md:text-xl items-center gap-1"> About <FiChevronDown /> </span>
                        <div className={`absolute left-1/2 -translate-x-1/2 top-full p-6 transition-all duration-300 bg-gray-50 shadow-xl rounded-b-xl grid grid-cols-2 gap-6 w-[700px] ${openAbout ? "opacity-100 translate-y-0 z-[9999]" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                            <div>
                                <h3 className="font-semibold text-purple-900  mb-2">About Us</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li onClick={() => navigate("/our-story")} className="hover:text-purple-700 cursor-pointer">Our Story</li>
                                    <li onClick={() => navigate("/mission")} className="hover:text-purple-700 cursor-pointer">Mission & Vision</li>
                                    <li onClick={() => navigate("/leader")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                    <li onClick={() => navigate("/objectives")} className="hover:text-purple-700 cursor-pointer">Aims & Objectives</li>
                                </ul>
                            </div>
                            <div className="bg-purple-900 text-white rounded-lg p-4">
                                <h2 className="text-lg font-bold">Learn More About Our Impact</h2>
                                <img src={pics2} alt="Impact" className="mt-2 h-32 object-cover rounded" />
                            </div>
                        </div>
                    </div>

                    {/* PROGRAMS */}
                    <div className="relative" onMouseEnter={() => setOpenPrograms(true)} onMouseLeave={() => setOpenPrograms(false)}>
                        <span className="flex items-center text-sm md:text-xl gap-1 cursor-pointer"> Programs <FiChevronDown /> </span>
                        <div
                            className={`absolute left-1/2 -translate-x-1/2 top-full p-6 transition-all duration-300 bg-gray-50 shadow-xl rounded-b-xl grid grid-cols-3 gap-6 w-[900px] ${openPrograms ? "opacity-100 translate-y-0 z-[9999]" : "opacity-0 translate-y-4 pointer-events-none"
                                }`}
                        >
                            <div>
                                <h3 className="font-semibold text-purple-900 mb-2">Our Programs</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li onClick={() => navigate("/mentorship")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                    <li onClick={() => navigate("/worship")} className="hover:text-purple-700 cursor-pointer">Worship</li>
                                    <li onClick={() => navigate("/leadershipcapacity")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                    <li onClick={() => navigate("/counselling")} className="hover:text-purple-700 cursor-pointer">Counselling</li>
                                    <li onClick={() => navigate("/talent")} className="hover:text-purple-700 cursor-pointer">Talent</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-purple-900 mb-2">Resources</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li onClick={() => navigate("/workshop")} className="hover:text-purple-700 cursor-pointer">Workshops</li>
                                    <li onClick={() => navigate("/mentorpage")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                    <li onClick={() => navigate("/volunteer-page")} className="hover:text-purple-700 cursor-pointer">Volunteer</li>
                                </ul>
                            </div>

                            <div className="bg-purple-900 text-white rounded-lg p-4">
                                <h2 className="text-lg font-bold">Empowering Youth</h2>
                                <img src={pics1} alt="Empower" className="mt-2 object-cover rounded" />
                            </div>
                        </div>
                    </div>

                    <Link className=" text-sm md:text-xl" to="/event-page">Events</Link>
                    <Link className=" text-sm md:text-xl" to="/media-page">Media</Link>
                    <Link className=" text-sm md:text-xl" to="/get-involved">Get Involved</Link>
                </div>

                {/* RIGHT DESKTOP */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/donation" className="bg-purple-900 text-white px-4 py-2 rounded-lg">Donate</Link>

                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <div onClick={() => setOpenProfile(!openProfile)} className="flex items-center gap-2 cursor-pointer">
                                <span>Welcome, {user.name?.split(" ")[0]}</span>
                                {user.profileImage ? (
                                    <img src={user.profileImage} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full">{getInitials(user.name)}</div>
                                )}
                            </div>

                            {openProfile && (
                                <div className="absolute right-0 mt-5 py-3 bg-purple-50 shadow-lg rounded-b-lg w-60 z-9998">


                                    <button onClick={() => navigate('/account-page')} className="w-full px-4 cursor-pointer flex items-center gap-3 text-left p-2 hover:bg-purple-100 ">
                                        👤 My Profile
                                    </button>
                                    <button onClick={handleLogout} className="w-[70%] ml-9 my-5 text-white font-bold cursor-pointer hover:bg-purple-400 p-2 flex items-center text-center justify-center bg-purple-500 gap-3">

                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative" ref={registerRef}>
                            <button onClick={() => setOpenRegister(!openRegister)} className="bg-purple-900 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                                Account <FiChevronDown />
                            </button>

                            {openRegister && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
                                    <button onClick={() => navigate("/login")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Login</button>
                                    <button onClick={() => navigate("/register")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Register</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE TOGGLE */}
                <div className="md:hidden">
                    <FiMenu onClick={() => setMobileMenu(true)} className="cursor-pointer" />
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenu && (
                <div className="fixed inset-0 bg-white z-[9999] p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <img src={logo} className="w-12 h-12" />
                            <h6 className="text-purple-900 font-bold">FAME UNTOLD</h6>
                        </div>
                        <FiX onClick={() => setMobileMenu(false)} className="text-2xl cursor-pointer" />
                    </div>

                    <ul className="space-y-5 text-lg font-bold">

                        <li>
                            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                        </li>

                        <div className="relative" onMouseEnter={() => setOpenAbout(true)} onMouseLeave={() => setOpenAbout(false)}>
                            <span className="cursor-pointer hover:text-purple-700 flex text-sm md:text-xl items-center gap-1"> About <FiChevronDown /> </span>
                            <div className={`absolute left-1/2 -translate-x-1/2 top-full p-6 transition-all duration-300 bg-gray-50 shadow-xl rounded-b-xl grid grid-cols-2 gap-6 w-[700px] ${openAbout ? "opacity-100 translate-y-0 z-[9999]" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                                <div>
                                    <h3 className="font-semibold text-purple-900  mb-2">About Us</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li onClick={() => navigate("/our-story")} className="hover:text-purple-700 cursor-pointer">Our Story</li>
                                        <li onClick={() => navigate("/mission")} className="hover:text-purple-700 cursor-pointer">Mission & Vision</li>
                                        <li onClick={() => navigate("/leader")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                        <li onClick={() => navigate("/objectives")} className="hover:text-purple-700 cursor-pointer">Aims & Objectives</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        {/* PROGRAMS */}
                        <div className="relative" onMouseEnter={() => setOpenPrograms(true)} onMouseLeave={() => setOpenPrograms(false)}>
                            <span className="flex items-center text-sm md:text-xl gap-1 cursor-pointer"> Programs <FiChevronDown /> </span>
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 top-full p-6 transition-all duration-300 bg-gray-50 shadow-xl rounded-b-xl grid grid-cols-3 gap-6 w-[900px] ${openPrograms ? "opacity-100 translate-y-0 z-[9999]" : "opacity-0 translate-y-4 pointer-events-none"
                                    }`}
                            >
                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-2">Our Programs</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li onClick={() => navigate("/mentorship")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                        <li onClick={() => navigate("/worship")} className="hover:text-purple-700 cursor-pointer">Worship</li>
                                        <li onClick={() => navigate("/leadershipcapacity")} className="hover:text-purple-700 cursor-pointer">Leadership</li>
                                        <li onClick={() => navigate("/counselling")} className="hover:text-purple-700 cursor-pointer">Counselling</li>
                                        <li onClick={() => navigate("/talent")} className="hover:text-purple-700 cursor-pointer">Talent</li>
                                        <li onClick={() => navigate("/workshop")} className="hover:text-purple-700 cursor-pointer">Workshops</li>
                                        <li onClick={() => navigate("/mentorpage")} className="hover:text-purple-700 cursor-pointer">Mentorship</li>
                                        <li onClick={() => navigate("/volunteer-page")} className="hover:text-purple-700 cursor-pointer">Volunteer</li>
                                    </ul>
                                </div>



                            </div>
                        </div>

                        <li>
                            <Link to="/event-page" onClick={() => setMobileMenu(false)}>Events</Link>
                        </li>

                        <li>
                            <Link to="/media-page" onClick={() => setMobileMenu(false)}>Media</Link>
                        </li>

                        <li>
                            <Link to="/get-involved" onClick={() => setMobileMenu(false)}>Get Involved</Link>
                        </li>

                        <li>
                            <Link
                                to="/donation"
                                onClick={() => setMobileMenu(false)}
                                className="bg-purple-900 text-white px-4 py-2 rounded-lg inline-block"
                            >
                                Donate
                            </Link>
                        </li>

                        {/* ✅ AUTH SECTION */}
                        {user ? (
                            <>
                                <li className="border-t pt-4 text-gray-600 text-sm">
                                    Welcome, {user.name?.split(" ")[0]}
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/account-page");
                                            setMobileMenu(false);
                                        }}
                                        className="w-full text-left"
                                    >
                                        👤 My Profile
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenu(false);
                                        }}
                                        className="w-full text-left text-red-500"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-t pt-4"></li>

                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setMobileMenu(false);
                                        }}
                                        className="w-full text-left"
                                    >
                                        Login
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => {
                                            navigate("/register");
                                            setMobileMenu(false);
                                        }}
                                        className="w-full text-left"
                                    >
                                        Register
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            )}

        </div>
    );
};

export default Navbar;