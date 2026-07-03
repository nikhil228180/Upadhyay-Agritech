function Leadership() {
  const leaders = [
    {
      name: "Aman Kumar Upadhyay",
      role: "Co-Founder & Managing Director",
      initials: "AK",
      color: "from-blue-600 to-blue-800",
      bio: "Visionary leader with deep roots in agriculture and real estate, driving growth across Vaishali district.",
    },
    {
      name: "Nikhil Upadhyay",
      role: "Co-Founder & Operations Head",
      initials: "NU",
      color: "from-green-600 to-green-800",
      bio: "Tech-savvy operations expert ensuring seamless service delivery and customer satisfaction.",
    },
  ];

  return (
    <section id="leadership" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-green-700 font-semibold text-sm uppercase tracking-widest">
            The Team
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            Executive Leadership
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Meet the founders who built Upadhyay Agritech from the ground up with
            passion and purpose.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Avatar */}
              <div
                className={`bg-gradient-to-br ${leader.color} h-36 flex items-center justify-center`}
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                  {leader.initials}
                </div>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-800">
                  {leader.name}
                </h3>
                <p className="text-green-700 font-semibold mt-1">
                  {leader.role}
                </p>
                <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leadership;