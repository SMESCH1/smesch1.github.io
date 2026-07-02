const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink-950/80 border-b border-ink-700/40">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-4 group">
          <span className="text-mist-300 text-sm font-light group-hover:text-mist-100 transition">
            Sebastián Mesch Henriques
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-mist-400 hover:text-accent transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
