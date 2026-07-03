import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHome,
  FaPlus,
  FaEnvelope,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const links = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    end: true,
  },
  {
    to: "/admin/properties",
    label: "Properties",
    icon: <FaHome />,
    end: false,
  },
  {
    to: "/admin/add-property",
    label: "Add Property",
    icon: <FaPlus />,
    end: false,
  },
  {
    to: "/admin/contacts",
    label: "Inquiries",
    icon: <FaEnvelope />,
    end: false,
  },
];

function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 shrink-0 bg-slate-900 min-h-screen flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-green-500 text-white p-2 rounded-lg">
            <FaLeaf size={16} />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Upadhyay Agritech
            </p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;