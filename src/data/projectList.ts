export const projectList = [
  {
    id: "mamak",
    num: "01",
    title: "Mamak Food Calories Estimation Based on Image Classification",
    desc: "One photo can simplify the time-consuming task of manually calculating food calories.",
    tech: ["Python", "YoloV5", "CNN"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format",
  },
  {
    id: "tams",
    num: "02",
    title: "Mobile Time Attendance With Locations",
    desc: "Mobile app integrated with TAMS for remote employee attendance tracking.",
    tech: ["Flutter", ".NET", "MSSQL"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format",
  },
  {
    id: "saloon",
    num: "03",
    title: "Hair Saloon Booking Mobile Application",
    desc: "A clean mobile booking flow for a hair saloon with admin management.",
    tech: ["Flutter", "PHP", "MySQL"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format",
  },
  {
    id: "churn",
    num: "04",
    title: "Customer Churn Prediction and Analysis Project",
    desc: "Predicting customer attrition with logistic regression, decision trees, and XGBoost.",
    tech: ["Python", "Pandas", "XGBoost"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format",
  },
  {
    id: "db",
    num: "05",
    title: "Database Management and Optimization Projects",
    desc: "Development and tuning of SQL scripts and migrations for large-scale data systems.",
    tech: ["MySQL", "SQL", "Tuning"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format",
  },
  {
    id: "wedding",
    num: "06",
    title: "Wedding Invitation Platform",
    desc: "A platform for crafting and managing animated digital wedding invitations.",
    tech: ["React", "Tailwind", "Firebase"],
    image: "https://images.pexels.com/photos/18535623/pexels-photo-18535623.jpeg?auto=compress&w=1200",
  },
  {
    id: "hermes",
    num: "07",
    title: "Hermes Agent: Telegram-Driven AI Software Factory",
    desc: "Message a bot, approve the plan, and an AI agent builds, checks and deploys the app.",
    tech: ["Hermes Agent", "Claude Code", "Docker"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format",
  },
];

export type ProjectListItem = typeof projectList[number];

// Case-study URL. `id` is the slug, so renaming one breaks existing links.
// The trailing slash matches how GitHub Pages serves work/<id>/index.html.
export const workPath = (id: string) => `/work/${id}/`;
