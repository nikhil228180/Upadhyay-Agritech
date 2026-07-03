import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white p-2 rounded-lg">
                <FaLeaf size={18} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Upadhyay Agritech</h3>
                <p className="text-xs text-slate-400">
                  Agriculture &amp; Real Estate
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bihar&apos;s trusted partner for agricultural services and real
              estate solutions since 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/properties", label: "Properties" },
                { to: "/#services", label: "Services" },
                { to: "/#leadership", label: "Leadership" },
                { to: "/#contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-green-400 transition"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">
              Contact Info
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-0.5 text-green-400 shrink-0" />
                <span>Lalganj, Vaishali, Bihar — 844121</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400 shrink-0" />
                <a
                  href="tel:+916299952667"
                  className="hover:text-green-400 transition"
                >
                  +91 62999 52667
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-400 shrink-0" />
                <a
                  href="https://wa.me/916299952667"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-400 transition"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-400 shrink-0" />
                <a
                  href="mailto:nikhil228180@gmail.com"
                  className="hover:text-green-400 transition"
                >
                  nikhil228180@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Upadhyay Agritech. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;