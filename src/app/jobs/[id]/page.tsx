import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById, jobs } from "@/data/jobs";
import ApplyButton from "@/components/ApplyButton";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: String(job.id) }));
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJobById(Number(id));

  if (!job) {
    notFound();
  }

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-[#a3a3a3] hover:text-[#B794F4] mb-6 transition-colors"
      >
        ← Back to jobs
      </Link>

      <div className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8 mb-8 animate-fade-up">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#B794F4]/15 text-[#B794F4]">
            {job.type}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#2a2a2a] text-[#a3a3a3]">
            {job.workMode}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400">
            {daysAgo === 0 ? "Posted today" : `Posted ${daysAgo} days ago`}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">{job.title}</h1>
        <p className="mt-1 text-lg text-[#a3a3a3]">{job.company}</p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#a3a3a3]">
          <span>{job.location}</span>
          <span>{job.experience}</span>
          <span className="font-medium" style={{ color: "#B794F4" }}>{job.salary}</span>
        </div>

        <div className="mt-6">
          <ApplyButton jobId={job.id} />
        </div>
      </div>

      <div className="space-y-8">
        <section className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-display">Job Description</h2>
          <p className="text-[#a3a3a3] leading-relaxed">{job.description}</p>
        </section>

        <section className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-display">Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#a3a3a3]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[#B794F4]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-display">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#B794F4]/15 text-[#B794F4]">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-display">Benefits</h2>
          <ul className="space-y-2">
            {job.benefits.map((item, i) => (
              <li key={i} className="flex gap-3 text-[#a3a3a3]">
                <span className="text-emerald-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="card-3d bg-[#161616] rounded-2xl border border-[#2a2a2a] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-4 font-display">About the Company</h2>
          <p className="text-[#a3a3a3] leading-relaxed">{job.companyInfo}</p>
        </section>

        <div
          className="rounded-2xl p-6 sm:p-8 text-center border border-[#B794F4]/25"
          style={{ background: "linear-gradient(135deg, rgba(183,148,244,0.1), rgba(159,122,234,0.05))" }}
        >
          <h3 className="text-lg font-semibold text-white font-display">Ready to apply?</h3>
          <p className="mt-1 text-[#a3a3a3]">Submit your application in just a few minutes.</p>
          <div className="mt-4">
            <ApplyButton jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
