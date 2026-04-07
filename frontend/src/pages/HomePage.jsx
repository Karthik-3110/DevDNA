import { useState } from "react";
import { ArrowRight, Cpu, Search, Sparkles, SquareChartGantt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteLayout from "../components/dev-match/SiteLayout";

const features = [
  {
    title: "Smart Top Skill Detection",
    text: "See the strongest language and the developer's main technical focus in one place.",
    icon: Sparkles,
  },
  {
    title: "Engineering DNA",
    text: "Understand whether the profile reads more frontend, backend, systems, or full stack.",
    icon: Cpu,
  },
  {
    title: "Clean comparison",
    text: "Open two profiles side by side with a layout that stays easy to scan.",
    icon: SquareChartGantt,
  },
];

const points = ["Fast profile lookup", "Readable stat cards", "Simple beginner-friendly UI"];

export default function HomePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      return;
    }

    navigate(`/dashboard?user=${encodeURIComponent(username.trim())}`);
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-blue-50/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
              DevDNA profile analyzer
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
              Analyze a GitHub profile
              <span className="block text-blue-700">
                without digging through every repo.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              DevDNA turns a username into a clean developer summary with profile stats,
              top languages, and an easy-to-read engineering DNA card.
            </p>

            <form
              className="mt-10 rounded-[30px] border border-white/70 bg-white/80 p-4 shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur"
              onSubmit={handleSubmit}
            >
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Enter GitHub username
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-100/80 px-4 py-3">
                  <Search size={18} className="text-blue-700" />
                  <input
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    type="text"
                    placeholder="for example: octocat"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                  type="submit"
                >
                  Analyze
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              {points.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-slate-200 bg-slate-100/90 px-4 py-2 text-sm text-slate-700"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-2 text-3xl font-semibold text-blue-700">
              Core features: 
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const featured = index === 1;

            return (
              <article
                key={feature.title}
                className={
                  featured
                    ? "rounded-[30px] bg-blue-700 p-6 text-white shadow-[0_24px_60px_rgba(29,78,216,0.18)]"
                    : "rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur"
                }
              >
                <div
                  className={
                    featured
                      ? "flex h-12 w-12 items-center justify-center rounded-[18px] bg-white/15 text-white"
                      : "flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-100 text-blue-700"
                  }
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{feature.title}</h3>
                <p className={featured ? "mt-3 text-base leading-8 text-blue-100" : "mt-3 text-base leading-8 text-slate-600"}>
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
