// Los proyectos del portfolio. Fuente: el sitio publicado (rama main) y los README de cada repo.
// Cada uno tiene su nodo en el cerebro de la portada; las regiones son un guiño, no anatomía exacta.
import type { Idioma } from '../lib/preferencias';

interface TextosProyecto { temas: string; titulo: string; desc: string; region: string; cifra?: string }
export interface Proyecto {
  id: string;
  nodo: string;
  tech: string[];
  codigo: string;
  demo?: string;
  /** Una cifra con fuente. 0.79: benchmark histórico de la tesis 2023 (README de ASD-detection).
   *  29: tests de calidad de datos (README de medallion-pipeline-airflow-dbt). */
  cifra?: { valor: number; decimales: number };
  textos: Record<Idioma, TextosProyecto>;
}

export const PROYECTOS: Proyecto[] = [
  {
    id: 'asd', nodo: 'H_CC', codigo: 'https://github.com/SMESCH1/ASD-detection',
    tech: ['scikit-learn', 'PyTorch / GNN', 'MLflow', 'fMRI / ABIDE'],
    cifra: { valor: 0.79, decimales: 2 },
    textos: {
      en: { temas: 'Neuroscience · Deep learning · fMRI', titulo: 'ASD Biomarker Detection via Machine Learning',
        desc: 'Binary ASD/control classification on rs-fMRI functional connectivity from ABIDE I (1,102 subjects, AAL2 atlas), comparing logistic regression, MLP and GNN.',
        region: 'Whole-brain connectivity', cifra: 'AUC to beat · 2023 thesis' },
      es: { temas: 'Neurociencias · Deep learning · fMRI', titulo: 'Detección de biomarcadores de TEA con machine learning',
        desc: 'Clasificación binaria TEA/control sobre conectividad funcional rs-fMRI de ABIDE I (1102 sujetos, atlas AAL2), comparando regresión logística, MLP y GNN.',
        region: 'Conectividad de todo el cerebro', cifra: 'AUC a superar · tesis 2023' },
    },
  },
  {
    id: 'onto', nodo: 'H_LL', codigo: 'https://github.com/SMESCH1/ontogenia-artificial',
    tech: ['Pythia', 'Transformers', 'Python', 'Data science'],
    textos: {
      en: { temas: 'NLP · Cognitive science · Research', titulo: 'Ontogenia Artificial',
        desc: 'Longitudinal study of syntactic emergence in Pythia and its alignment with human language acquisition. NLP research project investigating U-shaped learning curves.',
        region: "Broca's area · syntax" },
      es: { temas: 'NLP · Ciencia cognitiva · Investigación', titulo: 'Ontogenia Artificial',
        desc: 'Estudio longitudinal de la emergencia sintáctica en Pythia y su alineación con la adquisición del lenguaje humano. Proyecto de investigación en NLP sobre curvas de aprendizaje en U.',
        region: 'Área de Broca · sintaxis' },
    },
  },
  {
    id: 'dann', nodo: 'R2', codigo: 'https://github.com/SMESCH1/abide-dann-cv',
    tech: ['PyTorch', 'CNN', 'DANN', 'fMRI'],
    textos: {
      en: { temas: 'Deep learning · Medical imaging · CV', titulo: 'ABIDE DANN: Computer Vision',
        desc: 'ASD vs. control classification from rs-fMRI treated as a computer-vision problem. CNNs with adversarial domain generalization (DANN) align features across acquisition sites. MSc in AI project.',
        region: 'Occipital lobe · vision' },
      es: { temas: 'Deep learning · Imágenes médicas · CV', titulo: 'ABIDE DANN: visión por computadora',
        desc: 'Clasificación TEA/control desde rs-fMRI planteada como un problema de visión por computadora. CNNs con generalización de dominio adversarial (DANN) alinean las features entre sitios de adquisición. Proyecto de la Maestría en IA.',
        region: 'Lóbulo occipital · visión' },
    },
  },
  {
    id: 'brainhack', nodo: 'H_UR', codigo: 'https://github.com/SMESCH1/autism-classification-brainHack',
    tech: ['scikit-learn', 'pandas', 'neuroimaging', 'matplotlib'],
    textos: {
      en: { temas: 'ML · Mental health · Neuroscience', titulo: 'Autism Classification: BrainHack',
        desc: 'KMeans clustering and supervised classification (logistic regression) on neuroimaging-derived features for ASD spectrum classification.',
        region: 'Default mode network · parietal hub' },
      es: { temas: 'ML · Salud mental · Neurociencias', titulo: 'Clasificación de autismo: BrainHack',
        desc: 'Clustering (KMeans) y clasificación supervisada (regresión logística) sobre features de neuroimagen para clasificar el espectro autista.',
        region: 'Red por defecto · nodo parietal' },
    },
  },
  {
    id: 'medallion', nodo: 'B3', codigo: 'https://github.com/SMESCH1/medallion-pipeline-airflow-dbt',
    tech: ['Airflow', 'dbt', 'DuckDB', 'pandas'],
    cifra: { valor: 29, decimales: 0 },
    textos: {
      en: { temas: 'Data engineering · dbt · Airflow', titulo: 'Medallion Pipeline: Airflow + dbt',
        desc: 'End-to-end Bronze → Silver → Gold pipeline. dbt over DuckDB for modeling, Airflow for orchestration.',
        region: 'Temporal lobe · memory', cifra: 'automated data quality tests' },
      es: { temas: 'Data engineering · dbt · Airflow', titulo: 'Pipeline medallion: Airflow + dbt',
        desc: 'Pipeline de punta a punta Bronze → Silver → Gold. dbt sobre DuckDB para el modelado, Airflow para la orquestación.',
        region: 'Lóbulo temporal · memoria', cifra: 'tests de calidad de datos' },
    },
  },
  {
    id: 'informessi', nodo: 'H_LR', codigo: 'https://github.com/SMESCH1/InforMessi',
    tech: ['Ollama / Groq', 'RAG', 'Telegram API', 'GitHub Actions'],
    textos: {
      en: { temas: 'LLM · RAG · Automation', titulo: 'InforMessi',
        desc: 'LLM editorial pipeline that writes and publishes daily Telegram posts about the Argentine national football team, with an anti-repetition RAG. Runs daily on GitHub Actions.',
        region: "Wernicke's area · reading the news" },
      es: { temas: 'LLM · RAG · Automatización', titulo: 'InforMessi',
        desc: 'Pipeline editorial con LLM que escribe y publica posts diarios en Telegram sobre la Selección Argentina, con un RAG anti-repetición. Corre todos los días en GitHub Actions.',
        region: 'Área de Wernicke · leer las noticias' },
    },
  },
  {
    id: 'socratia', nodo: 'T1', codigo: 'https://github.com/SMESCH1/SOCRATIA',
    tech: ['Next.js 16', 'Supabase', 'Tailwind v4', 'Motion'],
    textos: {
      en: { temas: 'Full-stack · Next.js · Supabase', titulo: 'SocratIA',
        desc: 'Gamified philosophy learning app: themed islands, missions with interactive theory and quizzes, XP and daily streaks.',
        region: 'Frontal pole · abstract thought' },
      es: { temas: 'Full-stack · Next.js · Supabase', titulo: 'SocratIA',
        desc: 'App gamificada para aprender filosofía: islas temáticas, misiones con teoría interactiva y quizzes, XP y rachas diarias.',
        region: 'Polo frontal · pensamiento abstracto' },
    },
  },
  {
    id: 'payments', nodo: 'B1', codigo: 'https://github.com/SMESCH1/fastapi-payments-api',
    demo: 'https://testing-examen-soft-eng.onrender.com/docs',
    tech: ['FastAPI', 'unittest', 'GitHub Actions', 'Render'],
    textos: {
      en: { temas: 'Backend · API · CI/CD', titulo: 'FastAPI Payments API',
        desc: 'REST payments API with an explicit state machine, unit and integration tests, GitHub Actions CI and auto-deploy to Render.',
        region: 'Cerebellum · error correction' },
      es: { temas: 'Backend · API · CI/CD', titulo: 'API de pagos con FastAPI',
        desc: 'API REST de pagos con máquina de estados explícita, tests unitarios y de integración, CI con GitHub Actions y deploy automático a Render.',
        region: 'Cerebelo · corrección de errores' },
    },
  },
  {
    id: 'stock', nodo: 'H_UL', codigo: 'https://github.com/SMESCH1/stock_price_prediction_MIA',
    tech: ['PyTorch', 'BETO / NLP', 'yfinance', 'Reddit API'],
    textos: {
      en: { temas: 'DL · Finance · NLP', titulo: 'Asset Price Prediction',
        desc: 'LSTM, GRU and Transformer models for Argentine asset price prediction, combining financial time series with Reddit and news sentiment analysis using BETO.',
        region: 'Prefrontal cortex · decisions' },
      es: { temas: 'DL · Finanzas · NLP', titulo: 'Predicción de precios de activos',
        desc: 'Modelos LSTM, GRU y Transformers para predecir activos financieros argentinos, combinando series temporales con análisis de sentimiento de Reddit y medios usando BETO.',
        region: 'Corteza prefrontal · decisiones' },
    },
  },
];
