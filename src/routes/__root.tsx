import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/042fb9b0-0c4f-41f1-b85c-41d30fd69ac3/id-preview-83033cfa--7bc8c520-6aa3-40a1-b177-0cb9e4faa3a0.lovable.app-1780243428326.png";

const CDN_DOMAIN = "pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <>
      <Helmet defaultTitle="Lefka City — High-Performance Builder & Construction Manager, NY">
        <meta name="author" content="Lefka City" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lefka City" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@LefkaCity" />
        <meta property="og:image" content={SITE_OG_IMAGE} />
        <meta name="twitter:image" content={SITE_OG_IMAGE} />

        {/* Performance: DNS prefetch and preconnect to CDN */}
        <link rel="dns-prefetch" href={`https://${CDN_DOMAIN}`} />
        <link rel="preconnect" href={`https://${CDN_DOMAIN}`} crossOrigin="anonymous" />

        {/* Resource hints */}
        <link
          rel="preload"
          as="video"
          href="https://pub-0a703234a7584d4c81cb2eafc1563a27.r2.dev/hero-option-3-interior.mp4"
        />
      </Helmet>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </>
  );
}
// trigger rebuild
