import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSlidebar";
import { addProperty } from "../api/propertyApi";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const TYPES = ["Agricultural Land", "Residential", "Commercial"];

function AdminAddProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    area: "",
    type: "Agricultural Land",
    status: "Available",
    description: "",
    image: "",
    whatsappNumber: "916299952667",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addProperty({ ...form, price: Number(form.price) });
      navigate("/admin/properties");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add property. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-900 font-medium transition"
            >
              <FaArrowLeft />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Add New Property
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Fill in the details below to list a new property.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 font-medium text-sm">
              ❌ {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-8 space-y-6"
          >
            {/* Basic Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-700 mb-4">
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Property Title *
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. 5 Acre Farm Land in Vaishali"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Location *
                  </label>
                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. Lalganj, Vaishali, Bihar"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    placeholder="e.g. 2500000"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Area *
                  </label>
                  <input
                    name="area"
                    type="text"
                    placeholder="e.g. 5 Acres or 1200 sq.ft"
                    value={form.area}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  >
                    {TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  >
                    <option>Available</option>
                    <option>Sold</option>
                    <option>Under Negotiation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the property in detail..."
                value={form.description}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-none"
              />
            </div>

            {/* Media */}
            <div>
              <h2 className="text-lg font-bold text-slate-700 mb-4">
                Media &amp; Contact
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Primary Image URL
                  </label>
                  <input
                    name="image"
                    type="url"
                    placeholder="https://..."
                    value={form.image}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="mt-2 h-24 w-full object-cover rounded-xl"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    name="whatsappNumber"
                    type="text"
                    placeholder="916299952667"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-900 cursor-pointer"
              />
              <label
                htmlFor="featured"
                className="text-slate-700 font-medium cursor-pointer"
              >
                Mark as Featured Property (shows on Home page gallery)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition disabled:opacity-60"
            >
              <FaSave />
              {loading ? "Saving..." : "Save Property"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminAddProperty;
