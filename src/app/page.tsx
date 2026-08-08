import Link from "next/link";
import { getFeaturedJobs } from "@/data/jobs";
import JobCard from "@/components/JobCard";

export default function HomePage() {
  const featured = getFeaturedJobs();

  return (
    <div>
      <section
        className="relative overflow-hidden min-h-[88vh] flex items-center"
        style={{ background: "linear-gradient(160deg, #0a0a0a 0%, #1a1225 45%, #0a0a0a 100%)" }}
      >
        <div className="absolute top-16 left-[8%] w-64 h-64 rounded-full opacity-30 animate-float pointer-events-none"
          style={{ background: "radial-gradient(circle, #B794F4, transparent)", filter: "blur(50px)" }} />
        <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full opacity-20 animate-float pointer-events-none"
          style={{ background: "radial-gradient(circle, #9F7AEA, transparent)", filter: "blur(70px)", animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-4xl animate-fade-up">
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-5 font-display" style={{ color: "#B794F4" }}>
              ✦ Your career starts here
            </p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
              Find Your
              <span className="block" style={{ color: "#B794F4" }}>Next Vibe</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-[#a3a3a3] leading-relaxed max-w-xl">
              Scroll less. Apply faster. Land roles that actually match your energy.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-lg btn-press animate-pulse-glow font-display"
                style={{
                  background: "linear-gradient(135deg, #B794F4, #9F7AEA)",
                  color: "#0a0a0a",
                  boxShadow: "0 10px 35px rgba(183, 148, 244, 0.4)",
                }}
              >
                Explore Jobs →
              </Link>
              <a
                href="#why-join"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 font-bold text-lg btn-press text-white font-display"
                style={{ borderColor: "#2a2a2a" }}
              >
                Why WorkVibe?
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-[#2a2a2a]" style={{ background: "#121212" }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "50+", label: "Open Roles" },
            { value: "30+", label: "Companies" },
            { value: "1k+", label: "Hires" },
          ].map((s) => (
            <div key={s.label} className="card-3d">
              <p className="text-4xl sm:text-5xl font-bold font-display" style={{ color: "#B794F4" }}>{s.value}</p>
              <p className="text-xs sm:text-sm text-[#a3a3a3] mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">Hot Roles 🔥</h2>
              <p className="mt-2 text-[#a3a3a3]">Hand-picked. Fresh. Ready for you.</p>
            </div>
            <Link href="/jobs" className="hidden sm:inline-flex font-bold hover:underline font-display" style={{ color: "#B794F4" }}>
              See all →
            </Link>
          </div>
          <div className="grid gap-5">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section id="why-join" className="py-16 sm:py-20" style={{ background: "#121212" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-display">Why WorkVibe?</h2>
            <p className="mt-4 text-lg text-[#a3a3a3]">No fluff. Just real opportunities.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Growth Mode", desc: "Learn fast, level up faster.", icon: "📈" },
              { title: "Flex Life", desc: "Remote, hybrid, your rules.", icon: "🏠" },
              { title: "Real Impact", desc: "Work that actually matters.", icon: "🚀" },
              { title: "Good Vibes", desc: "Teams that get you.", icon: "✨" },
            ].map((item) => (
              <div key={item.title} className="card-3d p-6 rounded-2xl bg-[#161616] border border-[#2a2a2a] hover:border-[#B794F4]/40">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-xl font-display">{item.title}</h3>
                <p className="mt-2 text-sm text-[#a3a3a3]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
