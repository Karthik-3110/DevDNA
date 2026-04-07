import { useEffect, useState } from "react";
import ProfileCard from "../components/dev-match/ProfileCard";
import SiteLayout from "../components/dev-match/SiteLayout";
import { fetchProfileCard } from "../lib/githubApi";
import { getProfileErrorMessage } from "../lib/profileErrors";

const comparisonRows = [
  ["Repositories", "repos"],
  ["Followers", "followers"],
  ["Following", "following"],
  ["Top Skill", "topSkill"],
  ["Developer Type", "engineeringDNA"],
  ["Activity Score", "activityScore"],
];

export default function ComparePage() {
  const [username1, setUsername1] = useState("octocat");
  const [username2, setUsername2] = useState("gaearon");
  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadComparison(firstUsername, secondUsername) {
    setLoading(true);
    setError("");

    try {
      const [firstProfile, secondProfile] = await Promise.all([
        fetchProfileCard(firstUsername),
        fetchProfileCard(secondUsername),
      ]);

      setUser1(firstProfile);
      setUser2(secondProfile);
    } catch (loadError) {
      setError(getProfileErrorMessage(loadError, "Unable to compare GitHub profiles right now."));
      setUser1(null);
      setUser2(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComparison(username1, username2);
  }, []);

  async function handleCompare(event) {
    event.preventDefault();

    const firstUsername = username1.trim();
    const secondUsername = username2.trim();

    if (!firstUsername || !secondUsername) {
      setError("Please enter both usernames.");
      return;
    }

    await loadComparison(firstUsername, secondUsername);
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Side by side
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">
            Compare two GitHub profiles
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Enter two usernames and compare their profile summaries without digging through
            every repository manually.
          </p>

          <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={handleCompare}>
            <input
              className="rounded-[22px] border border-slate-200 bg-slate-100/80 px-4 py-3 outline-none transition focus:border-blue-500"
              type="text"
              value={username1}
              onChange={(event) => setUsername1(event.target.value)}
              placeholder="First username"
            />
            <input
              className="rounded-[22px] border border-slate-200 bg-slate-100/80 px-4 py-3 outline-none transition focus:border-blue-500"
              type="text"
              value={username2}
              onChange={(event) => setUsername2(event.target.value)}
              placeholder="Second username"
            />
            <button
              className="rounded-[22px] bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              type="submit"
            >
              Compare
            </button>
          </form>
        </div>

        {loading && (
          <div className="mt-6 rounded-[22px] border border-slate-200 bg-white/80 px-5 py-4 text-sm text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.05)] backdrop-blur">
            Loading comparison...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-[22px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && user1 && user2 && (
          <>
            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <ProfileCard user={user1} />
              <ProfileCard user={user2} />
            </div>

            <div className="mt-6 overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="border-b border-slate-200 bg-blue-700 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">Quick comparison</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100/90">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-900">Field</th>
                      <th className="px-6 py-4 font-semibold text-slate-900">{user1.username}</th>
                      <th className="px-6 py-4 font-semibold text-slate-900">{user2.username}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map(([label, key]) => (
                      <tr key={label} className="border-t border-slate-200">
                        <td className="px-6 py-4 text-slate-500">{label}</td>
                        <td className="px-6 py-4 text-slate-900">{user1[key]}</td>
                        <td className="px-6 py-4 text-slate-900">{user2[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
