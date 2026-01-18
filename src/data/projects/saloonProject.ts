import { ProjectDetails } from "../projectTypes";

export const saloonProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/Saloon/main menu.png",
      alt: "Main Menu Interface",
      caption: "Main booking screen"
    },
    {
      url: "assets/projects/Saloon/book.png",
      alt: "Log Booking",
      caption: "Booking log history"
    },
    {
      url: "assets/projects/Saloon/calendar.png",
      alt: "Date Selection",
      caption: "Available date selection"
    },
    {
      url: "assets/projects/Saloon/time.png",
      alt: "Time Selection",
      caption: "Available time selection"
    },
    {
      url: "assets/projects/Saloon/qr.png",
      alt: "Booking Details",
      caption: "Detail of the booking with QR"
    },
    {
      url: "assets/projects/Saloon/adminqr.png",
      alt: "Admin QR Scanner",
      caption: "Admin QR scanner"
    },
    {
      url: "assets/projects/Saloon/adminconfirm.png",
      alt: "Admin Confirmation",
      caption: "Admin confirmation"
    }
  ],
  overview: "Managing salon appointments through inconsistent and outdated methods causes frustration for both customers and salon owners. Our project aims to develop a mobile application using Flutter that provides a seamless and efficient salon booking experience with real-time availability, and personalized customer profiles. By leveraging the advantages of a mobile application such as push notifications, offline access, and enhanced user engagement, our solution offers greater convenience and reliability compared to traditional websites.",
  features: [
    "Real-time appointment booking",
    "Service catalog management",
    "Customer profile system"
  ],
  challenges: [
    {
      title: "Scheduling Logic",
      description: "Implementing complex booking logic with overlapping time slots"
    },
    {
      title: "User Experience",
      description: "Creating an intuitive booking flow for various service combinations"
    }
  ],
  improvements: [
    "Payment integration",
    "Implement push notifications",
    "Add review and rating system"
  ],
  duration: "2 months",
  caseStudy: {
    problem: "Small salons struggle with appointment overlaps and manual booking via phone calls.",
    challenge: "Creating a simple, low-cost solution that doesn't require complex training for salon staff.",
    solution: "Mobile-first approach with a PHP/MySQL backend for lightweight data management and calendar syncing.",
    results: [
      "Reduced double-bookings by 100%.",
      "Improved customer retention through automated reminders.",
      "Easy-to-use stylist management dashboard."
    ],
    techStack: ["Flutter", "PHP", "MySQL"]
  }
};