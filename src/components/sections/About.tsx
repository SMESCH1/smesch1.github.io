import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
        <div className="space-y-6 text-ink-700 dark:text-mist-400 leading-relaxed text-lg font-light">
          {PORTFOLIO_DATA.about.paragraphs.map((p, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-ink-100 dark:bg-ink-900 flex items-center justify-center border border-ink-200 dark:border-ink-800"
        >
           {/* Placeholder for a professional photo - as Sanket's site has */}
          <div className="text-ink-400 dark:text-ink-600 font-mono text-sm">
            [Photo Placeholder]
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
