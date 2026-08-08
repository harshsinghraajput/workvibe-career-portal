"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { isJobApplied } from "@/lib/applied";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(isJobApplied(job.id));
  }, [job.id]);

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleViewApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // One click → go straight to apply form (or details if already applied)
    if (applied) {
      router.push(`/jobs/${job.id}`);
    } else {
      router.push(`/apply/${job.id}`);
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/jobs/${job.id}`);
  };

  return (
    <article className="group relative z-10 bg-[#161616] rounded-2xl border border-[#2a2a2a] p-5 sm:p-6 hover:border-[#B794F4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6),0_0_30px_rgba(183,148,244,0.25)]">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B794F4]/15 text-[#B794F4]">
              {job.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2a2a2a] text-[#a3a3a3]">
              {job.workMode}
            </span>
            {applied && (
              <span className="applied-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                ✓ Applied
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white group-hover:text-[#B794F4] transition-colors">
            <button
              type="button"
              onClick={handleTitleClick}
              className="text-left hover:underline cursor-pointer bg-transparent border-0 p-0 font-inherit text-inherit"
            >
              {job.title}
            </button>
          </h3>

          <p className="text-sm text-[#a3a3a3] mt-0.5">{job.company}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-[#a3a3a3]">
            <span>{job.location}</span>
            <span>{job.experience}</span>
            <span className="font-medium" style={{ color: "#B794F4" }}>{job.salary}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-[#0a0a0a] text-xs text-[#a3a3a3] border border-[#2a2a2a]"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-[#525252]">+{job.skills.length - 4}</span>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0 relative z-20">
          <span className="text-xs text-[#525252] whitespace-nowrap">
            {daysAgo === 0 ? "Today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`}
          </span>
          <button
            type="button"
            onClick={handleViewApply}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold btn-press cursor-pointer border-0 relative z-20"
            style={{
              background: applied
                ? "#2a2a2a"
                : "linear-gradient(135deg, #B794F4, #9F7AEA)",
              color: applied ? "#a3a3a3" : "#0a0a0a",
              boxShadow: applied ? "none" : "0 4px 12px rgba(183, 148, 244, 0.3)",
            }}
          >
            {applied ? "View" : "View & Apply"}
          </button>
        </div>
      </div>
    </article>
  );
}
