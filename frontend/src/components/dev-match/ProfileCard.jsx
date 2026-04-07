const stats = [
  { key: "repos", label: "Repositories" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" },
  { key: "topSkill", label: "Top Skill" },
  { key: "engineeringDNA", label: "Developer Type" },
  { key: "activityScore", label: "Activity Score" },
];

export default function ProfileCard({ user }) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="bg-slate-50 px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <img
            className="h-20 w-20 rounded-[24px] border-4 border-white object-cover shadow-[0_18px_30px_rgba(15,23,42,0.12)]"
            src={user.avatar}
            alt={user.name}
          />

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              GitHub profile
            </p>
            <h2 className="text-2xl font-semibold text-slate-950">{user.name}</h2>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>

      </div>

      <div className="grid gap-3 px-6 py-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user[stat.key]}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200/80 px-6 py-6">
        <h3 className="text-lg font-semibold text-slate-950">Top Languages</h3>
        {user.topLanguages.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No language data available.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {user.topLanguages.map((language) => (
              <li
                key={language.name}
                className="rounded-full border border-slate-200 bg-slate-100/90 px-3 py-2 text-sm font-medium text-blue-800"
              >
                {language.name} {language.percentage}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
