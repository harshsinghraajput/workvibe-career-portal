"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isJobApplied } from "@/lib/applied";

export default function ApplyButton({ jobId }: { jobId: number }) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(isJobApplied(jobId));
  }, [jobId]);

  if (applied) {
    return (
      <span className="applied-badge inline-flex items-center justify-center px-6 py-3 rounded-full text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30">
        ✓ Already Applied
      </span>
    );
  }

  return (
    <Link
      href={`/apply/${jobId}`}
      className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold btn-press"
      style={{
        background: "linear-gradient(135deg, #B794F4, #9F7AEA)",
        color: "#0a0a0a",
        boxShadow: "0 4px 15px rgba(183, 148, 244, 0.35)",
      }}
    >
      Apply for this position
    </Link>
  );
}
