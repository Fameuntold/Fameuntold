import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaPhotoVideo,
  FaUsers
} from "react-icons/fa";
import logo from "../assets/logo.png";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ NEW

  const [activeTab, setActiveTab] = useState("news");
  const [data, setData] = useState({ news: [], events: [], media: [] });
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState(null);

  const colors = ["#7c3aed", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

  const menuItems = [
    { key: "news", label: "News", icon: <FaNewspaper /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "media", label: "Media", icon: <FaPhotoVideo /> },
    { key: "users", label: "Users", icon: <FaUsers /> },
  ];

  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchContacts();
    fetchSubscribers();
  }, []);

  // ================= FETCH =================
  const fetchData = async () => {
    const news = await fetch("https://fameuntold.vercel.app/api/news").then(res => res.json());
    const events = await fetch("https://fameuntold.vercel.app/api/events").then(res => res.json());
    const media = await fetch("https://fameuntold.vercel.app/api/media").then(res => res.json());

    setData({ news, events, media });
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://fameuntold.vercel.app/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("https://fameuntold.vercel.app/api/contact/get-contact");
      setContacts(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("https://fameuntold.vercel.app/api/newsletter/all");
      setSubscribers(data);
      setLoadingSubscribers(false);
    } catch {
      setLoadingSubscribers(false);
    }
  };

  // ================= ACTIONS =================
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    if (image) formData.append("image", image);

    await fetch(`https://fameuntold.vercel.app/api/${activeTab}`, {
      method: "POST",
      body: formData,
    });

    setForm({ title: "", description: "", link: "" });
    setImage(null);
    setPreview("");
    fetchData();
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://fameuntold.vercel.app/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchUsers();
  };

  // ================= STATES =================
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userSearch, setUserSearch] = useState("");
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [subscriberSearch, setSubscriberSearch] = useState("");

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  const chartData = [
    { name: "Users", value: users.length },
    { name: "News", value: data.news.length },
    { name: "Events", value: data.events.length },
    { name: "Media", value: data.media.length },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE BUTTON */}
      <div className="md:hidden fixed top-4 left-4 z-[9999]">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-purple-700 text-white p-3 rounded-full"
        >
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col
        transform transition-all duration-300 z-[9999]
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>

        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)} className="text-2xl">✕</button>
        </div>

        <div className="flex items-center mb-6">
          <img className="w-16 h-14 filter brightness-0 invert" src={logo} alt="" />
          <h6 className="font-bold">FAME UNTOLD</h6>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-lg ${
                activeTab === item.key ? "bg-purple-600" : "hover:bg-gray-700"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <button onClick={handleLogout} className="mt-auto bg-red-500 p-3 rounded-lg">
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:ml-64">

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={80} label>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}