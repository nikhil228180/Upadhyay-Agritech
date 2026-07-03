import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rajan Kumar",
    location: "Vaishali, Bihar",
    text: "Upadhyay Agritech helped me find the perfect agricultural land at a great price. Their guidance was exceptional!",
    initials: "RK",
  },
  {
    name: "Sunita Devi",
    location: "Lalganj, Bihar",
    text: "Excellent service. They made the entire property buying process smooth and transparent. Highly recommended!",
    initials: "SD",
  },
  {
    name: "Prakash Singh",
    location: "Patna, Bihar",
    text: "Got amazing crop advisory support. My yield improved significantly thanks to their expert guidance.",
    initials: "PS",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 to-green-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">
            What Clients Say
          </span>
          <h2 className="text-4xl font-bold mt-2">Testimonials</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8"
            >
              <FaQuoteLeft className="text-green-300 mb-4" size={24} />
              <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-white/60 text-xs">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
