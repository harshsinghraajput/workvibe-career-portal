import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 sm:py-28 text-center animate-scale-in">
      <p className="text-8xl font-display font-bold" style={{ color: "#B794F4" }}>404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-[#a3a3a3]">This page took a wrong turn.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-bold btn-press" style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)" }}>
          Go home
        </Link>
        <Link href="/jobs" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#2a2a2a] text-[#a3a3a3] font-bold btn-press hover:bg-[#161616]">
          Browse jobs
        </Link>
      </div>
    </div>
  );
}
