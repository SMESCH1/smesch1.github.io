import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-3xl">
        <div className="space-y-6 text-mist-300 leading-relaxed text-lg font-light">
          {PORTFOLIO_DATA.about.paragraphs.map((p, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              {p.split(/(AI|Neurosciences|Mental Health|Humai|UdeSA|Universidad Favaloro|PyTorch|LLMs|RAG|Data Engineering|dbt|Airflow|Next\.js|FastAPI)/).map((part, index) => {
                const isHighlight = ['AI', 'Neurosciences', 'Mental Health', 'Humai', 'UdeSA', 'Universidad Favaloro', 'PyTorch', 'LLMs', 'RAG', 'Data Engineering', 'dbt', 'Airflow', 'Next.js', 'FastAPI'].includes(part);
                return isHighlight ? (
                  <strong key={index} className="font-medium text-mist-100">{part}</strong>
                ) : (
                  <span key={index}>{part}</span>
                );
              })}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  );
}
