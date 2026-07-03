import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api/propertyApi";

function PropertyGallery() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties({ featured: "true", limit: 3 })
      .then((res) => setProperties(res.data.data))
      .catch(() => {
        // Fallback to placeholder images if API fails
        setProperties([]);
      });
  }, []);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  ];

  const displayItems =
    properties.length > 0
      ? properties.map((p) => ({
          id: p._id,
          image:
            p.image ||
            (p.images && p.images[0]) ||
            fallbackImages[0],
          title: p.title,
          location: p.location,
        }))
      : fallbackImages.map((img, i) => ({
          id: null,
          image: img,
          title: `Featured Property ${i + 1}`,
          location: "Lalganj, Vaishali, Bihar",
        }));

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
            Our Portfolio
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            Property Gallery
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Browse through our featured properties and find your perfect
            investment opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="font-bold text-lg">{item.title}</p>
                  <p className="text-sm text-white/80">{item.location}</p>
                  {item.id && (
                    <Link
                      to={`/property/${item.id}`}
                      className="inline-block mt-2 bg-white text-blue-900 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-green-50 transition"
                    >
                      View Details →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-block bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PropertyGallery;