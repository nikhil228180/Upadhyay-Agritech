import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSlidebar";
import { getContacts, markContactRead } from "../api/contactApi";
import { FaEnvelope, FaEnvelopeOpen, FaPhone } from "react-icons/fa";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setContacts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markContactRead(id);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Contact Inquiries
          </h1>
          <p className="text-slate-500 mt-1">
            {unreadCount} unread · {contacts.length} total
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {loading ? (
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-16 text-center">
              <FaEnvelope className="mx-auto text-slate-300" size={48} />
              <p className="text-slate-500 mt-4 font-medium">
                No inquiries yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`p-6 flex flex-col md:flex-row gap-4 justify-between transition ${
                    !contact.isRead ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="mt-1">
                      {contact.isRead ? (
                        <FaEnvelopeOpen className="text-slate-400" size={20} />
                      ) : (
                        <FaEnvelope className="text-blue-600" size={20} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-slate-800">
                          {contact.name}
                        </span>
                        {!contact.isRead && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                            New
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <FaPhone size={11} />
                          <a
                            href={`tel:${contact.phone}`}
                            className="hover:text-blue-900"
                          >
                            {contact.phone}
                          </a>
                        </span>
                        {contact.email && (
                          <span>
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:text-blue-900"
                            >
                              {contact.email}
                            </a>
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-slate-700 text-sm leading-relaxed max-w-2xl">
                        {contact.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(contact.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {!contact.isRead && (
                    <button
                      onClick={() => handleMarkRead(contact._id)}
                      className="shrink-0 self-start text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-medium transition"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminContacts;
