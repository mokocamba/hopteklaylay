import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import "./styles.css";

const queryClient = new QueryClient();
const router = getRouter();

const app = (
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);

const rootEl = document.getElementById("root")!;
// Only hydrate when prerendered markup is present. In dev, index.html still
// contains the `<!--app-html-->` placeholder (a comment node), which would
// otherwise trick us into calling hydrateRoot on empty content and cause a
// hydration mismatch. Require a real element child instead.
if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}