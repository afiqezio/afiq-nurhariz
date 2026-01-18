import { ProjectDetails } from "../projectTypes";

export const dataEngineerProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/SQL/migrate.png",
      alt: "Migration",
      caption: "Create migration and backup SQL"
    },
    {
      url: "assets/projects/SQL/clickup.png",
      alt: "Debug SQL and Clickup Usage",
      caption: "Debugging existing SQL query"
    },
    {
      url: "assets/projects/SQL/deploy.png",
      alt: "Deployment Process",
      caption: "Passing deployment queries"
    }
  ],
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
    "Create comprehensive documentation for all database procedures"
  ],
  duration: "6 months",
  caseStudy: {
    problem: "Legacy database queries were causing significant application lag during peak hours.",
    challenge: "Optimizing live production databases without downtime.",
    solution: "Refined indexing strategies, rewrote subqueries as joins, and implemented query caching layers.",
    results: [
      "Reduced slow query count by 70%.",
      "Improved large dataset database response time by 200ms on average.",
      "Streamlined migration scripts for future scalability."
    ],
    techStack: ["MySQL", "PostgreSQL", "Slow Query Log"]
  }
};