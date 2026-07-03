import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSlidebar";
import { getProperties } from "../api/propertyApi";
import { getContacts } from "../api/contactApi";
import {
  FaHome,
  FaEnvelope,
  FaCheckCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StatCard({ icon, value, label, color }) {
  return (
    <div className={`bg-white rounded-2xl shadow p-6 flex items-center gap-5 border-l-4 ${color}`}>
      <div className="text-3xl text-slate-600">{icon}</div>
      <div>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        <p className="text-slate-500 text-sm mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    contacts: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentProperties, setRecentProperties] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [propRes, contactRes] = await Promise.all([
          getProperties({ limit: 100 }),
          getContacts(),
        ]);

        const props = propRes.data.data;
        const contacts = contactRes.data.data;

        setStats({
          total: propRes.data.total,
          available: props.filter((p) => p.status === "Available").length,
          contacts: contacts.length,
          unread: contacts.filter((c) => !c.isRead).length,
        });

        setRecentProperties(props.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Welcome back, <span className="font-semibold">{user?.name}</span>! 👋
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<FaHome />}
            value={loading ? "—" : stats.total}
            label="Total Properties"
            color="border-blue-500"
          />
          <StatCard
            icon={<FaCheckCircle />}
            value={loading ? "—" : stats.available}
            label="Available"
            color="border-green-500"
          />
          <StatCard
            icon={<FaEnvelope />}
            value={loading ? "—" : stats.contacts}
            label="Total Inquiries"
            color="border-purple-500"
          />
          <StatCard
            icon={<FaEnvelope />}
            value={loading ? "—" : stats.unread}
            label="Unread Inquiries"
            color="border-red-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Link
            to="/admin/add-property"
            className="flex items-center gap-3 bg-blue-900 hover:bg-blue-800 text-white p-5 rounded-2xl font-semibold transition"
          >
            <FaPlusCircle size={20} />
            Add New Property
          </Link>
          <Link
            to="/admin/properties"
            className="flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 p-5 rounded-2xl font-semibold border border-slate-200 transition"
          >
            <FaHome size={20} />
            Manage Properties
          </Link>
          <Link
            to="/admin/contacts"
            className="flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 p-5 rounded-2xl font-semibold border border-slate-200 transition"
          >
            <FaEnvelope size={20} />
            View Inquiries
          </Link>
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Properties
            </h2>
            <Link
              to="/admin/properties"
              className="text-blue-900 text-sm font-medium hover:underline"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentProperties.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-700 pr-4">
                        {p.title}
                      </td>
                      <td className="py-3 text-slate-500">{p.type}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            p.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : p.status === "Sold"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-green-700 font-semibold">
                        ₹{p.price?.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;