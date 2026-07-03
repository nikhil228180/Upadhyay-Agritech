import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaHome } from "react-icons/fa";

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "10+", label: "Years Experience" },
  { value: "1000+", label: "Happy Clients" },
  { value: "3", label: "States Covered" },
];

function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-green-800 text-white overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-8 text-sm font-medium backdrop-blur"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Bihar&apos;s Trusted Agriculture &amp; Property Partner
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Upadhyay{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
            Agritech
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
        >
          Premium Agriculture &amp; Real Estate Solutions in Lalganj, Vaishali,
          Bihar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/properties"
            className="flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-lg shadow-black/20"
          >
            <FaHome />
            Explore Properties
          </Link>

          <a
            href="https://wa.me/916299952667"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-black/20"
          >
            <FaWhatsapp size={20} />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-300">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;