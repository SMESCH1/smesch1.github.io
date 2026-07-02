import { PORTFOLIO_DATA } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 dark:border-white/5 mt-32">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm font-mono text-base-400">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.hero.name}.
        </p>
        <div className="flex gap-8">
          <a 
            href={PORTFOLIO_DATA.hero.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-widest text-base-500 hover:text-base-950 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href={PORTFOLIO_DATA.hero.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-widest text-base-500 hover:text-base-950 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
