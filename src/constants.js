export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export const EMPTY_JOB = {
  company: "",
  role: "",
  dateApplied: new Date().toISOString().slice(0, 10),
  status: "Applied",
  notes: "",
  link: "",
};
export const ROLES = [
  "React Developer",
  "Web Developer",
  "Full Stack Developer",
  "Front End Developer",
  "Back End Developer",
  "Software Engineer",
  "JavaScript Developer",
  "Node.js Developer",
  "UI Developer",
  "Python Developer",
  "Java Developer",
];