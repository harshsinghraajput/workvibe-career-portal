"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Text only — no logo mark */}
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity">
            Work<span style={{ color: "#B794F4" }}>Vibe</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 btn-press ${
                  pathname === link.href
                    ? "bg-[#B794F4]/15 text-[#B794F4]"
                    : "text-[#a3a3a3] hover:text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/jobs"
              className="ml-3 px-6 py-2.5 rounded-full text-[#0a0a0a] text-sm font-bold btn-press font-display"
              style={{
                background: "linear-gradient(135deg, #B794F4, #9F7AEA)",
                boxShadow: "0 4px 18px rgba(183, 148, 244, 0.35)",
              }}
            >
              Browse Jobs
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#a3a3a3] hover:bg-[#2a2a2a] btn-press"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[#2a2a2a] pt-3 space-y-1 animate-fade-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  pathname === link.href ? "bg-[#B794F4]/15 text-[#B794F4]" : "text-[#a3a3a3]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/jobs"
              onClick={() => setMobileOpen(false)}
              className="block mx-4 mt-2 text-center px-4 py-2.5 rounded-full text-[#0a0a0a] text-sm font-bold font-display"
              style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)" }}
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
