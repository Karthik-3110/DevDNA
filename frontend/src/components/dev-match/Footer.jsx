import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Compare", to: "/compare" },
  { label: "About", to: "/about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 p-1.5">
                <BrandLogo className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="text-base font-semibold text-slate-900">DevDNA</p>
                <p className="text-sm text-slate-500">GitHub profile analyzer</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              GitHub profile summaries with quick comparisons and readable developer DNA insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {footerLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-900 hover:text-white",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 px-1 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} DevDNA</p>
          <p>Simple UI, less repo digging.</p>
        </div>
      </div>
    </footer>
  );
}
