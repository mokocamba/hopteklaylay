import { Link } from "@tanstack/react-router";

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const text = variant === "dark" ? "text-background" : "text-foreground";
  return (
    <header className={`absolute inset-x-0 top-0 z-30 ${text}`}>
      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between px-3 py-6 md:px-10 md:py-8">
        <nav className="flex max-w-[31%] items-center gap-1 text-[8px] uppercase tracking-[0.06em] md:max-w-none md:gap-6 md:text-xs md:tracking-display">
          <Link to="/services" className="hover:opacity-70 transition-opacity">Services</Link>
          <Link to="/profile" className="hover:opacity-70 transition-opacity">Profile</Link>
        </nav>
        <Link
          to="/"
          className="pointer-events-auto absolute left-1/2 top-1/2 max-w-[38%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-base tracking-[0.12em] md:static md:max-w-none md:translate-x-0 md:translate-y-0 md:text-3xl md:tracking-[0.3em]"
        >
          LEFKA <span className="opacity-60">CITY</span>
        </Link>
        <div className="flex max-w-[31%] items-center justify-end gap-1 text-[8px] uppercase tracking-[0.06em] md:max-w-none md:gap-4 md:text-xs md:tracking-display">
          <a href="https://www.instagram.com/lefkacity/" target="_blank" rel="noreferrer" className="hover:opacity-70">IG</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </div>
      </div>
    </header>
  );
}