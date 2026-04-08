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

  {/* MOBILE MENU BUTTON */}
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
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
    />
  )}

  {/* SIDEBAR */}
  <div
    className={`
      fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col
      transform transition-all duration-300 z-50
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
  >
    {/* CLOSE */}
    <div className="md:hidden flex justify-end mb-4">
      <button onClick={() => setSidebarOpen(false)}>✕</button>
    </div>

    {/* MENU */}
    <div className="space-y-2 mt-4">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            setActiveTab(item.key);
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
            activeTab === item.key
              ? "bg-purple-600"
              : "hover:bg-gray-700"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </button>
      ))}
    </div>

    <button
      onClick={handleLogout}
      className="mt-auto bg-red-500 p-3 rounded-lg"
    >
      Logout
    </button>
  </div>

  {/* MAIN CONTENT */}
  <div className="flex-1 p-4 md:p-6 md:ml-64">

    {/* TITLE */}
    <h1 className="text-xl md:text-2xl font-bold mb-4">
      Admin Dashboard
    </h1>

    {/* ================= DASHBOARD (DEFAULT) ================= */}
    {activeTab === "news" && (
      <>
        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={80} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            placeholder="Title"
            className="w-full border p-2 mb-2"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 mb-2"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="file"
            onChange={handleImage}
            className="mb-2"
          />

          {preview && (
            <img src={preview} className="w-24 mb-2" />
          )}

          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Title</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.news.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}

    {/* ================= USERS ================= */}
    {activeTab === "users" && (
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">

        <input
          placeholder="Search user"
          className="border p-2 mb-4 w-full"
          onChange={(e) => setUserSearch(e.target.value)}
        />

        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500"
                  >
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