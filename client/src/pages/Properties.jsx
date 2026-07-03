import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import { getProperties } from "../api/propertyApi";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const TYPES = ["All", "Agricultural Land", "Residential", "Commercial"];

function PropertySkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-6 bg-slate-200 rounded w-1/3 mt-4" />
        <div className="h-10 bg-slate-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProperties = async (pg = 1) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: 9 };
      if (search) params.search = search;
      if (filter !== "All") params.type = filter;

      const res = await getProperties(params);
      setProperties(res.data.data);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(1);
    setPage(1);
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties(1);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProperties(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
              Our Listings
            </span>
            <h1 className="text-5xl font-bold text-slate-800 mt-2">
              Available Properties
            </h1>
            <p className="text-slate-500 mt-3">
              {total} {total === 1 ? "property" : "properties"} found
            </p>
          </div>

          {/* Search + Filter */}
          <div className="bg-white rounded-2xl shadow p-5 mb-10">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  className="w-full border border-slate-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      fetchProperties(1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <FaFilter className="text-slate-400" />
                <select
                  className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <PropertySkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🏚️</div>
              <h3 className="text-2xl font-bold text-slate-700">
                No Properties Found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your search or filter.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition"
              >
                ← Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-xl border font-semibold transition ${
                    page === i + 1
                      ? "bg-blue-900 text-white border-blue-900"
                      : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

export default Properties;