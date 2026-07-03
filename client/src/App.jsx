import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminAddProperty from "./pages/AdminAddProperty";
import AdminContacts from "./pages/AdminContacts";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin — Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/properties"
        element={
          <ProtectedRoute adminOnly>
            <AdminProperties />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-property"
        element={
          <ProtectedRoute adminOnly>
            <AdminAddProperty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute adminOnly>
            <AdminContacts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;