"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 sm:py-28 text-center animate-scale-in">
      <div
        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 animate-pulse-glow"
        style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)" }}
      >
        <svg className="w-12 h-12 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
        Thank you for applying.
      </h1>
      <p className="mt-4 text-lg text-[#a3a3a3] leading-relaxed">
        Our recruitment team will contact you if your profile matches our requirements.
      </p>

      <p className="mt-6 text-sm text-[#525252]">
        Redirecting to home in <span className="font-bold text-[#B794F4]">{countdown}s</span>
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold btn-press"
          style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)", color: "#0a0a0a" }}
        >
          Browse more jobs
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#2a2a2a] text-[#a3a3a3] font-medium btn-press hover:bg-[#161616]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
