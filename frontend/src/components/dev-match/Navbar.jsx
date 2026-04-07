import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const linkClassName = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-slate-900 text-white shadow-[0_12px_25px_rgba(15,23,42,0.18)]"
        : "text-slate-200 hover:bg-white/10 hover:text-white",
    ].join(" ");

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-slate-950/75 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/45 p-1.5 shadow-[0_16px_32px_rgba(29,78,216,0.18)] ring-1 ring-white/10">
            <BrandLogo className="h-full w-full object-contain" />
          </span>
          <span>DevDNA</span>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <NavLink to="/" className={linkClassName}>
            Home
          </NavLink>
          <NavLink to="/compare" className={linkClassName}>
            Compare
          </NavLink>
          <NavLink to="/about" className={linkClassName}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
