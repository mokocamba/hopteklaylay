import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { getService, services } from "@/lib/services";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { LoopVideo } from "@/components/LoopVideo";
import sustainPoster from "@/assets/sustain-option-1-tescon.jpg";
import sustainVideo from "@/assets/sustain-option-1-tescon.mp4.asset.json";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p>Service not found. <Link to="/services" className="underline">All services</Link></p>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center">Something went wrong.</div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const idx = services.findIndex((s) => s.slug === service.slug);
  const next = services[(idx + 1) % services.length];
  const isSustain = service.slug === "sustainability";

  return (
    <div className="bg-background text-foreground">
      <Helmet>
        <title>{`${service.title} — Lefka City`}</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={`${service.title} — Lefka City`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image" content={service.image} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://lefkacity-heritage-hub.lovable.app/services/${service.slug}`} />
      </Helmet>
      <section className="relative h-[80svh] w-full overflow-hidden">
        <SiteHeader variant="dark" />
        <LoopVideo
          src={isSustain ? sustainVideo.url : service.video}
          poster={isSustain ? sustainPoster : service.image}
          eager
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end p-6 md:p-10 text-background max-w-[1600px] mx-auto w-full">
          <p className="text-xs uppercase tracking-display opacity-80">Service · {String(idx + 1).padStart(2, "0")}</p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl lg:text-8xl">{service.title}</h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
        <p className="font-display text-3xl md:text-4xl leading-snug">{service.short}</p>
        <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {service.description}
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-6 md:px-10 pb-10 border-t border-border pt-10">
        <Link
          to="/services/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between"
        >
          <span className="text-xs uppercase tracking-display text-muted-foreground">Next service</span>
          <span className="font-display text-3xl md:text-5xl group-hover:opacity-70 transition-opacity">
            {next.title} →
          </span>
        </Link>
      </section>

      <ContactSection />
      <SiteFooter />
    </div>
  );
}