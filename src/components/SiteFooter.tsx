export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-display text-xl tracking-[0.3em]">LEFKA CITY</p>
        <p className="text-xs uppercase tracking-display text-muted-foreground">
          © {new Date().getFullYear()} Lefka City · New York State
        </p>
        <div className="flex gap-5 text-xs uppercase tracking-display">
          <a href="https://www.instagram.com/lefkacity/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Instagram</a>
          <a href="https://www.linkedin.com/company/lefkacity/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}