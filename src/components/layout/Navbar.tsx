import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/70 dark:bg-ink-950/70 border-b border-ink-200/40 dark:border-ink-800/40"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-ink-900 dark:bg-white flex items-center justify-center text-white dark:text-ink-900 font-bold text-sm transition-transform group-hover:scale-105">
            SM
          </div>
          <span className="text-ink-900 dark:text-mist-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 hidden sm:block">
            Sebastián Mesch Henriques
          </span>
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm text-mist-500 hover:text-ink-900 dark:hover:text-mist-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors text-ink-900 dark:text-mist-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
