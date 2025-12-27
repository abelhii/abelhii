import { headers as getHeaders } from "next/headers.js";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import { MainScene } from "@/components/MainScene";
import config from "@/payload.config";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const authHeaders = await payload.auth({ headers });
  const user = authHeaders.user;
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <MainScene />
      <Footer />
    </div>
  );
}
