function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">

      <h3 className="text-slate-500 text-sm">
        {title}
      </h3>

      <p className={`text-5xl font-extrabold mt-3 ${color}`}>
        {value}
      </p>

    </div>
  );
}

export default StatsCard;