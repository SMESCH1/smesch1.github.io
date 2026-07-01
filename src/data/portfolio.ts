import { Brain, Code2, LineChart, Network, Stethoscope } from 'lucide-react';

export const PORTFOLIO_DATA = {
  hero: {
    name: "Sebastián Mesch Henriques",
    roles: ["AI Engineer Jr.", "Data Scientist", "Neuroscientist"],
    description: "Licensed Psychologist and Data Scientist bridging cognitive neuroscience and deep learning. Academic Coordinator at Humai, researcher at Universidad Favaloro, and MSc in AI student at UdeSA.",
    socials: {
      github: "https://github.com/SMESCH1",
      linkedin: "https://www.linkedin.com/in/sebasti%C3%A1n-mesch-henriques/",
      email: "lic.mesch@gmail.com"
    },
    location: "Buenos Aires, Argentina (Open to remote)"
  },
  about: {
    paragraphs: [
      "I hold a degree in Psychology with a specialization in Neurosciences and am currently writing my thesis for the Master's in AI at UdeSA.",
      "I currently work as an AI and Neuroscience Mentor at Humai, leading educational strategy and advanced AI training. I also work freelance as a Data Scientist at the Vocational and Occupational Guidance department of Universidad Favaloro.",
      "My main interest is the intersection of AI and mental health, using machine learning to interpret brain signals, clinical data, and behavioral patterns. I have scientific research experience in Neuroscience and Behavioral Sciences, and I teach AI for clinical and research settings.",
      "I have practical experience in development and Applied Machine Learning (PyTorch, LLMs, RAG), Data Engineering (pipelines, dbt, Airflow), and product (Next.js, FastAPI)."
    ]
  },
  experience: [
    {
      title: "AI and Neuroscience Mentor",
      organization: "Humai",
      date: "2026 — Present"
    },
    {
      title: "Freelance Data Scientist",
      organization: "Universidad Favaloro",
      date: "2026 — Present"
    },
    {
      title: "Academic Director",
      organization: "Humai",
      date: "2023 — 2026"
    },
    {
      title: "Quality Control Manager",
      organization: "Further Languages",
      date: "2020 — 2022"
    },
    {
      title: "Associate Researcher",
      organization: "Universidad Favaloro",
      date: "2019 — 2023"
    }
  ],
  education: [
    {
      title: "Master's in Artificial Intelligence",
      organization: "Universidad de San Andrés (UdeSA)",
      date: "2025 — Present"
    },
    {
      title: "Bachelor's in Psychology (Neurosciences)",
      organization: "Universidad Favaloro",
      date: "2018 — 2024"
    }
  ],
  projects: [
    {
      title: "ASD Biomarker Detection via Machine Learning",
      tags: ["Neuroscience", "Deep Learning", "fMRI"],
      description: "Binary ASD/Control classification on rs-fMRI functional connectivity from the ABIDE dataset. Benchmarked at AUC 0.79, exploring MLP and GNN architectures.",
      tech: ["scikit-learn", "PyTorch / GNN", "MLflow", "fMRI / ABIDE"],
      link: "https://github.com/SMESCH1/ASD-detection",
      icon: Brain
    },
    {
      title: "Ontogenia Artificial",
      tags: ["NLP", "Cognitive Science", "Research"],
      description: "Longitudinal study of syntactic emergence in Pythia and its alignment with human language acquisition. NLP research project investigating U-shaped learning curves.",
      tech: ["Pythia", "Transformers", "Python", "Data Science"],
      link: "https://github.com/SMESCH1/ontogenia-artificial",
      icon: Network
    },
    {
      title: "ABIDE DANN: Computer Vision",
      tags: ["Deep Learning", "Medical Imaging", "CV"],
      description: "ASD vs control classification from rs-fMRI treated as a computer-vision problem. Uses CNNs with adversarial domain generalization (DANN) to align features across acquisition sites.",
      tech: ["PyTorch", "CNN", "DANN", "fMRI"],
      link: "https://github.com/SMESCH1/abide-dann-cv",
      icon: LineChart
    },
    {
      title: "Autism Classification: BrainHack",
      tags: ["ML", "Mental Health", "Neuroscience"],
      description: "KMeans clustering + Logistic Regression on neuroimaging-derived features for ASD spectrum classification. Developed during an international BrainHack workshop.",
      tech: ["scikit-learn", "pandas", "neuroimaging"],
      link: "https://github.com/SMESCH1/autism-classification-brainHack",
      icon: Stethoscope
    },
    {
      title: "Data Engineering Pipeline",
      tags: ["Data Engineering", "dbt", "Airflow"],
      description: "End-to-end Bronze→Silver→Gold pipeline with 29 automated data quality tests. dbt over DuckDB for modeling, Airflow for orchestration.",
      tech: ["Airflow", "dbt", "DuckDB", "Python"],
      link: "https://github.com/SMESCH1/medallion-pipeline-airflow-dbt",
      icon: Code2
    }
  ]
};
