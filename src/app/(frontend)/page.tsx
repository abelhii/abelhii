import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const authHeaders = await payload.auth({ headers });
  const user = authHeaders.user;

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <div className="w-screen h-[80vh]">
        <Hero />
      </div>
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && (
          <h1 className="text-xs font-bold underline">
            Welcome back, {user.email}
          </h1>
        )}
        <Button variant="outline">test button</Button>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  );
}
