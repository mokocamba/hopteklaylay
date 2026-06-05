import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import heroPoster from "@/assets/hero-option-3-interior.jpg";
import { services } from "@/lib/services";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { LoopVideo } from "@/components/LoopVideo";

const HERO_VIDEO_URL = "https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/hero-option-3-interior.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>Lefka City — Passive House Builder, Developer & CM, NY</title>
        <meta name="description" content="Lefka City is a high-performance custom home builder, land developer and construction manager serving New York State. Passive House, net-zero and all-elec[...]" />
        <meta property="og:title" content="Lefka City — Passive House Builder & Developer, NY State" />
        <meta property="og:description" content="Custom homes, Passive House new construction, land development and CM across New York State." />
      </Helmet>
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <SiteHeader variant="dark" />
        <LoopVideo
          src={HERO_VIDEO_URL}
          poster={heroPoster}
          eager
          alt="High-performance custom home in New York"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 text-center text-background px-6">
          <p className="text-xs uppercase tracking-display opacity-80">New York State · Est. Builders & CM</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl max-w-4xl leading-[1.02]">
            Tomorrow's home, built today
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-28 md:py-40 md:px-10">
        <p className="text-xs uppercase tracking-display text-muted-foreground">Practice</p>
          <h2 className="mt-6 font-display text-3xl md:text-5xl leading-[1.15] max-w-4xl">
            <span className="font-medium">Lefka City</span> is a high-performance builder, developer
            and construction manager working across New York State — guided by sustainability,
            innovation and intelligence.
          </h2>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            We focus exclusively on new construction. Every home we build — for clients or for our
            own development projects — is engineered around Passive House principles: airtight,
            super-insulated envelopes, triple-pane windows, balanced ventilation and all-electric
            mechanicals, verified by blower-door testing.
          </p>
        <Link
          to="/services"
          className="mt-10 inline-flex items-center gap-3 border-b border-foreground pb-1 text-xs uppercase tracking-display hover:opacity-70"
        >
          See our services <span aria-hidden>→</span>
        </Link>
      </section>

      {/* Featured services */}
      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between border-b border-border pb-6">
          <h3 className="text-xs uppercase tracking-display">What We Do</h3>
          <Link to="/services" className="text-xs uppercase tracking-display hover:opacity-70">All Services</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 pt-12">
          {services.slice(0, 4).map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <LoopVideo
                  src={s.video}
                  poster={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-display text-xl">{s.title}</p>
                <span className="text-xs uppercase tracking-display opacity-60 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  );
}
