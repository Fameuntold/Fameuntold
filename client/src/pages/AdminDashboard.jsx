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
import axios from "axios"

export default function AdminDashboard() {
  const navigate = useNavigate();

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
  }, []);

  // ================= FETCH =================
  const fetchData = async () => {
    const news = await fetch("https://fameuntold-85z3.vercel.app/api/news").then(res => res.json());
    const events = await fetch("https://fameuntold-85z3.vercel.app/api/events").then(res => res.json());
    const media = await fetch("https://fameuntold-85z3.vercel.app/api/media").then(res => res.json());

    setData({ news, events, media });
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("hhttps://fameuntold-85z3.vercel.app/api/admin/users", {
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

    await fetch(`https://fameuntold-85z3.vercel.app/api/${activeTab}`, {
      method: "POST",
      body: formData,
    });

    setForm({ title: "", description: "", link: "" });
    setImage(null);
    setPreview("");
    fetchData();
  };

  const openEdit = (item) => {
    setCurrentItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
      link: item.link || "",
    });
    setPreview(item.image ? `https://fameuntold-85z3.vercel.app/${item.image}` : "");
    setEditModal(true);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    if (image) formData.append("image", image);

    await fetch(`https://fameuntold-85z3.vercel.app/api/${activeTab}/${currentItem._id}`, {
      method: "PUT",
      body: formData,
    });

    setEditModal(false);
    setImage(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`https://fameuntold-85z3.vercel.app/api/${activeTab}/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://fameuntold-85z3.vercel.app/api/admin/users/${id}`, {
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


  // Filtered users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Filtered contacts
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
      const { data } = await axios.get("https://fameuntold-85z3.vercel.app/api/contact/get-contact");
      setContacts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch contacts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);


  // Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("https://fameuntold-85z3.vercel.app/api/newsletter/all");
      setSubscribers(data);
      setLoadingSubscribers(false);
    } catch (err) {
      console.error(err);
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [])


  if (loading) return <p className="p-6">Loading messages...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  if (contacts.length === 0) {
    return <p className="p-6 text-gray-600">No messages available.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">

        <div className="w-full flex items-center">
          <img
            className="w-18 h-16 filter brightness-0 invert"
            src={logo}
            alt=""
          />
          <h6 className="text-purple-50 w-full font-bold">FAME UNTOLD</h6>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeTab === item.key
                ? "bg-purple-600"
                : "hover:bg-gray-700"
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
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

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* CHARTS */}
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

        {/* FORM */}
        {activeTab !== "users" && (
          <div className="bg-white p-6 rounded-2xl shadow mb-10">
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

            <button onClick={handleSubmit}
              className="bg-purple-700 text-white px-4 py-2 mt-4 rounded">
              Add
            </button>
          </div>
        )}

        {/* USERS TABLE */}
        {activeTab === "users" && (
          <div className="bg-gray-300 p-6 rounded-2xl shadow">
            <h2 className="text-3xl font-bold mb-4">Registered Users</h2>

            <input
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="border outline-0 border-gray-200 p-2 mb-4 w-full rounded"
            />

            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-purple-500">
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
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.phone || "-"}</td>
                    <td className="p-2">{user.location || "-"}</td>
                    <td className="p-2">{user.message || "-"}</td>

                    <td className="p-2 space-x-2">
                      <button onClick={() => setViewUser(user)} className="bg-green-500 text-white px-2 py-1 rounded">View</button>
                      <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USER MODAL */}
        {viewUser && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl w-96">
              <h2 className="font-bold mb-3">User Details</h2>

              <p>Name: {viewUser.name}</p>
              <p>Email: {viewUser.email}</p>
              <p>Role: {viewUser.role}</p>

              <button onClick={() => setViewUser(null)}
                className="bg-gray-800 text-white px-4 py-2 mt-3 rounded">
                Close
              </button>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

            <input
              placeholder="Search messages..."
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              className="border outline-0 border-purple-400 p-2 mb-4 w-full rounded"
            />

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-purple-500">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{contact.message}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(contact.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        )}
        {activeTab === "users" && (
          <div className="bg-gray-200 p-6 rounded-2xl shadow mt-10">
            <h2 className="text-3xl font-bold mb-4">Newsletter Subscribers</h2>

            <input
              placeholder="Search by email..."
              value={subscriberSearch}
              onChange={(e) => setSubscriberSearch(e.target.value)}
              className="border outline-0 border-gray-300 p-2 mb-4 w-full rounded"
            />

            {loadingSubscribers ? (
              <p>Loading subscribers...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th className="border border-gray-300 px-4 py-2">Email</th>
                      <th className="border border-gray-300 px-4 py-2">Subscribed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map((sub) => (
                      <tr key={sub._id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{sub.email}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(sub.subscribedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        )}



      </div>
    </div>
  );
}