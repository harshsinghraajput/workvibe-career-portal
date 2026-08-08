export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  type: "Full Time" | "Part Time" | "Contract" | "Internship";
  workMode: "Remote" | "Hybrid" | "Office";
  salary: string;
  postedDate: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  companyInfo: string;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  experience: string;
  currentCompany: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  resume: File | null;
  coverLetter: string;
}
