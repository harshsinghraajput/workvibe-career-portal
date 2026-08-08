import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#a3a3a3] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-display font-bold text-xl text-white">
              Work<span style={{ color: "#B794F4" }}>Vibe</span>
            </span>
            <p className="text-sm leading-relaxed mt-3">
              Find your vibe. Land your dream role. Built for the next-gen workforce.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#B794F4] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[#B794F4] transition-colors">
                  Browse Jobs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 font-display">Contact</h3>
            <a
              href="mailto:iaamharshsinghrajput@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B794F4] hover:text-[#9F7AEA] transition-colors underline underline-offset-4"
            >
              Reach us
            </a>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 WorkVibe. All rights reserved.</p>
          <p>Made with ❤️ for the next gen</p>
        </div>
      </div>
    </footer>
  );
}
