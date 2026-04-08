import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatusModal from "../component/StatusModal";
import Loader from "../component/Loader"; 
import getinvolvedimg1 from "../assets/getinvolvedimg1.png";
import { FiUser, FiLock } from "react-icons/fi";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState({
        open: false,
        type: "",
        message: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                "https://fameuntold.vercel.app/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            setModal({
                open: true,
                type: "success",
                message: "Login successful",
            });

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setModal({
                open: true,
                type: "error",
                message:
                    err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false); 
        }
    };

    return (
      <div
            className="relative min-h-screen bg-cover bg-center flex  items-center justify-center py-12 px-4"
            style={{ backgroundImage: `url(${getinvolvedimg1})` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>

            {/* LOADER */}
            {loading && <Loader />}

            <form
                onSubmit={handleLogin}
                className="bg-white relative w-full max-w-2xl rounded-2xl shadow-lg px-8 py-10"
            >
                {/* TITLE */}
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Login
                </h2>

                {/* EMAIL */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Username"
                        className="w-full bg-gray-100 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-orange-300"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-100 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-orange-300"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="accent-orange-400" />
                        Remember me
                    </label>

                    <span onClick={()=>navigate('/account-page')} className="cursor-pointer hover:underline">
                        Forgot Password
                    </span>
                </div>

                {/* BUTTON */}
                <button
                    disabled={loading}
                    className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-gray-800 to-purple-500 hover:opacity-90 transition"
                >
                    {loading ? "Logging in..." : "LOG IN"}
                </button>

                {/* SIGN UP */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Not a member?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Sign up now
                    </span>
                </p>
            </form>

            <StatusModal
                isOpen={modal.open}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ ...modal, open: false })}
            />
        </div>
    );
};

export default LoginPage;