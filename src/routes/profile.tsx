import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>Profile — Lefka City</title>
        <meta name="description" content="Lefka City is a high-performance builder and construction manager serving New York State." />
        <meta property="og:title" content="Profile — Lefka City" />
        <meta property="og:description" content="A New York State builder and construction manager focused on quality, performance and long-term value." />
        <link rel="canonical" href="https://lefkacity-heritage-hub.lovable.app/profile" />
      </Helmet>
      <SiteHeader />
      <section className="mx-auto w-full max-w-[1200px] px-6 pt-40 pb-20 md:px-10 md:pt-48">
        <p className="text-xs uppercase tracking-display text-muted-foreground">Profile</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
          A builder's practice, with a long view.
        </h1>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-24 md:px-10 md:pb-32 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Lefka City is a high-performance custom home builder, construction manager and land
            developer based in New York State. We focus exclusively on new construction — working
            with homeowners, architects and our own development projects across the Hudson Valley,
            the Catskills and the broader region.
          </p>
          <p>
            Our approach is rooted in building science. We build to Passive House and Pretty Good
            House standards: airtight, super-insulated envelopes, thermal-bridge-free detailing,
            triple-pane windows, balanced ventilation and all-electric mechanicals. Performance is
            verified — not assumed — with blower-door testing on every project.
          </p>
          <p>
            We are deliberate about the projects we take on, transparent about budget and schedule,
            and committed to a long-term relationship with every client. Most of our work comes
            from referrals — and that is exactly how we like it.
          </p>
        </div>
        <aside className="md:col-span-5 space-y-10">
          <Stat label="Based In" value="New York State" />
          <Stat label="Pillars" value="Sustainability · Innovation · Intelligence · Investment · Land Development" />
          <Stat label="Coverage" value="Hudson Valley · Catskills · Capital Region · NYC Metro" />
          <Stat label="Practice" value="New construction only · Building-science driven · Owner-operated" />
        </aside>
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4">
      <p className="text-xs uppercase tracking-display text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-xl leading-snug">{value}</p>
    </div>
  );
}