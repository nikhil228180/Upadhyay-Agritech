import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSlidebar";
import { getProperties, updateProperty, deleteProperty } from "../api/propertyApi";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck } from "react-icons/fa";

const TYPES = ["Agricultural Land", "Residential", "Commercial"];
const STATUSES = ["Available", "Sold", "Under Negotiation"];

function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getProperties({ limit: 100 });
      setProperties(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch (err) {
      alert("Delete failed: " + (err?.response?.data?.message || err.message));
    }
  };

  const startEdit = (property) => {
    setEditingProperty(property._id);
    setEditForm({
      title: property.title,
      location: property.location,
      price: property.price,
      area: property.area,
      type: property.type,
      status: property.status || "Available",
      description: property.description || "",
      image: property.image || "",
      featured: property.featured || false,
    });
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    setEditForm({});
  };

  const handleSave = async (id) => {
    setSaving(true);
    try {
      await updateProperty(id, editForm);
      cancelEdit();
      fetchProperties();
    } catch (err) {
      alert("Update failed: " + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Manage Properties
            </h1>
            <p className="text-slate-500 mt-1">{properties.length} total</p>
          </div>
          <Link
            to="/admin/add-property"
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <FaPlus />
            Add Property
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Location</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Area</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-400">
                        No properties found.{" "}
                        <Link to="/admin/add-property" className="text-blue-900 font-semibold underline">
                          Add one now
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    properties.map((property) => (
                      editingProperty === property._id ? (
                        /* Inline Edit Row */
                        <tr key={property._id} className="bg-blue-50">
                          <td className="p-3">
                            <input
                              className="w-full border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.title}
                              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              className="w-full border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.location}
                              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            />
                          </td>
                          <td className="p-3">
                            <select
                              className="border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.type}
                              onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                            >
                              {TYPES.map((t) => <option key={t}>{t}</option>)}
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              className="w-full border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.area}
                              onChange={(e) => setEditForm({ ...editForm, area: e.target.value })}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              className="w-full border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                            />
                          </td>
                          <td className="p-3">
                            <select
                              className="border border-slate-300 p-2 rounded-lg text-sm"
                              value={editForm.status}
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                            >
                              {STATUSES.map((s) => <option key={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleSave(property._id)}
                                disabled={saving}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium disabled:opacity-60"
                              >
                                <FaCheck /> Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium"
                              >
                                <FaTimes /> Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={property._id} className="hover:bg-slate-50 transition">
                          <td className="p-4 font-medium text-slate-800 max-w-[200px] truncate">
                            {property.title}
                          </td>
                          <td className="p-4 text-slate-600">{property.location}</td>
                          <td className="p-4">
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-medium">
                              {property.type}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">{property.area}</td>
                          <td className="p-4 text-green-700 font-semibold">
                            ₹{property.price?.toLocaleString("en-IN")}
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                property.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : property.status === "Sold"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {property.status || "Available"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => startEdit(property)}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium transition"
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(property._id)}
                                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-lg flex items-center gap-1 text-xs font-medium transition"
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminProperties;