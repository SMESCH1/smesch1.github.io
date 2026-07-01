import { PORTFOLIO_DATA } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-ink-200 dark:border-ink-800/40 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-mist-500">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.hero.name}.
        </p>
        <div className="flex gap-4">
          <a 
            href={PORTFOLIO_DATA.hero.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-mist-500 hover:text-ink-900 dark:hover:text-mist-200 transition-colors"
          >
            GitHub
          </a>
          <a 
            href={PORTFOLIO_DATA.hero.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-mist-500 hover:text-ink-900 dark:hover:text-mist-200 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
