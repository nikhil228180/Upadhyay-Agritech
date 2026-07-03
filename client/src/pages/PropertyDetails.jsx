import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import { getPropertyById } from "../api/propertyApi";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaTag,
  FaWhatsapp,
  FaArrowLeft,
  FaPhoneAlt,
} from "react-icons/fa";

const STATUS_COLORS = {
  Available: "bg-emerald-100 text-emerald-800",
  Sold: "bg-red-100 text-red-800",
  "Under Negotiation": "bg-yellow-100 text-yellow-800",
};

function formatPrice(price) {
  if (!price) return "—";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    getPropertyById(id)
      .then((res) => setProperty(res.data.data))
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-900" />
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-3xl font-bold text-slate-800">
            Property Not Found
          </h2>
          <p className="text-slate-500 mt-2">
            This property may have been removed or the link is invalid.
          </p>
          <Link
            to="/properties"
            className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Browse All Properties
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Build images array
  const images = [];
  if (property.image) images.push(property.image);
  if (property.images && property.images.length) {
    property.images.forEach((img) => {
      if (img && !images.includes(img)) images.push(img);
    });
  }
  if (images.length === 0) {
    images.push(
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
    );
  }

  const whatsappNumber = property.whatsappNumber || "916299952667";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-900 mb-6 font-medium transition"
          >
            <FaArrowLeft />
            Back to Properties
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image Gallery */}
            <div>
              <div className="relative">
                <img
                  src={images[activeImg]}
                  alt={property.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      STATUS_COLORS[property.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {property.status || "Available"}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      onClick={() => setActiveImg(i)}
                      className={`h-20 w-28 object-cover rounded-lg cursor-pointer shrink-0 transition border-2 ${
                        activeImg === i
                          ? "border-blue-900"
                          : "border-transparent hover:border-slate-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 grid md:grid-cols-3 gap-8">
              {/* Left — main info */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    {property.type}
                  </span>
                  {property.featured && (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-slate-500">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{property.location}</span>
                </div>

                {property.description && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">
                      About this Property
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right — price card */}
              <div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 sticky top-24">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Price
                    </p>
                    <p className="text-3xl font-bold text-green-700 flex items-center gap-1 mt-1">
                      <FaTag className="text-green-600" />
                      {formatPrice(property.price)}
                    </p>
                  </div>

                  <hr />

                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Area</span>
                      <span className="font-semibold flex items-center gap-1">
                        <FaRulerCombined className="text-blue-600" />
                        {property.area}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type</span>
                      <span className="font-semibold">{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-xs ${
                          STATUS_COLORS[property.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {property.status || "Available"}
                      </span>
                    </div>
                  </div>

                  <hr />

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in: ${property.title}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition"
                  >
                    <FaWhatsapp size={18} />
                    Enquire on WhatsApp
                  </a>

                  <a
                    href="tel:+916299952667"
                    className="flex items-center justify-center gap-2 w-full border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold py-3 rounded-xl transition"
                  >
                    <FaPhoneAlt size={14} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}

export default PropertyDetails;