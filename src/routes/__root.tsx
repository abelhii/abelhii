import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <section className="bg-color-primary text-foreground h-dvh w-dvw">
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/3d" className="[&.active]:font-bold">
            3d
          </Link>
        </div>
        <hr />
        <Outlet />
      </section>
      <TanStackRouterDevtools />
    </>
  ),
});
