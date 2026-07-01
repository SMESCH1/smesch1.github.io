import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function Experience() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-sm font-mono text-ink-500 dark:text-mist-500 mb-8 uppercase tracking-wider">Experience</h3>
          <div className="space-y-8">
            {PORTFOLIO_DATA.experience.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-6 border-l border-ink-200 dark:border-ink-800"
              >
                <div className="absolute w-2.5 h-2.5 bg-ink-950 dark:bg-mist-200 rounded-full -left-[5.5px] top-1.5 ring-4 ring-white dark:ring-ink-950"></div>
                <h4 className="text-lg font-semibold text-ink-950 dark:text-white">{item.title}</h4>
                <p className="text-ink-600 dark:text-mist-400 text-sm mb-1">{item.organization}</p>
                <p className="text-xs font-mono text-ink-400 dark:text-mist-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono text-ink-500 dark:text-mist-500 mb-8 uppercase tracking-wider">Education</h3>
          <div className="space-y-8">
            {PORTFOLIO_DATA.education.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-6 border-l border-ink-200 dark:border-ink-800"
              >
                <div className="absolute w-2.5 h-2.5 bg-ink-950 dark:bg-mist-200 rounded-full -left-[5.5px] top-1.5 ring-4 ring-white dark:ring-ink-950"></div>
                <h4 className="text-lg font-semibold text-ink-950 dark:text-white">{item.title}</h4>
                <p className="text-ink-600 dark:text-mist-400 text-sm mb-1">{item.organization}</p>
                <p className="text-xs font-mono text-ink-400 dark:text-mist-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
