import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function Experience() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="sec-num mb-2">02</p>
          <h3 className="display text-3xl text-mist-100 mb-8">Experience</h3>
          <div className="space-y-8 ml-2">
            {PORTFOLIO_DATA.experience.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="relative pl-6"
              >
                {/* Timeline line and dot */}
                <div className="absolute left-[-1.01rem] top-[0.85rem] bottom-0 w-px bg-gradient-to-b from-accent/35 to-transparent"></div>
                <div className="absolute left-[-1.25rem] top-[0.35rem] w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(214,162,50,0.5)]"></div>
                
                <h4 className="text-lg font-semibold text-mist-100">{item.title}</h4>
                <p className="text-mist-400 text-sm mb-1">{item.organization}</p>
                <p className="tag text-mist-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="sec-num mb-2">03</p>
          <h3 className="display text-3xl text-mist-100 mb-8">Education</h3>
          <div className="space-y-8 ml-2">
            {PORTFOLIO_DATA.education.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="relative pl-6"
              >
                <div className="absolute left-[-1.01rem] top-[0.85rem] bottom-0 w-px bg-gradient-to-b from-accent/35 to-transparent"></div>
                <div className="absolute left-[-1.25rem] top-[0.35rem] w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(214,162,50,0.5)]"></div>
                
                <h4 className="text-lg font-semibold text-mist-100">{item.title}</h4>
                <p className="text-mist-400 text-sm mb-1">{item.organization}</p>
                <p className="tag text-mist-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
