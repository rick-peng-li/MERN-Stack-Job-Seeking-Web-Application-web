export const ROLES = ["Employer", "Job Seeker"];

export const CATEGORIES = [
  "Graphics & Design",
  "Mobile App Development",
  "Frontend Web Development",
  "MERN Stack Development",
  "Account & Finance",
  "Artificial Intelligence",
  "Video Animation",
  "Game Development",
];

export const HERO_STATS = [
  { id: 1, title: "1,23,441", subTitle: "Live Job" },
  { id: 2, title: "91,220", subTitle: "Companies" },
  { id: 3, title: "2,34,200", subTitle: "Job Seekers" },
  { id: 4, title: "1,03,761", subTitle: "Employers" },
];

export const POPULAR_CATEGORIES = [
  { id: 1, title: "Graphics & Design", subTitle: "305 Open Positions" },
  { id: 2, title: "Mobile App Development", subTitle: "500 Open Positions" },
  { id: 3, title: "Frontend Web Development", subTitle: "200 Open Positions" },
  { id: 4, title: "MERN Stack Development", subTitle: "1000+ Open Positions" },
  { id: 5, title: "Account & Finance", subTitle: "150 Open Positions" },
  { id: 6, title: "Artificial Intelligence", subTitle: "867 Open Positions" },
  { id: 7, title: "Video Animation", subTitle: "50 Open Positions" },
  { id: 8, title: "Game Development", subTitle: "80 Open Positions" },
];

export const POPULAR_COMPANIES = [
  { id: 1, title: "Microsoft", location: "Street 10 Karachi, Pakistan", openPositions: 10 },
  { id: 2, title: "Tesla", location: "Street 10 Karachi, Pakistan", openPositions: 5 },
  { id: 3, title: "Apple", location: "Street 10 Karachi, Pakistan", openPositions: 20 },
];

export const HOW_IT_WORKS = [
  { id: 1, title: "Create Account", description: "Sign up as an employer or job seeker." },
  { id: 2, title: "Post / Find Jobs", description: "Employers post jobs, seekers browse listings." },
  { id: 3, title: "Apply / Review", description: "Seekers submit resumes, employers review them." },
  { id: 4, title: "Get Hired", description: "Connect and land the perfect match." },
];

export const formatSalary = (job) => {
  if (job?.fixedSalary) return `$${Number(job.fixedSalary).toLocaleString()}`;
  if (job?.salaryFrom && job?.salaryTo) {
    return `$${Number(job.salaryFrom).toLocaleString()} - $${Number(job.salaryTo).toLocaleString()}`;
  }
  return "Negotiable";
};
