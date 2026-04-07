import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col text-slate-900">
      <Navbar />
      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-blue-50/70" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
