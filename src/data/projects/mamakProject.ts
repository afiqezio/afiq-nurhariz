import { ProjectDetails } from "../projectTypes";

export const mamakProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/Mamak/poster.png",
      alt: "Project Poster",
      caption: "Overview project poster"
    },
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
  overview: "Calculating and estimating calories manually is time-consuming and challenging. The traditional method involves weighing and measuring food, and then comparing the values to calorie charts, which is difficult and not suitable for everyone. It's even harder for those with active lifestyles, as their daily caloric intake varies with their activities. Beginners may also struggle with this method, finding it inefficient and lacking the necessary tools. However, modern generations can easily calculate calories using just an image.",
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
  ],
  documentUrl: "https://drive.google.com/uc?export=download&id=104hjdPEQC6MvjGkwr1nKRfrXIzSdOxeE",
  duration: "3 months"
};