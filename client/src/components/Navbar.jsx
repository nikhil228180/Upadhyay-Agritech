import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaLeaf } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home", hash: null },
    { to: "/#services", label: "Services", hash: true },
    { to: "/properties", label: "Properties", hash: null },
    { to: "/#leadership", label: "Leadership", hash: true },
    { to: "/#contact", label: "Contact", hash: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-900 to-green-700 text-white p-2 rounded-lg">
            <FaLeaf size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900 leading-tight">
              Upadhyay Agritech
            </h1>
            <p className="text-xs text-green-700 font-medium">
              Agriculture &amp; Real Estate
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium items-center text-slate-700">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-900 border-b-2 border-blue-900 pb-1"
                  : "hover:text-blue-900 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <a href="/#services" className="hover:text-blue-900 transition">
              Services
            </a>
          </li>
          <li>
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-900 border-b-2 border-blue-900 pb-1"
                  : "hover:text-blue-900 transition"
              }
            >
              Properties
            </NavLink>
          </li>
          <li>
            <a href="/#leadership" className="hover:text-blue-900 transition">
              Leadership
            </a>
          </li>
          <li>
            <a href="/#contact" className="hover:text-blue-900 transition">
              Contact
            </a>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white"
                  }`
                }
              >
                Admin Panel
              </NavLink>
            </li>
          )}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-700 hover:text-white transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Admin Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col p-4 gap-1 font-medium text-slate-700">
            {[
              { to: "/", label: "Home" },
              { href: "/#services", label: "Services" },
              { to: "/properties", label: "Properties" },
              { href: "/#leadership", label: "Leadership" },
              { href: "/#contact", label: "Contact" },
            ].map((item) =>
              item.to ? (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className="block py-2 px-3 rounded hover:bg-slate-50"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 px-3 rounded hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded text-blue-900 font-semibold hover:bg-blue-50"
                >
                  Admin Panel
                </NavLink>
              </li>
            )}
            <li className="pt-2 border-t mt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 rounded text-red-700 font-semibold hover:bg-red-50"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block py-2 px-3 rounded bg-blue-900 text-white text-center font-semibold"
                >
                  Admin Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;