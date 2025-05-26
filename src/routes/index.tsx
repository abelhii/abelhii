import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@abel/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Button variant="default">Test this button</Button>
      <h3>Welcome Home!</h3>
    </div>
  );
}
