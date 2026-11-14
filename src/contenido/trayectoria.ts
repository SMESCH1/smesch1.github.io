// Docencia, publicaciones, experiencia, formación, certificaciones y stack. Fuente: el sitio publicado (rama main).
type Doble = { en: string; es: string };
const igual = (s: string): Doble => ({ en: s, es: s });

export interface Entrada {
  titulo: Doble;
  lugar: string;
  /** Años; null en `hasta` = hasta hoy. */
  desde: number;
  hasta?: number | null;
  desc?: Doble;
  actual?: boolean;
}

export const DOCENCIA: Entrada[] = [
  { titulo: { en: 'AI in Psychology & Neurosciences', es: 'IA en Psicología y Neurociencias' }, lugar: 'Humai', desde: 2023, hasta: null, actual: true,
    desc: { en: 'AI applications for clinical and research settings in psychology and neurosciences.', es: 'Aplicaciones de IA para entornos clínicos y de investigación en psicología y neurociencias.' } },
  { titulo: { en: 'AI in Mental Health', es: 'IA en Salud Mental' }, lugar: 'Fundación Foro', desde: 2025,
    desc: { en: 'Theory on AI and a practical workshop on AI tools for mental health professionals.', es: 'Teoría sobre IA y taller práctico de herramientas de IA para profesionales de la salud mental.' } },
  { titulo: { en: 'AI in Psychology', es: 'IA en Psicología' }, lugar: 'UCCuyo', desde: 2025,
    desc: { en: 'AI for Psychology, undergraduate Psychology program.', es: 'IA para Psicología, carrera de grado en Psicología.' } },
  { titulo: { en: 'AI Tools', es: 'Herramientas de IA' }, lugar: 'Humai', desde: 2024,
    desc: { en: 'AI tools for Psychology and Neurosciences.', es: 'Herramientas de IA para Psicología y Neurociencias.' } },
  { titulo: { en: 'Social Psychology', es: 'Psicología Social' }, lugar: 'Universidad Favaloro', desde: 2024, hasta: 2025,
    desc: { en: 'Adjunct professor, undergraduate Psychology program.', es: 'Docente adjunto, carrera de grado en Psicología.' } },
];

export interface Publicacion extends Entrada { tipo: Doble; revista?: string; url?: string }

export const PUBLICACIONES: Publicacion[] = [
  { tipo: { en: 'Scientific article', es: 'Artículo científico' }, titulo: { en: "Fake News' Cognitive Effects in Complex Decision-Making", es: 'Efectos cognitivos de las fake news en la toma de decisiones complejas' },
    revista: 'Psicología y Sociedad', lugar: 'SciELO Brasil', desde: 2025, url: 'https://www.scielo.br/j/psoc/a/kpWpjbhsCvfszBp76TyFnDM/?lang=en' },
  { tipo: { en: 'Systematic review', es: 'Revisión sistemática' }, titulo: { en: 'Systematic review', es: 'Revisión sistemática' },
    revista: 'Anuario de Investigaciones', lugar: 'UBA', desde: 2024, url: 'https://www.psi.uba.ar/publicaciones/anuario/trabajos_completos/30/mesch.pdf' },
  { tipo: igual('Podcast'), titulo: igual('Verdades Incómodas'), revista: 'Verdades Incómodas', lugar: 'BrainFreaks', desde: 2025,
    url: 'https://www.youtube.com/watch?v=battrsLXcBc&list=PLnLHYvmgbu-rXcAkhQ9nTLiIX3ItgNdPY&index=3' },
  { tipo: { en: 'Congress talk', es: 'Presentación en congreso' }, titulo: { en: 'Congress talk', es: 'Presentación en congreso' },
    lugar: 'Sociedad Argentina de Neurociencias', desde: 2024, url: 'https://www.aacademica.org/000-012/330' },
  // Sin enlace: en el sitio anterior apuntaba al artículo de SciELO por error.
  { tipo: { en: 'Talk', es: 'Charla' }, titulo: { en: 'New Frontiers in Neuroscience', es: 'Nuevas Fronteras en Neurociencias' }, lugar: 'INECO', desde: 2024 },
];

export const EXPERIENCIA: Entrada[] = [
  { titulo: { en: 'AI and Neuroscience Mentor', es: 'Mentor en IA y Neurociencias' }, lugar: 'Humai', desde: 2026, hasta: null, actual: true },
  { titulo: { en: 'Freelance Data Scientist', es: 'Científico de datos freelance' }, lugar: 'Universidad Favaloro', desde: 2026, hasta: null, actual: true },
  { titulo: { en: 'Academic Director', es: 'Director Académico' }, lugar: 'Humai', desde: 2023, hasta: 2026 },
  { titulo: igual('Quality Control Manager'), lugar: 'Further Languages', desde: 2020, hasta: 2022 },
  { titulo: { en: 'Associate Researcher', es: 'Investigador asistente' }, lugar: 'Universidad Favaloro', desde: 2019, hasta: 2023 },
];

export const EDUCACION: Entrada[] = [
  { titulo: { en: "Master's in Artificial Intelligence", es: 'Maestría en Inteligencia Artificial' }, lugar: 'Universidad de San Andrés (UdeSA)', desde: 2025, hasta: null, actual: true },
  { titulo: { en: "Bachelor's in Psychology (Neurosciences)", es: 'Licenciatura en Psicología (Neurociencias)' }, lugar: 'Universidad Favaloro', desde: 2018, hasta: 2024 },
  { titulo: igual('Data Scientist Program'), lugar: 'Coder House', desde: 2022, hasta: 2023 },
  { titulo: { en: 'High School', es: 'Secundario' }, lugar: 'Colegio Nacional de Buenos Aires', desde: 2012, hasta: 2016 },
];

export const CERTIFICACIONES: Entrada[] = [
  { titulo: igual('AWS Certified AI Practitioner'), lugar: 'AWS', desde: 2025 },
  { titulo: igual('LLMs & Deep Learning'), lugar: 'Humai', desde: 2025 },
  { titulo: igual('Data Science'), lugar: 'Coder House', desde: 2023 },
  { titulo: igual('Big Data'), lugar: 'Codo a Codo', desde: 2022 },
];

export const STACK: { grupo: Doble; items: string[] }[] = [
  { grupo: { en: 'Languages', es: 'Lenguajes' }, items: ['Python', 'SQL', 'Bash', 'JavaScript'] },
  { grupo: { en: 'AI / ML', es: 'IA / ML' }, items: ['PyTorch', 'scikit-learn', 'LLMs / RAG', 'Optuna', 'AI agents'] },
  { grupo: igual('Data engineering'), items: ['Airflow', 'dbt', 'DuckDB', 'pandas', 'Polars', 'Power BI', 'Looker Studio'] },
  { grupo: { en: 'Neuroscience tools', es: 'Herramientas de neuroimagen' }, items: ['FSL', 'fMRI', 'EEG'] },
  { grupo: igual('Backend / tooling'), items: ['FastAPI', 'Next.js', 'GitHub Actions', 'Docker'] },
];
