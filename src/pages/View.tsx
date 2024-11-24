import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectDetails from "@/components/ProjectDetails";

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}

const View = () => {
  const location = useLocation();
  const project = location.state as ProjectData;
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

// Project-specific data mapping
const projectData = {
  "Mamak Food Calories Estimation Based on Image Classification": {
    images: [
      {
        url: "assets/projects/Mamak/lemak.png",
        alt: "Calorie Estimation Interface",
        caption: "Calorie estimation interface"
      },
      {
        url: "assets/projects/Mamak/augment.png",
        alt: "Food Image Preprocess",
        caption: "Image preprocess"
      },
      {
        url: "assets/projects/Mamak/annotate.png",
        alt: "Food Database",
        caption: "Food image annotation"
      },
      {
        url: "assets/projects/Mamak/architecture.png",
        alt: "Prototype Architecture",
        caption: "Prototype architecture"
      }
    ],
    overview: "Calculating and estimating calories manually is time-consuming and challenging. The traditional method involves weighing and measuring food, and then comparing the values to calorie charts, which is difficult and not suitable for everyone. It's even harder for those with active lifestyles, as their daily caloric intake varies with their activities. Beginners may also struggle with this method, finding it inefficient and lacking the necessary tools. However, modern generations can easily calculate calories using their smartphones.",
    features: [
      "Food recognition using YOLOv5",
      "Almost accurate calorie estimation based on food set",
      "Famous Mamak food database",
      "User-friendly dashboard"
    ],
    challenges: [
      {
        title: "Dataset Creation",
        description: "Building a comprehensive dataset of Malaysian breakfast foods with accurate calorie information"
      },
      {
        title: "Model Accuracy",
        description: "Improving recognition accuracy across different angels and presentation styles"
      }
    ],
    improvements: [
      "Expand food database to include more local dishes",
      "Implement to mobile application",
      "Add nutritional breakdown features"
    ]
  },
  "Mobile Time Attendance With Locations": {
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
    ]
  },
  "Hair Saloon Booking Mobile Application": {
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
    overview: "Managing salon appointments through inconsistent and outdated methods causes frustration for both customers and salon owners. Our project aims to develop a mobile application using Flutter that provides a seamless and efficient salon booking experience with real-time availability, and personalized customer profiles. By leveraging the advantages of a mobile application such as push notifications, offline access, and enhanced user engagement, our solution offers greater convenience and reliability compared to traditional websites. ",
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
    ]
  }
};
if (!project) {
  return (
    <div className="min-h-screen section-padding">
      <p className="text-muted-foreground">Project not found.</p>
    </div>
  );
}

const currentProjectData = projectData[project.title as keyof typeof projectData];

if (!currentProjectData) {
  return (
    <div className="min-h-screen section-padding">
      <p className="text-muted-foreground">Project details not found.</p>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
    <section className="section-padding">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProjectHeader
          title={project.title}
          description={project.description}
          tech={project.tech}
        />

        <ProjectShowcase
          images={currentProjectData.images}
          onImageClick={setSelectedImage}
        />

        <ProjectDetails
          overview={currentProjectData.overview}
          features={currentProjectData.features}
          challenges={currentProjectData.challenges}
          improvements={currentProjectData.improvements}
        />
      </div>
    </section>

    <ImageModal
      isOpen={!!selectedImage}
      onClose={() => setSelectedImage(null)}
      imageUrl={selectedImage?.url || ''}
      caption={selectedImage?.caption || ''}
    />
  </div>
);
};

export default View;