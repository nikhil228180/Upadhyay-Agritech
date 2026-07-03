import { useState } from "react";
import { submitContact } from "../api/contactApi";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mt-2">Contact Us</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Have a question or want to know more about a property? We&apos;re here to
            help you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Reach Us Directly
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <FaPhone className="text-green-700" />,
                    label: "Phone",
                    value: "+91 62999 52667",
                    href: "tel:+916299952667",
                  },
                  {
                    icon: <FaWhatsapp className="text-green-700" />,
                    label: "WhatsApp",
                    value: "Chat on WhatsApp",
                    href: "https://wa.me/916299952667",
                  },
                  {
                    icon: <FaEnvelope className="text-blue-700" />,
                    label: "Email",
                    value: "nikhil228180@gmail.com",
                    href: "mailto:nikhil228180@gmail.com",
                  },
                  {
                    icon: <FaMapMarkerAlt className="text-red-600" />,
                    label: "Address",
                    value: "Lalganj, Vaishali, Bihar — 844121",
                    href: null,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="text-slate-700 font-medium hover:text-blue-900 transition"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-700 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-200 flex items-center justify-center">
              <a
                href="https://maps.google.com/?q=Lalganj,Vaishali,Bihar"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 text-slate-500 hover:text-blue-900 transition"
              >
                <FaMapMarkerAlt size={30} />
                <span className="text-sm font-medium">
                  View on Google Maps
                </span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg space-y-4"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Send a Message
              </h3>

              {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm font-medium">
                  ✅ Message sent! We&apos;ll get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm font-medium">
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <input
                name="name"
                type="text"
                placeholder="Your Full Name *"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message *"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;