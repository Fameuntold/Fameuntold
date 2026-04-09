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

  const [viewUser, setViewUser] = useState(null);

  const [userSearch, setUserSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [subscriberSearch, setSubscriberSearch] = useState("");

  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [error, setError] = useState("");

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

  // ================= FILTER =================
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
    contact.message.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(subscriberSearch.toLowerCase())
  );

  // ================= CHART =================
  const chartData = [
    { name: "Users", value: users.length },
    { name: "News", value: data.news.length },
    { name: "Events", value: data.events.length },
    { name: "Media", value: data.media.length },
  ];

  if (loading) return <p className="p-6">Loading messages...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col z-50 transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        <button onClick={() => setSidebarOpen(false)} className="md:hidden mb-4">✕</button>

        <div className="flex items-center">
          <img className="w-16 h-14 filter brightness-0 invert" src={logo} alt="" />
          <h6 className="font-bold">FAME UNTOLD</h6>
        </div>

        <div className="space-y-2 mt-6">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === item.key ? "bg-purple-600" : "hover:bg-gray-700"
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
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 md:hidden" />
      )}

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 w-full">

        {/* MOBILE HEADER */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="bg-black text-white px-3 py-2 rounded">☰</button>
          <h1 className="font-bold">Admin</h1>
        </div>

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((e, i) => <Cell key={i} fill={colors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={80}>
                  {chartData.map((e, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FORM */}
        {activeTab !== "users" && (
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="font-bold mb-4 capitalize">Add {activeTab}</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input placeholder="Title" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded" />

              <input placeholder="Description" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="border p-2 rounded" />

              {activeTab === "media" && (
                <input placeholder="Link" value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="border p-2 rounded" />
              )}

              <input type="file" onChange={handleImage} />
            </div>

            {preview && <img src={preview} className="w-32 mt-3 rounded" />}

            <button onClick={handleSubmit} className="bg-purple-700 text-white px-4 py-2 mt-4 rounded">
              Add
            </button>
          </div>
        )}

        {/* USERS TABLE */}
        {activeTab === "users" && (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Users</h2>

              <input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none p-2 mb-4 w-full rounded-lg"
              />

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-purple-600 text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-purple-50`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-gray-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CONTACT TABLE */}
            <div className="bg-white p-6 mt-10 rounded-2xl shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Messages</h2>

              <input
                placeholder="Search messages..."
                value={contactSearch}
                onChange={(e) => setContactSearch(e.target.value)}
                className="border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none p-2 mb-4 w-full rounded-lg"
              />

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredContacts.map((c, index) => (
                      <tr
                        key={c._id}
                        className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-purple-50`}
                      >
                        <td className="px-4 py-3 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-gray-600">{c.email}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{c.message}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(c.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SUBSCRIBERS */}
            <div className="bg-white p-6 mt-10 rounded-2xl shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Subscribers</h2>

              <input
                placeholder="Search email..."
                value={subscriberSearch}
                onChange={(e) => setSubscriberSearch(e.target.value)}
                className="border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none p-2 mb-4 w-full rounded-lg"
              />

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Subscribed At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSubscribers.map((s, index) => (
                      <tr
                        key={s._id}
                        className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-purple-50`}
                      >
                        <td className="px-4 py-3">{s.email}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(s.subscribedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}