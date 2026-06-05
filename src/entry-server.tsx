import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import { services } from "@/lib/services";

export { services };

export async function render(url: string) {
  const router = getRouter(createMemoryHistory({ initialEntries: [url] }));
  await router.load();

  const queryClient = new QueryClient();
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>,
  );

  const helmet = helmetContext.helmet;
  return {
    html,
    head: helmet
      ? [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join("\n    ")
      : "",
  };
}