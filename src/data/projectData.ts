import { mamakProject } from "./projects/mamakProject";
import { tamsProject } from "./projects/tamsProject";
import { saloonProject } from "./projects/saloonProject";
import { churnProject } from "./projects/churnProject";
import { dataEngineerProject } from "./projects/dataEngineerProject";
import { ProjectData } from "./projectTypes";

export type { ProjectData };

export const projectData = {
  "Mamak Food Calories Estimation Based on Image Classification": mamakProject,
  "Mobile Time Attendance With Locations": tamsProject,
  "Hair Saloon Booking Mobile Application": saloonProject,
  "Customer Churn Prediction and Analysis Project": churnProject,
  "Database Management and Optimization Projects": dataEngineerProject
};