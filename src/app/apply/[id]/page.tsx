"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/data/jobs";
import { Job } from "@/types/job";
import { markJobAsApplied, isJobApplied } from "@/lib/applied";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  experience?: string;
  resume?: string;
}

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    experience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const j = getJobById(id);
    setJob(j || null);
    setAlreadyApplied(isJobApplied(id));
    // Form auto-save restore
    try {
      const draft = localStorage.getItem(`form_draft_${id}`);
      if (draft) {
        const parsed = JSON.parse(draft);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
    setLoading(false);
  }, [id]);

  // Form auto-save
  useEffect(() => {
    if (!id || loading) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(`form_draft_${id}`, JSON.stringify(form));
      } catch {}
    }, 500);
    return () => clearTimeout(t);
  }, [form, id, loading]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s+/g, ""))) e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.experience.trim()) e.experience = "Experience is required";
    if (!resume) e.resume = "Please upload your resume";
    else {
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(resume.type)) e.resume = "Only PDF or Word documents allowed";
      else if (resume.size > 5 * 1024 * 1024) e.resume = "File size must be less than 5 MB";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    markJobAsApplied(id);
    try { localStorage.removeItem(`form_draft_${id}`); } catch {}
    setSubmitting(false);
    router.push("/thank-you");
  };

  const inputClass = (hasError?: string) =>
    `w-full px-3.5 py-2.5 rounded-xl border bg-[#0a0a0a] text-white placeholder:text-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#B794F4] ${
      hasError ? "border-red-500" : "border-[#2a2a2a]"
    }`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: "#2a2a2a", borderTopColor: "#B794F4" }} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Job not found</h1>
        <Link href="/jobs" className="mt-4 inline-block text-[#B794F4] hover:underline">Back to jobs</Link>
      </div>
    );
  }

  if (alreadyApplied) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-scale-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Already Applied</h1>
        <p className="mt-3 text-[#a3a3a3]">You have already applied for <strong className="text-white">{job.title}</strong>.</p>
        <Link href="/jobs" className="mt-6 inline-flex px-6 py-3 rounded-xl text-white font-medium btn-press" style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)" }}>
          Browse more jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link href={`/jobs/${job.id}`} className="inline-flex items-center gap-1.5 text-sm text-[#a3a3a3] hover:text-[#B794F4] mb-6 transition-colors">
        ← Back to job details
      </Link>

      <div className="bg-[#161616] rounded-2xl border border-[#2a2a2a] overflow-hidden card-3d animate-fade-up">
        <div className="px-6 py-5 border-b border-[#2a2a2a]" style={{ background: "linear-gradient(135deg, rgba(195,7,63,0.15), rgba(149,7,64,0.05))" }}>
          <h1 className="text-xl font-bold text-white">Apply for {job.title}</h1>
          <p className="text-sm text-[#a3a3a3] mt-0.5">{job.company} · {job.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">First Name <span className="text-[#B794F4]">*</span></label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={inputClass(errors.firstName)} placeholder="John" />
              {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Last Name <span className="text-[#B794F4]">*</span></label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={inputClass(errors.lastName)} placeholder="Doe" />
              {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Email <span className="text-[#B794F4]">*</span></label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass(errors.email)} placeholder="john@example.com" />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Mobile <span className="text-[#B794F4]">*</span></label>
              <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} className={inputClass(errors.mobile)} placeholder="9876543210" />
              {errors.mobile && <p className="mt-1 text-xs text-red-400">{errors.mobile}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Experience <span className="text-[#B794F4]">*</span></label>
            <select name="experience" value={form.experience} onChange={handleChange} className={inputClass(errors.experience)}>
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="2-4 Years">2-4 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5-8 Years">5-8 Years</option>
              <option value="8+ Years">8+ Years</option>
            </select>
            {errors.experience && <p className="mt-1 text-xs text-red-400">{errors.experience}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Current Company</label>
            <input type="text" name="currentCompany" value={form.currentCompany} onChange={handleChange} className={inputClass()} placeholder="Optional" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Current CTC (LPA)</label>
              <input type="text" name="currentCTC" value={form.currentCTC} onChange={handleChange} className={inputClass()} placeholder="e.g. 8" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Expected CTC (LPA)</label>
              <input type="text" name="expectedCTC" value={form.expectedCTC} onChange={handleChange} className={inputClass()} placeholder="e.g. 12" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Notice Period</label>
            <select name="noticePeriod" value={form.noticePeriod} onChange={handleChange} className={inputClass()}>
              <option value="">Select</option>
              <option value="Immediate">Immediate</option>
              <option value="15 days">15 days</option>
              <option value="30 days">30 days</option>
              <option value="60 days">60 days</option>
              <option value="90 days">90 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Resume <span className="text-[#B794F4]">*</span></label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center ${errors.resume ? "border-red-500 bg-red-500/5" : "border-[#2a2a2a] hover:border-[#B794F4]"}`}>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" id="resume-upload" />
              <label htmlFor="resume-upload" className="cursor-pointer">
                {resume ? (
                  <p className="text-sm font-medium" style={{ color: "#B794F4" }}>{resume.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-[#a3a3a3]"><span style={{ color: "#B794F4" }} className="font-medium">Click to upload</span> or drag & drop</p>
                    <p className="text-xs text-[#2a2a2a] mt-1">PDF or Word (max 5 MB)</p>
                  </>
                )}
              </label>
            </div>
            {errors.resume && <p className="mt-1 text-xs text-red-400">{errors.resume}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#a3a3a3] mb-1.5">Cover Letter</label>
            <textarea name="coverLetter" value={form.coverLetter} onChange={handleChange} rows={4} className={inputClass() + " resize-y"} placeholder="Why are you a great fit?" />
          </div>

          <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl text-white font-semibold btn-press disabled:opacity-60 flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #B794F4, #9F7AEA)", boxShadow: "0 4px 20px rgba(195,7,63,0.35)" }}>
            {submitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>) : "Submit Application 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
