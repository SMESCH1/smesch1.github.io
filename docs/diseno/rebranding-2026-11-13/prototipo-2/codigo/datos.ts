// Contenido del sitio publicado (rama main), en inglés. Las regiones del mapa son un guiño, no anatomía exacta:
// el cerebro está dibujado de perfil, mirando a la izquierda (frente a la izquierda, tronco abajo a la derecha).

export interface Cifra { valor: number; decimales: number; rotulo: string; miles?: boolean }
export interface Region { nodo: string; nombre: string }
export interface Proyecto {
  id: string;
  temas: string;
  titulo: string;
  nota?: string;
  desc: string;
  cifra?: Cifra;
  tech: string[];
  codigo: string;
  demo?: string;
  region?: Region;
}

export const PROYECTOS: Proyecto[] = [
  {
    id: 'asd', temas: 'Neuroscience · Deep learning · fMRI', titulo: 'ASD detection via fMRI', nota: 'thesis',
    desc: 'Binary ASD/control classification on rs-fMRI functional connectivity from ABIDE (1102 subjects, AAL2 atlas, 94 ROIs), exploring MLP and GNN architectures.',
    cifra: { valor: 0.79, decimales: 2, rotulo: 'benchmark AUC' },
    tech: ['scikit-learn', 'PyTorch / GNN', 'MLflow', 'fMRI / ABIDE'], codigo: 'https://github.com/SMESCH1/ASD-detection',
    region: { nodo: 'H_CC', nombre: 'Whole-brain connectivity' },
  },
  {
    id: 'onto', temas: 'NLP · Cognitive science · Research', titulo: 'Ontogenia Artificial',
    desc: 'Longitudinal study of syntactic emergence in Pythia and its alignment with human language acquisition, looking for U-shaped learning curves.',
    tech: ['Pythia', 'Transformers', 'Python'], codigo: 'https://github.com/SMESCH1/ontogenia-artificial',
    region: { nodo: 'H_LL', nombre: "Broca's area · syntax" },
  },
  {
    id: 'dann', temas: 'Deep learning · Medical imaging · CV', titulo: 'ABIDE DANN: computer vision',
    desc: 'ASD vs. control from rs-fMRI treated as a computer-vision problem. CNNs with adversarial domain generalization align features across acquisition sites.',
    tech: ['PyTorch', 'CNN', 'DANN', 'fMRI'], codigo: 'https://github.com/SMESCH1/abide-dann-cv',
    region: { nodo: 'R2', nombre: 'Occipital lobe · vision' },
  },
  {
    id: 'stock', temas: 'DL · Finance · NLP', titulo: 'Stock price prediction', nota: 'MSc',
    desc: 'LSTM, GRU and Transformer models for Argentine asset prices, combining financial time series with Reddit and news sentiment from BETO.',
    tech: ['PyTorch', 'BETO / NLP', 'yfinance', 'Reddit API'], codigo: 'https://github.com/SMESCH1/stock_price_prediction_MIA',
    region: { nodo: 'H_UL', nombre: 'Prefrontal cortex · decisions' },
  },
  {
    id: 'medallion', temas: 'Data engineering · dbt · Airflow', titulo: 'Medallion pipeline: Airflow + dbt',
    desc: 'End-to-end Bronze → Silver → Gold pipeline. dbt over DuckDB for modeling, Airflow for orchestration.',
    cifra: { valor: 29, decimales: 0, rotulo: 'automated data quality tests' },
    tech: ['Airflow', 'dbt', 'DuckDB', 'pandas'], codigo: 'https://github.com/SMESCH1/medallion-pipeline-airflow-dbt',
    region: { nodo: 'B3', nombre: 'Temporal lobe · memory' },
  },
  {
    id: 'brainhack', temas: 'ML · Mental health · Neuroscience', titulo: 'Autism classification: BrainHack',
    desc: 'KMeans clustering and logistic regression on neuroimaging-derived features for ASD spectrum classification, built at an international BrainHack.',
    tech: ['scikit-learn', 'pandas', 'neuroimaging'], codigo: 'https://github.com/SMESCH1/autism-classification-brainHack',
    region: { nodo: 'H_UR', nombre: 'Default mode network · parietal hub' },
  },
  {
    id: 'informessi', temas: 'LLM · RAG · Automation', titulo: 'InforMessi',
    desc: 'LLM editorial pipeline that writes and publishes daily Telegram posts about the Argentine national team, with an anti-repetition RAG.',
    tech: ['Ollama / Groq', 'RAG', 'Telegram API', 'GitHub Actions'], codigo: 'https://github.com/SMESCH1/InforMessi',
    region: { nodo: 'H_LR', nombre: "Wernicke's area · reading the news" },
  },
  {
    id: 'socratia', temas: 'Full-stack · Next.js · Supabase', titulo: 'SocratIA',
    desc: 'Gamified philosophy learning app in the style of Duolingo: themed islands, missions with interactive theory and quizzes, XP and streaks.',
    tech: ['Next.js 16', 'Supabase', 'Tailwind v4'], codigo: 'https://github.com/SMESCH1/SOCRATIA',
    region: { nodo: 'T1', nombre: 'Frontal pole · abstract thought' },
  },
  {
    id: 'payments', temas: 'Backend · API · CI/CD', titulo: 'FastAPI payments API',
    desc: 'REST payments API with an explicit state machine, unit and integration tests, GitHub Actions CI and auto-deploy to Render.',
    tech: ['FastAPI', 'unittest', 'GitHub Actions', 'Render'], codigo: 'https://github.com/SMESCH1/fastapi-payments-api',
    demo: 'https://testing-examen-soft-eng.onrender.com/docs',
    region: { nodo: 'B1', nombre: 'Cerebellum · error correction' },
  },
];

export const EN_EL_MAPA = PROYECTOS.filter((p) => p.region);
