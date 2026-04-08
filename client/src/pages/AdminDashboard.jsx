import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  FaNewspaper, FaCalendarAlt, FaPhotoVideo, FaUsers
} from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("news");

  const [data, setData] = useState({ news: [], events: [], media: [] });
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [userSearch, setUserSearch] = useState("");
  const [subscriberSearch, setSubscriberSearch] = useState("");

  const colors = ["#7c3aed", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

  const menuItems = [
    { key: "news", label: "News", icon: <FaNewspaper /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "media", label: "Media", icon: <FaPhotoVideo /> },
    { key: "users", label: "Users", icon: <FaUsers /> },
    { key: "contacts", label: "Contacts", icon: "📩" },
    { key: "subscribers", label: "Subscribers", icon: "📧" },
  ];

  // ================= FETCH =================
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [news, events, media, usersRes, contactsRes, subsRes] = await Promise.all([
        fetch("https://fameuntold.vercel.app/api/news").then(r => r.json()),
        fetch("https://fameuntold.vercel.app/api/events").then(r => r.json()),
        fetch("https://fameuntold.vercel.app/api/media").then(r => r.json()),
        axios.get("https://fameuntold.vercel.app/api/admin/users"),
        axios.get("https://fameuntold.vercel.app/api/contact/get-contact"),
        axios.get("https://fameuntold.vercel.app/api/newsletter/all"),
      ]);

      setData({ news, events, media });
      setUsers(usersRes.data || []);
      setContacts(contactsRes.data || []);
      setSubscribers(subsRes.data || []);
    } catch (err) {
      console.log(err);
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
    fetchAll();
  };

  const deleteItem = async (id) => {
    await fetch(`https://fameuntold.vercel.app/api/${activeTab}/${id}`, {
      method: "DELETE",
    });
    fetchAll();
  };

  const deleteUser = async (id) => {
    await fetch(`https://fameuntold.vercel.app/api/admin/users/${id}`, {
      method: "DELETE",
    });
    fetchAll();
  };

  // ================= FILTER =================
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

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
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-700 text-white p-3 rounded-full"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div className={`
        fixed md:static z-50 bg-gray-900 text-white w-64 h-full p-6 flex flex-col
        transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(false)}>✕</button>

        <div className="flex items-center mb-6">
          <img src={logo} className="w-12 invert" />
          <h2 className="ml-2 font-bold">Admin</h2>
        </div>

        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key);
              setSidebarOpen(false);
            }}
            className={`p-3 rounded ${activeTab === item.key ? "bg-purple-600" : ""}`}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <button onClick={handleLogout} className="mt-auto bg-red-500 p-3 rounded">
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 md:ml-64">

        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {chartData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={80}>
                {chartData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* FORM */}
        {["news", "events", "media"].includes(activeTab) && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <input placeholder="Title" className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, title: e.target.value })} />

            <textarea placeholder="Description" className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, description: e.target.value })} />

            <input placeholder="Link" className="border p-2 w-full mb-2"
              onChange={e => setForm({ ...form, link: e.target.value })} />

            <input type="file" onChange={handleImage} />
            {preview && <img src={preview} className="w-32 mt-2" />}

            <button onClick={handleSubmit} className="bg-purple-600 text-white p-2 mt-2">
              Add
            </button>
          </div>
        )}

        {/* LIST */}
        {["news", "events", "media"].includes(activeTab) && (
          data[activeTab].map(item => (
            <div key={item._id} className="bg-white p-3 mb-2 flex justify-between">
              <span>{item.title}</span>
              <button onClick={() => deleteItem(item._id)} className="text-red-500">Delete</button>
            </div>
          ))
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <>
            <input
              placeholder="Search user"
              className="border p-2 mb-4"
              onChange={e => setUserSearch(e.target.value)}
            />

            {filteredUsers.map(user => (
              <div key={user._id} className="bg-white p-3 mb-2 flex justify-between">
                <span>{user.email}</span>
                <button onClick={() => deleteUser(user._id)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {/* CONTACTS */}
        {activeTab === "contacts" && contacts.map(c => (
          <div key={c._id} className="bg-white p-3 mb-2">
            {c.email} - {c.message}
          </div>
        ))}

        {/* SUBSCRIBERS */}
        {activeTab === "subscribers" && (
          <>
            <input
              placeholder="Search subscriber"
              className="border p-2 mb-4"
              onChange={e => setSubscriberSearch(e.target.value)}
            />

            {filteredSubscribers.map(sub => (
              <div key={sub._id} className="bg-white p-3 mb-2">
                {sub.email}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}