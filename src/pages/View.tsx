import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageModal from "@/components/ImageModal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}

const View = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state as ProjectData;
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

// Project-specific data mapping
const projectData = {
  "Mamak Breakfast Food Calories Estimation Based on Image Classification": {
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
    overview: "An innovative AI-powered system that uses computer vision and deep learning to estimate calories in Malaysian breakfast dishes through image recognition.",
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
      }
    ],
    overview: "A comprehensive mobile application for tracking employee attendance with location verification, integrated with existing TAMS systems.",
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
      }
    ],
    overview: "A user-friendly mobile application for booking hair salon appointments, managing services, and handling customer relationships.",
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
      <Button
        variant="outline"
        className="glass mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <p className="text-muted-foreground">Project not found.</p>
    </div>
  );
}

const currentProjectData = projectData[project.title as keyof typeof projectData];

if (!currentProjectData) {
  return (
    <div className="min-h-screen section-padding">
      <Button
        variant="outline"
        className="glass mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <p className="text-muted-foreground">Project details not found.</p>
    </div>
  );
}

return (
  <div className="min-h-screen">
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="glass mb-8 animate-fadeIn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="glass p-8 animate-slideUp">
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {project.description}
          </p>

          {/* Project Showcase Images */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Project Showcase</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {currentProjectData.images.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
                    <div 
                      className="glass p-2 rounded-lg animate-slideUp cursor-pointer hover:scale-105 transition-transform"
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => setSelectedImage(image)}
                    >
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </AspectRatio>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        {image.caption}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-full glass"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              {/* Overview Section */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground mb-4">
                  {currentProjectData.overview}
                </p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="glass">
                    <Github className="mr-2 h-4 w-4" /> View Source
                  </Button>
                  <Button variant="outline" className="glass">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </div>
              </Card>

              {/* Key Features */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {currentProjectData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Card>

              {/* Challenges and Solutions */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                <div className="space-y-4">
                  {currentProjectData.challenges.map((challenge, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium mb-2">{challenge.title}</h3>
                      <p className="text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Future Improvements */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Future Improvements</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {currentProjectData.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Card>
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