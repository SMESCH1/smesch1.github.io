import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <motion.a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group block p-6 rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900/40 hover:bg-ink-50 dark:hover:bg-ink-800/60 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-mist-200">
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={20} className="text-ink-400 dark:text-ink-600 group-hover:text-ink-900 dark:group-hover:text-mist-200 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-ink-950 dark:text-white mb-2">{project.title}</h3>
              <p className="text-sm text-ink-600 dark:text-mist-400 mb-6 line-clamp-3 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(tech => (
                  <span key={tech} className="text-xs font-mono px-2 py-1 rounded-md bg-ink-100 dark:bg-ink-800/80 text-ink-700 dark:text-mist-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
