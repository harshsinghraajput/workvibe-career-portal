"use client";

import { Suspense, useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/JobCard";
import { Job } from "@/types/job";

const LOCATIONS = ["All", "Ahmedabad", "Bangalore", "Pune", "Hyderabad", "Mumbai", "Delhi NCR", "Chennai", "Remote"];
const EXPERIENCES = ["All", "Fresher", "0-1 Years", "1-3 Years", "2-4 Years", "3-5 Years", "5-8 Years", "6-10 Years"];
const TYPES = ["All", "Full Time", "Part Time", "Contract", "Internship"];
const WORK_MODES = ["All", "Remote", "Hybrid", "Office"];
const PAGE_SIZE = 5;

function JobsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "All");
  const [experience, setExperience] = useState(searchParams.get("experience") || "All");
  const [jobType, setJobType] = useState(searchParams.get("type") || "All");
  const [workMode, setWorkMode] = useState(searchParams.get("mode") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const syncUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (location !== "All") params.set("location", location);
    if (experience !== "All") params.set("experience", experience);
    if (jobType !== "All") params.set("type", jobType);
    if (workMode !== "All") params.set("mode", workMode);
    if (sortBy !== "latest") params.set("sort", sortBy);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [search, location, experience, jobType, workMode, sortBy, page, pathname, router]);

  useEffect(() => {
    syncUrl();
  }, [syncUrl]);

  useEffect(() => {
    setPage(1);
  }, [search, location, experience, jobType, workMode, sortBy]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)) ||
          j.location.toLowerCase().includes(q)
      );
    }
    if (location !== "All") {
      result = result.filter((j) => j.location === location || (location === "Remote" && j.workMode === "Remote"));
    }
    if (experience !== "All") result = result.filter((j) => j.experience === experience);
    if (jobType !== "All") result = result.filter((j) => j.type === jobType);
    if (workMode !== "All") result = result.filter((j) => j.workMode === workMode);
    result.sort((a, b) => {
      if (sortBy === "latest") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      if (sortBy === "oldest") return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      if (sortBy === "salary") {
        return (parseInt(b.salary.replace(/[^\d]/g, "")) || 0) - (parseInt(a.salary.replace(/[^\d]/g, "")) || 0);
      }
      if (sortBy === "experience") {
        return (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0);
      }
      return 0;
    });
    return result;
  }, [search, location, experience, jobType, workMode, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE) || 1;
  const paginated = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectClass =
    "px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#161616] text-sm text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#B794F4]";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: "#2a2a2a", borderTopColor: "#B794F4" }} />
        <p className="mt-4 text-[#a3a3a3]">Loading jobs...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Job Openings</h1>
        <p className="mt-2 text-[#a3a3a3]">
          {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
        </p>
      </div>

      <div className="mb-6">
        <label htmlFor="job-search" className="sr-only">Search jobs</label>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#525252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="job-search"
            type="search"
            placeholder="Search by job title, company, or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#2a2a2a] bg-[#161616] text-white placeholder:text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#B794F4]"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3" role="group" aria-label="Job filters">
          <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass} aria-label="Filter by location">
            {LOCATIONS.map((l) => <option key={l} value={l}>{l === "All" ? "All Locations" : l}</option>)}
          </select>
          <select value={experience} onChange={(e) => setExperience(e.target.value)} className={selectClass} aria-label="Filter by experience">
            {EXPERIENCES.map((e) => <option key={e} value={e}>{e === "All" ? "All Experience" : e}</option>)}
          </select>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={selectClass} aria-label="Filter by job type">
            {TYPES.map((t) => <option key={t} value={t}>{t === "All" ? "All Job Types" : t}</option>)}
          </select>
          <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} className={selectClass} aria-label="Filter by work mode">
            {WORK_MODES.map((w) => <option key={w} value={w}>{w === "All" ? "All Work Modes" : w}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#a3a3a3]">Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass} aria-label="Sort jobs">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="salary">Salary (High to Low)</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="text-center py-20 bg-[#161616] rounded-2xl border border-[#2a2a2a]" role="status">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white">No jobs found</h3>
          <p className="mt-2 text-[#a3a3a3]">Try adjusting your search or filters.</p>
          <button type="button" onClick={() => { setSearch(""); setLocation("All"); setExperience("All"); setJobType("All"); setWorkMode("All"); }}
            className="mt-6 px-5 py-2.5 rounded-full text-sm font-bold btn-press"
            style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)", color: "#0a0a0a" }}>
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-5">
            {paginated.map((job: Job) => <JobCard key={job.id} job={job} />)}
          </div>
          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-sm text-[#a3a3a3] disabled:opacity-40 btn-press">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} type="button" onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium btn-press ${page === p ? "text-[#0a0a0a]" : "text-[#a3a3a3]"}`}
                  style={page === p ? { background: "linear-gradient(135deg, #B794F4, #9F7AEA)" } : {}}
                  aria-current={page === p ? "page" : undefined}>{p}</button>
              ))}
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-[#2a2a2a] text-sm text-[#a3a3a3] disabled:opacity-40 btn-press">Next</button>
            </nav>
          )}
        </>
      )}
    </>
  );
}

export default function JobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: "#2a2a2a", borderTopColor: "#B794F4" }} />
          <p className="mt-4 text-[#a3a3a3]">Loading jobs...</p>
        </div>
      }>
        <JobsContent />
      </Suspense>
    </div>
  );
}
