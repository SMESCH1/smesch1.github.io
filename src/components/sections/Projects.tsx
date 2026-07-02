import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 gap-4">
        {PORTFOLIO_DATA.projects.map((project, i) => (
          <motion.a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="card group border border-ink-700/70 rounded-2xl p-6 bg-ink-900/40 block"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className="tag text-accent">Deep Learning</span>
              </div>
              <h3 className="text-lg font-semibold text-mist-100 mb-2 group-hover:text-accent transition leading-snug">
                {project.title}
              </h3>
              <p className="text-mist-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(tech => (
                  <span key={tech} className="tag px-2 py-0.5 rounded-full bg-ink-700/60 border border-ink-600 text-mist-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
