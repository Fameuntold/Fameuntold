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

  const [activeTab, setActiveTab] = useState("news");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // ================= CHART =================
  const chartData = [
    { name: "Users", value: users.length },
    { name: "News", value: data.news.length },
    { name: "Events", value: data.events.length },
    { name: "Media", value: data.media.length },
  ];

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userSearch, setUserSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.message.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [subscriberSearch, setSubscriberSearch] = useState("");

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("https://fameuntold.vercel.app/api/contact/get-contact");
      setContacts(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch contacts.");
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

  if (loading) return <p className="p-6">Loading messages...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        <button onClick={() => setSidebarOpen(false)} className="md:hidden mb-4 text-xl">✕</button>

        <div className="flex items-center">
          <img className="w-16 h-14 filter brightness-0 invert" src={logo} alt="" />
          <h6 className="text-purple-50 font-bold">FAME UNTOLD</h6>
        </div>

        <div className="space-y-2 mt-6">
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

      {/* OVERLAY */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 w-full">

        {/* MOBILE HEADER */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl bg-gray-900 text-white px-3 py-2 rounded">
            ☰
          </button>
          <h1 className="font-bold">Admin</h1>
        </div>

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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

        {/* USERS TABLE */}
        {activeTab === "users" && (
          <div className="bg-gray-300 p-6 rounded-2xl shadow overflow-x-auto">
            <h2 className="text-3xl font-bold mb-4">Registered Users</h2>

            <input
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="border p-2 mb-4 w-full rounded"
            />

            <table className="w-full text-left">
              <thead>
                <tr className="bg-purple-500">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.phone || "-"}</td>
                    <td className="p-2">{user.location || "-"}</td>
                    <td className="p-2">{user.message || "-"}</td>
                    <td className="p-2">
                      <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}