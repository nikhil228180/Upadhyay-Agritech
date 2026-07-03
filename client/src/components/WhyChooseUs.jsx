import { motion } from "framer-motion";
import { FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";

const reasons = [
  {
    icon: <FaShieldAlt size={28} className="text-blue-700" />,
    title: "Trusted Experience",
    description:
      "Over 10 years of professional guidance in agriculture and property investments across Bihar.",
    bg: "bg-blue-50",
  },
  {
    icon: <FaStar size={28} className="text-amber-600" />,
    title: "Quality Services",
    description:
      "Reliable solutions backed by practical knowledge, industry expertise, and strong local networks.",
    bg: "bg-amber-50",
  },
  {
    icon: <FaUsers size={28} className="text-green-700" />,
    title: "Customer First",
    description:
      "Dedicated assistance with fast communication, full transparency, and personalised attention.",
    bg: "bg-green-50",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
            Our Promise
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            Why Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`${reason.bg} p-8 rounded-2xl`}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow flex items-center justify-center mb-5">
                {reason.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800">
                {reason.title}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;