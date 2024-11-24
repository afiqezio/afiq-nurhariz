import { ProjectDetails } from "../projectTypes";

export const churnProject: ProjectDetails = {
  images: [
    {
      url: "assets/projects/Churn/pandas.png",
      alt: "Pandas Library",
      caption: "Using Pandas library"
    },
    {
      url: "assets/projects/Churn/heatmap.png",
      alt: "Heatmap",
      caption: "Heatmap to analyze patterns and trends"
    },
    {
      url: "assets/projects/Churn/compare.png",
      alt: "Model Comparison",
      caption: "Compare model accuracy"
    }
  ],
  overview: "Analyzes the factors contributing to customer churn in the banking sector. Key insights were derived by exploring correlations between customer transactions, relationships with the bank, and credit utilization. A predictive model, XGBoost, was developed due to its high accuracy in identifying at-risk customers. The findings aim to assist banks in improving customer retention strategies.",
  features: [
    "Analyzed customer behavior and transaction patterns to identify trends",
    "Used correlation analysis to uncover factors influencing customer engagement",
    "Identified key predictors of customer churn using machine learning models"
  ],
  challenges: [
    {
      title: "Data inconsistencies and missing values",
      description: "Preprocessed data by replacing missing values and normalizing features for uniform analysis"
    },
    {
      title: "Identifying significant churn drivers.",
      description: "Conducted detailed correlation analysis and feature selection to pinpoint key drivers"
    }
  ],
  improvements: [
    "Explore advanced machine learning models for improved predictions",
    "Implement real-time dashboards to monitor churn trends"
  ],
  documentUrl: "https://drive.google.com/uc?export=download&id=1tNrWm2t8m2NQWEgZDsBbrbZ2OFScr7mR",
  duration: "1 months"
};