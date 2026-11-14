// Textos de la interfaz en inglés y en español. Fuente: el sitio publicado (rama main), con los cambios del rebranding
// (docs/diseno/rebranding-2026-11-13/rebranding.md). `==así==` marca el resaltador (uno por página, gusto-visual).
// Un título con firma va en tres partes: [antes, palabra clave subrayada, después].

type Titulo = readonly [string, string, string];

const en = {
  saltar: 'Skip to content',
  nav: { proyectos: 'Projects', investigacion: 'Research', sobre: 'About', experiencia: 'Experience', contacto: 'Contact', menu: 'Menu', cerrar: 'Close menu' },
  idioma: { boton: 'ES', etiqueta: 'Ver en español' },
  tema: { aClaro: 'Switch to light theme', aOscuro: 'Switch to dark theme' },
  portada: {
    roles: 'AI Engineer Jr. · Data Scientist · Neuroscientist',
    frase: ['Bridging cognitive ', 'neuroscience', ' and deep learning'] as Titulo,
    bajada: 'Licensed psychologist and data scientist. AI and Neuroscience Mentor at Humai, researcher at Universidad Favaloro and MSc in AI student at UdeSA.',
    verProyectos: 'See projects',
    verInvestigacion: 'View research',
    contacto: 'Contact',
    ubicacion: 'Buenos Aires, open to remote',
  },
  misProyectos: {
    titulo: ['My ', 'projects', ''] as Titulo,
    anterior: 'Previous project',
    siguiente: 'Next project',
    nota: 'Tap a node to open its project. A playful map, not exact anatomy.',
    cerebro: 'Brain map of projects. Each marked node opens a project.',
    registro: 'activity · illustrative, not recorded data',
  },
  proyectos: { titulo: ['Featured ', 'projects', ''] as Titulo, todos: 'All repositories', codigo: 'Code', demo: 'Live demo' },
  investigacion: {
    titulo: ['Teaching & ', 'research', ''] as Titulo,
    bajada: 'AI instructor, researcher and speaker on neuroscience, behavioral science and artificial intelligence.',
    docencia: 'Teaching',
    publicaciones: 'Publications & events',
  },
  sobre: {
    titulo: ['', 'About', ''] as Titulo,
    parrafos: [
      "I hold a degree in Psychology with a specialization in Neurosciences and I'm writing my thesis for the Master's in AI at UdeSA.",
      'I work as an AI and Neuroscience Mentor at Humai, leading educational strategy and advanced AI training. I also work freelance as a Data Scientist at the Vocational and Occupational Guidance department of Universidad Favaloro.',
      'My main interest is ==AI for mental health==: using machine learning to interpret brain signals, clinical data and behavioral patterns. I have research experience in neuroscience and behavioral science, and I teach AI for clinical and research settings.',
      'I have hands-on experience in development and applied machine learning (PyTorch, LLMs, RAG), data engineering (pipelines, dbt, Airflow) and product (Next.js, FastAPI).',
    ],
  },
  trayectoria: { titulo: ['Experience & ', 'education', ''] as Titulo, experiencia: 'Experience', formacion: 'Education', certificaciones: 'Key certifications', presente: 'present' },
  contacto: {
    titulo: ['Get in ', 'touch', ''] as Titulo,
    bajada: 'Open to on-site and remote work. Roles in data science, AI and research.',
    email: 'Email',
    ubicacion: 'Location',
    ubicacionValor: 'Buenos Aires, Argentina · open to on-site and remote work',
    nombre: 'Name',
    mensaje: 'Message',
    enviar: 'Send message',
  },
  pie: { derechos: '© 2026 Sebastián Mesch Henriques' },
};

export type Textos = typeof en;

const es: Textos = {
  saltar: 'Saltar al contenido',
  nav: { proyectos: 'Proyectos', investigacion: 'Investigación', sobre: 'Sobre mí', experiencia: 'Experiencia', contacto: 'Contacto', menu: 'Menú', cerrar: 'Cerrar menú' },
  idioma: { boton: 'EN', etiqueta: 'View in English' },
  tema: { aClaro: 'Cambiar a tema claro', aOscuro: 'Cambiar a tema oscuro' },
  portada: {
    roles: 'AI Engineer Jr. · Data Scientist · Neurocientífico',
    frase: ['Entre la ', 'neurociencia', ' cognitiva y el deep learning'],
    bajada: 'Licenciado en Psicología y científico de datos. Mentor en IA y Neurociencias en Humai, investigador en la Universidad Favaloro y estudiante de la Maestría en IA de UdeSA.',
    verProyectos: 'Ver proyectos',
    verInvestigacion: 'Ver investigación',
    contacto: 'Contacto',
    ubicacion: 'Buenos Aires, abierto a remoto',
  },
  misProyectos: {
    titulo: ['Mis ', 'proyectos', ''],
    anterior: 'Proyecto anterior',
    siguiente: 'Proyecto siguiente',
    nota: 'Tocá un nodo para abrir su proyecto. Un mapa con humor, no anatomía exacta.',
    cerebro: 'Mapa cerebral de proyectos. Cada nodo marcado abre un proyecto.',
    registro: 'actividad · ilustrativa, no son datos registrados',
  },
  proyectos: { titulo: ['', 'Proyectos', ' destacados'], todos: 'Todos los repositorios', codigo: 'Código', demo: 'Demo en vivo' },
  investigacion: {
    titulo: ['Docencia e ', 'investigación', ''],
    bajada: 'Docente de IA, investigador y orador sobre neurociencias, ciencias del comportamiento e inteligencia artificial.',
    docencia: 'Docencia',
    publicaciones: 'Publicaciones y eventos',
  },
  sobre: {
    titulo: ['Sobre ', 'mí', ''],
    parrafos: [
      'Soy Licenciado en Psicología con orientación en Neurociencias y estoy haciendo mi tesis de la Maestría en IA en UdeSA.',
      'Trabajo como Mentor en IA y Neurociencias en Humai, donde lidero la estrategia educativa y la formación avanzada en IA. También trabajo freelance como científico de datos en el departamento de Orientación Vocacional y Ocupacional de la Universidad Favaloro.',
      'Me interesa la ==IA para la salud mental==: usar machine learning para interpretar señales cerebrales, datos clínicos y patrones de comportamiento. Tengo experiencia de investigación en neurociencias y ciencias del comportamiento, y enseño IA para entornos clínicos y de investigación.',
      'Tengo experiencia práctica en desarrollo y machine learning aplicado (PyTorch, LLMs, RAG), data engineering (pipelines, dbt, Airflow) y producto (Next.js, FastAPI).',
    ],
  },
  trayectoria: { titulo: ['Experiencia y ', 'formación', ''], experiencia: 'Experiencia', formacion: 'Formación', certificaciones: 'Certificaciones destacadas', presente: 'presente' },
  contacto: {
    titulo: ['', 'Contacto', ''],
    bajada: 'Abierto a trabajo presencial y remoto. Posiciones en data science, IA e investigación.',
    email: 'Email',
    ubicacion: 'Ubicación',
    ubicacionValor: 'Buenos Aires, Argentina · abierto a trabajo presencial y remoto',
    nombre: 'Nombre',
    mensaje: 'Mensaje',
    enviar: 'Enviar mensaje',
  },
  pie: { derechos: '© 2026 Sebastián Mesch Henriques' },
};

export const TEXTOS = { en, es };
