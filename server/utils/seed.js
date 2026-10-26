import { User } from "../models/userModel.js";
import { Job } from "../models/jobModel.js";

const DEMO_JOBS = [
  {
    title: "MERN Stack Developer",
    description:
      "Build and maintain full stack web applications with MongoDB, Express, React and Node.js in an agile product team.",
    category: "MERN Stack Development",
    country: "USA",
    city: "New York",
    location: "5th Avenue 120, New York, USA",
    fixedSalary: 85000,
  },
  {
    title: "Frontend Developer",
    description:
      "Develop responsive user interfaces with React and modern CSS, collaborate with designers to deliver pixel-perfect pages.",
    category: "Frontend Web Development",
    country: "UK",
    city: "London",
    location: "221B Baker Street, London, UK",
    salaryFrom: 45000,
    salaryTo: 65000,
  },
  {
    title: "Mobile App Developer",
    description:
      "Design and ship cross-platform mobile applications, own features end to end from API integration to store release.",
    category: "Mobile App Development",
    country: "Canada",
    city: "Toronto",
    location: "88 Queen Street West, Toronto, Canada",
    salaryFrom: 60000,
    salaryTo: 90000,
  },
  {
    title: "UI/UX Designer",
    description:
      "Create delightful graphics, illustrations and product design systems for web and mobile experiences used by millions.",
    category: "Graphics & Design",
    country: "Germany",
    city: "Berlin",
    location: "12 Friedrichstrasse, Berlin, Germany",
    fixedSalary: 55000,
  },
  {
    title: "AI Engineer",
    description:
      "Prototype and productionize machine learning models, build data pipelines and integrate AI features into core products.",
    category: "Artificial Intelligence",
    country: "Singapore",
    city: "Singapore",
    location: "10 Marina Boulevard, Singapore",
    salaryFrom: 90000,
    salaryTo: 140000,
  },
  {
    title: "Finance Analyst",
    description:
      "Own budgeting, forecasting and financial reporting for business units, and partner with leadership on strategic decisions.",
    category: "Account & Finance",
    country: "Australia",
    city: "Sydney",
    location: "48 Pirrama Road, Sydney, Australia",
    fixedSalary: 70000,
  },
];

export const autoSeed = async () => {
  try {
    if ((await User.countDocuments()) > 0) return;
    const employer = await User.create({
      name: "Demo Employer",
      email: "employer@jobzee.com",
      phone: 1234567890,
      password: "Password123",
      role: "Employer",
    });
    await User.create({
      name: "Demo Seeker",
      email: "seeker@jobzee.com",
      phone: 1987654321,
      password: "Password123",
      role: "Job Seeker",
    });
    await Job.insertMany(DEMO_JOBS.map((job) => ({ ...job, postedBy: employer._id })));
    console.log(
      "Database seeded. Demo accounts -> employer@jobzee.com / seeker@jobzee.com (password: Password123)"
    );
  } catch (error) {
    console.log(`Auto seed skipped: ${error.message}`);
  }
};
