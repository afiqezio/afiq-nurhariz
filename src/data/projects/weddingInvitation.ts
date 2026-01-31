import { ProjectDetails } from "../projectTypes";

export const weddingInvitationProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/Wedding/landing.png",
      alt: "Wedding Invitation Landing Page",
      caption: "Animated wedding invitation landing page"
    },
    {
      url: "assets/projects/Wedding/rsvp.png",
      alt: "RSVP Feature",
      caption: "Guest RSVP and attendance confirmation"
    },
    {
      url: "assets/projects/Wedding/location.png",
      alt: "Wedding Location",
      caption: "Wedding location"
    }
  ],

  overview:
    "Traditional wedding invitation cards are costly, static, and difficult to manage when tracking guest attendance. Many couples struggle to know who will attend, receive guest wishes, and manage gift coordination efficiently. This project introduces a modern, meaningful, and affordable digital wedding invitation platform that allows couples to share their story, manage RSVPs, receive wishes, and organize gift slots—all in one place.",

  features: [
    "Interactive wedding invitation website with smooth animations",
    "RSVP system to track attending and non-attending guests",
    "Wedding wishes and message board for guests",
    "Gift slot booking to avoid duplication",
    "Bride and groom information and wedding details section",
    "Admin-friendly dashboard powered by Firebase"
  ],

  challenges: [
    {
      title: "Real-Time Data Management",
      description:
        "Handling real-time RSVP updates, wishes, and gift slot bookings while ensuring data consistency."
    },
    {
      title: "User Experience & Performance",
      description:
        "Delivering smooth animations with Framer Motion while keeping the site lightweight and fast on mobile devices."
    }
  ],

  improvements: [
    "Add QR-based RSVP access for physical invitations",
    "Multi-language support for international guests",
    "Custom theme templates for different wedding styles",
    "Analytics dashboard for guest engagement insights"
  ],

  documentUrl:
    "https://e-wed.vercel.app/#",

  duration: "1 week",

  caseStudy: {
    problem:
      "Couples often lack an efficient way to manage guest attendance, wishes, and gift coordination using traditional invitation cards.",
    challenge:
      "Building a scalable yet cost-effective solution that is easy for non-technical users while supporting real-time updates.",
    solution:
      "Developed a responsive React-based wedding invitation platform with Firebase as the backend, hosted on Vercel with CI/CD for fast and reliable deployments.",
    results: [
      "Reduced wedding invitation costs significantly compared to printed cards",
      "Enabled couples to track RSVP status in real time",
      "Improved guest engagement through interactive wishes and animations",
      "Successfully monetized as a side project offering affordable digital invitations"
    ],
    techStack: [
      "React",
      "Framer Motion",
      "Firebase",
      "Vercel",
      "CI/CD"
    ]
  }
};
