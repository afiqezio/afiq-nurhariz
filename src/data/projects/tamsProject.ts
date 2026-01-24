import { ProjectDetails } from "../projectTypes";

export const tamsProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/TAMS/mainpage.png",
      alt: "Mobile App Interface",
      caption: "Time attendance details interface"
    },
    {
      url: "assets/projects/TAMS/checkin.png",
      alt: "Location Tracking",
      caption: "GPS location verification"
    },
    {
      url: "assets/projects/TAMS/log.png",
      alt: "Transaction Log",
      caption: "Check In/Check Out log history"
    },
    {
      url: "assets/projects/TAMS/map.png",
      alt: "User Current Location on Map",
      caption: "User current location"
    }
  ],
  overview: "This project addresses the challenge faced by employees who work remotely or off-site, unable to use the organization's face terminal reader for attendance. To solve this issue, we are developing a mobile application integrated with the Time Attendance Management System (TAMS). Employees can log in using their TAMS credentials and check in via the app, transmitting their location data to ensure accurate attendance tracking. By centralizing data collection and digitizing the process, the organization aims to reduce operational costs, enhance decision-making capabilities, and streamline administrative tasks securely accessible only to authorized administrators.",
  features: [
    "Real-time location tracking",
    "Check in/Check out verification",
    "Attendance details monitoring"
  ],
  challenges: [
    {
      title: "Location Accuracy",
      description: "Ensuring precise location tracking while minimizing battery consumption"
    },
    {
      title: "System Integration",
      description: "Seamless integration with existing TAMS infrastructure"
    }
  ],
  improvements: [
    "Add face recognition feature",
    "Implement team management features"
  ],
  duration: "6 months",
  caseStudy: {
    problem: "TAMS systems often lack mobility for off-site or remote employees, leading to inaccurate attendance data.",
    challenge: "Ensuring secure, spoof-proof location logging while maintaining app performance on low-end devices.",
    solution: "Built a Flutter application with real-time GPS verification and biometric authentication, synced to a .NET backend.",
    results: [
      "Eliminated 'buddy punching' for remote sites.",
      "Real-time visibility for HR on distributed workforce.",
      "Automated payroll integration through MSSQL triggers."
    ],
    techStack: ["Flutter", ".NET Core", "MSSQL"]
  }
};