import { createFileRoute, Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { services } from "@/lib/services";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>Services — Lefka City</title>
        <meta name="description" content="Sustainability, innovation, intelligence, investment and land development — Lefka City's pillars for high-performance new construction in New York State." />
        <meta property="og:title" content="Services — Lefka City" />
        <meta property="og:description" content="What we build and manage across New York State." />
        <link rel="canonical" href="https://lefkacity-heritage-hub.lovable.app/services" />
      </Helmet>
      <div className="relative">
        <SiteHeader />
        <section className="mx-auto w-full max-w-[1600px] px-6 pt-40 pb-20 md:px-10 md:pt-48">
          <p className="text-xs uppercase tracking-display text-muted-foreground">Services</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
            What we build and manage.
          </h1>
        </section>
      </div>

      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pb-10">
        <div className="flex flex-col">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group grid grid-cols-1 md:grid-cols-12 items-center gap-6 border-t border-border py-10"
            >
              <span className="text-xs uppercase tracking-display text-muted-foreground md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-3xl md:text-5xl md:col-span-5 group-hover:opacity-70 transition-opacity">
                {s.title}
              </h2>
              <p className="text-muted-foreground md:col-span-5">{s.short}</p>
              <span className="text-xs uppercase tracking-display md:col-span-1 md:text-right group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  );
}