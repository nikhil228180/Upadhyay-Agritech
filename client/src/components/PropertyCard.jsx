import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRulerCombined, FaTag } from "react-icons/fa";

const TYPE_COLORS = {
  "Agricultural Land": "bg-green-100 text-green-800",
  Residential: "bg-blue-100 text-blue-800",
  Commercial: "bg-purple-100 text-purple-800",
};

const STATUS_COLORS = {
  Available: "bg-emerald-100 text-emerald-800",
  Sold: "bg-red-100 text-red-800",
  "Under Negotiation": "bg-yellow-100 text-yellow-800",
};

function formatPrice(price) {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function PropertyCard({ property }) {
  const imageUrl =
    property.image ||
    (property.images && property.images[0]) ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              TYPE_COLORS[property.type] || "bg-gray-100 text-gray-800"
            }`}
          >
            {property.type}
          </span>
          {property.featured && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              STATUS_COLORS[property.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {property.status || "Available"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug">
          {property.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-slate-500 text-sm">
          <FaMapMarkerAlt className="text-green-600 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-slate-500 text-sm">
          <FaRulerCombined className="text-blue-600 shrink-0" />
          <span>{property.area}</span>
        </div>

        <div className="mt-4 flex items-center gap-1">
          <FaTag className="text-green-700" />
          <span className="text-green-700 font-bold text-xl">
            {formatPrice(property.price)}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Link
            to={`/property/${property._id}`}
            className="block text-center bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;