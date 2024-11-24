import { ProjectDetails } from "../projectTypes";

export const dataEngineerProject: ProjectDetails = {
  images: [],
  overview: "As a Data Engineer, I focused on database management and optimization, working with large-scale data systems to ensure efficient data processing and reliable reporting capabilities. The role involved creating and maintaining database scripts, performing migrations, and collaborating closely with development teams to meet various data requirements.",
  features: [
    "Database migration scripts development",
    "SQL query optimization for large datasets",
    "Data quality monitoring and maintenance",
    "Performance tuning for high-volume databases"
  ],
  challenges: [
    {
      title: "Large Data Volume Management",
      description: "Successfully handled and optimized queries for tables containing over 50,000 records while maintaining performance"
    },
    {
      title: "Data Integrity",
      description: "Implemented regular audits and quality checks to ensure data accuracy and reliability across all systems"
    }
  ],
  improvements: [
    "Implement automated testing for database migrations",
    "Develop real-time monitoring dashboard for database performance",
    "Create comprehensive documentation for all database procedures"
  ],
  duration: "1 year"
};