import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProfileCard from "../components/dev-match/ProfileCard";
import SiteLayout from "../components/dev-match/SiteLayout";
import { fetchProfileCard } from "../lib/githubApi";
import { getProfileErrorMessage } from "../lib/profileErrors";

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const selectedUser = searchParams.get("user") || "octocat";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const nextProfile = await fetchProfileCard(selectedUser);
        setProfile(nextProfile);
      } catch (loadError) {
        setError(getProfileErrorMessage(loadError, "Unable to load this GitHub profile right now."));
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [selectedUser]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[30px] bg-blue-700 p-6 text-white shadow-[0_26px_60px_rgba(29,78,216,0.18)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Profile result
              </p>
              <h1 className="mt-2 text-3xl font-semibold">Reading @{selectedUser}</h1>
            </div>

            <Link
              to="/"
              className="inline-flex rounded-full bg-white/95 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-blue-50"
            >
              Search another user
            </Link>
          </div>
        </div>

        {loading && (
          <div className="mb-6 rounded-[22px] border border-slate-200 bg-white/80 px-5 py-4 text-sm text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.05)] backdrop-blur">
            Loading profile...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-[22px] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && profile && <ProfileCard user={profile} />}
      </section>
    </SiteLayout>
  );
}
