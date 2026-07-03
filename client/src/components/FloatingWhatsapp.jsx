import { FaWhatsapp } from "react-icons/fa";

function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/916299952667"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

export default FloatingWhatsapp;