function RecommendationCard({ title, company, type, skills }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
        {type}
      </span>

      <h3 className="text-xl font-bold mt-4">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {company}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">

        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-slate-100 px-3 py-1 rounded-lg text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

      <button className="mt-5 text-violet-600 font-semibold">
        View Details →
      </button>

    </div>
  );
}

export default RecommendationCard;