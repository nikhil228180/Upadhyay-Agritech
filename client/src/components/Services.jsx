import { FaLeaf, FaSeedling, FaTractor, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaLeaf size={32} className="text-green-600" />,
    title: "Agriculture Services",
    description:
      "Seeds, fertilizers, crop consultancy, irrigation guidance and modern farming support for maximum yield.",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    icon: <FaSeedling size={32} className="text-blue-600" />,
    title: "Real Estate",
    description:
      "Commercial plots, agricultural land, residential properties and investment consultancy across Bihar.",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: <FaTractor size={32} className="text-amber-600" />,
    title: "Farm Equipment",
    description:
      "Access to modern farming machinery and equipment on rent or purchase for improved productivity.",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    icon: <FaHandshake size={32} className="text-purple-600" />,
    title: "Quick Support",
    description:
      "Fast WhatsApp support and priority customer assistance available 7 days a week.",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            Our Services
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Comprehensive solutions for agriculture and real estate needs, all
            under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${service.bg} border ${service.border} p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 cursor-default`}
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;