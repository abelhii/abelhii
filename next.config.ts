import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  rewrites: async () => {
    const versionsPrefix = "/versions/v1";
    return {
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: `${versionsPrefix}`,
          destination: `${versionsPrefix}/index.html`,
        },
        {
          source: `${versionsPrefix}/projects/:slug`,
          destination: `${versionsPrefix}/projects/:slug/index.html`,
        },
        {
          source: `${versionsPrefix}/tags/:slug`,
          destination: `${versionsPrefix}/tags/:slug/index.html`,
        },
      ],
    };
  },
};

export default withPayload(nextConfig);
