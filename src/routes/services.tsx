import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for /services. Renders index or slug children via <Outlet />.
export const Route = createFileRoute("/services")({
  component: () => <Outlet />,
});