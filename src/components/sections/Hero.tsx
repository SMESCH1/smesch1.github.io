import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Mail, ArrowRight } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.44-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 012.86-.38c.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.36-5.27 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

export function Hero() {
  const { hero } = PORTFOLIO_DATA;

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center pt-24 px-6 overflow-hidden">
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full bg-mist-200/50 dark:bg-ink-900/50 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-16 items-center">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {hero.roles.map((role) => (
              <span key={role} className="px-3 py-1.5 text-xs font-mono rounded-full border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900/50 text-ink-600 dark:text-mist-400">
                {role}
              </span>
            ))}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-ink-950 dark:text-white leading-[1.1] tracking-tight"
          >
            {hero.name.split(' ').map((part, i) => (
              <span key={i} className={i === 1 ? 'text-accent dark:text-accent-soft italic' : ''}>
                {part}{i === 0 ? <br/> : ' '}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-ink-600 dark:text-mist-400 font-light max-w-xl leading-relaxed"
          >
            {hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-ink-950 dark:bg-white text-white dark:text-ink-950 font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
            >
              See projects <ArrowRight size={16} />
            </a>
            <a 
              href={`mailto:${hero.socials.email}`}
              className="px-6 py-3 border border-ink-200 dark:border-ink-800 text-ink-900 dark:text-mist-200 font-medium rounded-lg hover:border-ink-400 dark:hover:border-ink-600 transition-colors flex items-center gap-2 text-sm"
            >
              <Mail size={16} /> Contact
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center gap-6 text-sm text-ink-600 dark:text-mist-500"
          >
            <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950 dark:hover:text-mist-200 transition-colors flex items-center gap-2">
              <GithubIcon /> GitHub
            </a>
            <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950 dark:hover:text-mist-200 transition-colors flex items-center gap-2">
              <LinkedinIcon /> LinkedIn
            </a>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-700"></span>
            <span className="hidden sm:inline-block">{hero.location}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
