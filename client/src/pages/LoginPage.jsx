import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatusModal from "../component/StatusModal";
import Loader from "../component/Loader"; // ✅ your loader
import getinvolvedimg1 from "../assets/getinvolvedimg1.png";

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
        setLoading(true); // ✅ start loader

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
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
            setLoading(false); // ✅ stop loader
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
            style={{ backgroundImage: `url(${getinvolvedimg1})` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            {/* ✅ Show loader overlay */}
            {loading && <Loader />}

            <form
                onSubmit={handleLogin}
                className="relative bg-white py-12 px-6 shadow rounded w-full max-w-md"
            >
                <h2 className="text-xl mb-4 font-bold">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="bg-purple-900 text-white px-4 py-2 w-full flex items-center justify-center disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
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