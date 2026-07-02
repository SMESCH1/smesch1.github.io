import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { BrainSvg } from '../ui/BrainSvg';

export function Hero() {
  const { hero } = PORTFOLIO_DATA;

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers (Original Style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 -z-20"></div>
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-48 w-[500px] h-[500px] rounded-full bg-accent-soft/5 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.025] -z-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(214,162,50,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(214,162,50,.35) 1px,transparent 1px)", backgroundSize: "80px 80px" }}></div>

      <div className="relative max-w-5xl mx-auto px-6 py-32 grid md:grid-cols-[1fr_auto] gap-16 items-center w-full z-10">
        <div>
          {/* Role badges */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap gap-2 mb-7"
          >
            {hero.roles.map((role) => (
              <span key={role} className="tag px-3 py-1.5 rounded-full border border-ink-600 bg-ink-800/50 text-mist-400">
                {role}
              </span>
            ))}
          </motion.div>

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="display text-5xl md:text-7xl text-mist-100 leading-[1.08] tracking-tight"
          >
            {hero.name.split(' ').map((part, i) => (
              <span key={i} className={i === 1 ? 'grad-text' : ''}>
                {part}{i === 0 ? <br/> : ' '}
              </span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-lg text-mist-300 font-light max-w-lg leading-relaxed"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#projects" className="px-5 py-2.5 bg-accent text-ink-950 font-medium rounded-lg hover:bg-accent-soft transition glow text-sm">
              See projects →
            </a>
            <a href={`mailto:${hero.socials.email}`} className="px-5 py-2.5 border border-ink-600 text-mist-200 font-medium rounded-lg hover:border-accent/60 hover:text-accent transition text-sm">
              Contact
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-9 flex items-center gap-5 text-mist-500 text-sm"
          >
            <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition flex items-center gap-1.5">
              GitHub
            </a>
            <span className="text-ink-600">·</span>
            <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition flex items-center gap-1.5">
              LinkedIn
            </a>
            <span className="text-ink-600">·</span>
            <span className="text-mist-500">{hero.location}</span>
          </motion.div>
        </div>

        {/* SVG Brain */}
        <div className="hidden md:flex items-center justify-center">
          <BrainSvg />
        </div>
      </div>
    </section>
  );
}
