import SiteLayout from "../components/dev-match/SiteLayout";
import BrandLogo from "../components/dev-match/BrandLogo";

const stack = [
  "React on the frontend",
  "Express on the backend",
  "Tailwind CSS for styling",
  "GitHub profile data as the source",
];

const goals = [
  "Keep the UI easy to understand",
  "Show useful profile data without too much clutter",
  "Stay beginner-friendly in both code and layout",
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[30px] bg-blue-700 p-8 text-white shadow-[0_24px_60px_rgba(29,78,216,0.18)]">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-slate-950/15 p-2">
                <BrandLogo className="h-full w-full object-contain" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                About DevDNA
              </p>
            </div>
            <h1 className="mt-4 text-4xl font-semibold">A simpler way to read GitHub profiles.</h1>
            <p className="mt-5 text-base leading-8 text-blue-100">
              DevDNA is a web app that takes a GitHub username, analyzes their repositories using the GitHub REST API, and shows their top programming skill and developer type (Frontend, Backend, or Full Stack) in a simple profile card.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/70 bg-white/80 p-8 shadow-[0_20px_45px_rgba(15,23,42,0.07)] backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-950">What is inside the project</h2>
            <ul className="mt-6 space-y-3 text-slate-600">
              {stack.map((item) => (
                <li key={item} className="rounded-[20px] border border-slate-200 bg-slate-100/85 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-[30px] border border-white/70 bg-white/80 p-8 shadow-[0_20px_45px_rgba(15,23,42,0.07)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Design goal
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Clean enough to look good, simple enough to learn from.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {goals.map((goal) => (
              <div
                key={goal}
                className="rounded-[20px] border border-slate-200 bg-slate-50 p-5 text-slate-600"
              >
                {goal}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
